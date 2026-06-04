import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(new URL('..', import.meta.url).pathname);
const forceRebuild = process.env.AIX_VERIFY_REBUILD === '1';

const expected = {
  sourceAppCommit: '13e12282042914a84ac12abe318aa238cebb00a7',
  icon: {
    path: 'apps/inspiration-hunter/assets/icon.png',
    bytes: 203673,
    sha256: 'd007f489dfb4c3727b7e67552fe6255c21fdc624e5841dae550a92cc416c4ee1',
  },
  aix: {
    path: 'artifacts/gdgeek-AIUI-apps-inspiration-hunter.aix',
    bytes: 211055,
    sha256: 'e50f392e1fe659fcad8f26af29de9913bc90cbc8efe44613ef093455959c839f',
    title: 'Inspiration Hunter',
    version: '0.1.0',
    pages: [
      'pages/index/index',
      'pages/discovery/index',
      'pages/challenge/index',
    ],
  },
};

const appDir = 'apps/inspiration-hunter';
const aixEntries = [
  'AGENTS.md',
  'VERSION',
  'app.js',
  'app.json',
  'assets',
  'lib',
  'pages',
  'package.json',
];

async function readRelative(path) {
  return readFile(resolve(root, path));
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function assertEqual(name, actual, expectedValue) {
  if (actual !== expectedValue) {
    throw new Error(`${name} mismatch: expected ${expectedValue}, got ${actual}`);
  }
}

function assertArrayEqual(name, actual, expectedValue) {
  assertEqual(`${name}.length`, actual.length, expectedValue.length);
  for (let index = 0; index < expectedValue.length; index += 1) {
    assertEqual(`${name}[${index}]`, actual[index], expectedValue[index]);
  }
}

async function verifyBinaryAsset(label, asset) {
  const buffer = await readRelative(asset.path);
  assertEqual(`${label}.bytes`, buffer.byteLength, asset.bytes);
  assertEqual(`${label}.sha256`, sha256(buffer), asset.sha256);
  return {
    path: asset.path,
    bytes: buffer.byteLength,
    sha256: sha256(buffer),
  };
}

async function findAixRuntime() {
  const candidates = [
    {
      js: 'tools/unpacked/aix/package/pkg/aix_web.js',
      wasm: 'tools/unpacked/aix/package/pkg/aix_web_bg.wasm',
    },
    {
      js: 'node_modules/@yodaos-pkg/aix/pkg/aix_web.js',
      wasm: 'node_modules/@yodaos-pkg/aix/pkg/aix_web_bg.wasm',
    },
  ];

  for (const candidate of candidates) {
    const jsPath = resolve(root, candidate.js);
    const wasmPath = resolve(root, candidate.wasm);
    if (existsSync(jsPath) && existsSync(wasmPath)) {
      const module = await import(pathToFileURL(jsPath).href);
      return {
        init: module.default,
        AixReaderWasm: module.AixReaderWasm,
        wasmPath,
      };
    }
  }

  throw new Error('AIX runtime not found. Install @yodaos-pkg/aix@0.6.0 or restore tools/unpacked/aix.');
}

async function ensureAixArtifact() {
  const artifactRelativePath = forceRebuild
    ? '.tmp/release-verification/gdgeek-AIUI-apps-inspiration-hunter.aix'
    : expected.aix.path;
  const artifactPath = resolve(root, artifactRelativePath);

  if (!forceRebuild && existsSync(artifactPath)) {
    return {
      path: artifactRelativePath,
      rebuilt: false,
    };
  }

  await mkdir(dirname(artifactPath), { recursive: true });
  const zip = spawnSync('zip', ['-r', artifactPath, ...aixEntries], {
    cwd: resolve(root, appDir),
    encoding: 'utf8',
  });

  if (zip.status !== 0) {
    throw new Error(`Failed to rebuild AIX with zip: ${zip.stderr || zip.stdout}`);
  }

  return {
    path: artifactRelativePath,
    rebuilt: true,
  };
}

async function main() {
  const icon = await verifyBinaryAsset('icon', expected.icon);
  const aixArtifact = await ensureAixArtifact();
  const aixData = await readRelative(aixArtifact.path);
  const aixAsset = {
    path: aixArtifact.path,
    bytes: aixData.byteLength,
    sha256: sha256(aixData),
    rebuilt: aixArtifact.rebuilt,
  };

  if (!aixArtifact.rebuilt) {
    assertEqual('aix.bytes', aixAsset.bytes, expected.aix.bytes);
    assertEqual('aix.sha256', aixAsset.sha256, expected.aix.sha256);
  }

  const runtime = await findAixRuntime();
  const wasm = await readFile(runtime.wasmPath);
  await runtime.init({ module_or_path: wasm });

  const reader = new runtime.AixReaderWasm(new Uint8Array(aixData));
  const pages = reader.get_pages();
  const tools = reader.get_tools();

  assertEqual('aix.title', reader.get_title(), expected.aix.title);
  assertEqual('aix.version', reader.get_version().trim(), expected.aix.version);
  assertArrayEqual('aix.pages', pages.map((page) => page.name), expected.aix.pages);
  assertArrayEqual('aix.tools', tools.map((tool) => tool.function.name), expected.aix.pages);

  for (const page of pages) {
    const keys = Object.keys(page.data_schema?.properties || {});
    if (keys.length === 0) {
      throw new Error(`Missing schema properties for ${page.name}`);
    }
  }

  console.log(JSON.stringify({
    ok: true,
    sourceAppCommit: expected.sourceAppCommit,
    icon,
    aix: {
      ...aixAsset,
      title: reader.get_title(),
      version: reader.get_version().trim(),
      pages: pages.map((page) => ({
        name: page.name,
        schemaKeys: Object.keys(page.data_schema.properties),
      })),
      tools: tools.map((tool) => ({
        name: tool.function.name,
        description: tool.function.description,
      })),
    },
  }, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
