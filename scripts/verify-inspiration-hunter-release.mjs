import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import init, { AixReaderWasm } from '../tools/unpacked/aix/package/pkg/aix_web.js';

const root = resolve(new URL('..', import.meta.url).pathname);

const expected = {
  sourceAppCommit: '13e12282042914a84ac12abe318aa238cebb00a7',
  icon: {
    path: 'apps/inspiration-hunter/assets/icon.png',
    bytes: 203673,
    sha256: 'd007f489dfb4c3727b7e67552fe6255c21fdc624e5841dae550a92cc416c4ee1',
  },
  aix: {
    path: 'artifacts/gdgeek-AIUI-apps-inspiration-hunter.aix',
    bytes: 210294,
    sha256: 'a6ab2dde6663013406e2edf98c2dda0eb33f982383d701efa9014edbe2ab1e09',
    title: 'Inspiration Hunter',
    version: '0.1.0',
    pages: [
      'pages/index/index',
      'pages/discovery/index',
      'pages/challenge/index',
    ],
  },
};

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

async function main() {
  const icon = await verifyBinaryAsset('icon', expected.icon);
  const aixAsset = await verifyBinaryAsset('aix', expected.aix);

  const wasm = await readRelative('tools/unpacked/aix/package/pkg/aix_web_bg.wasm');
  await init({ module_or_path: wasm });

  const aixData = await readRelative(expected.aix.path);
  const reader = new AixReaderWasm(new Uint8Array(aixData));
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
