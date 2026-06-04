# AIUI Craft Lingzhu End-to-End SOP

Date: 2026-06-04

这份文档是给以后所有 Rokid AIUI 项目复用的从 0 到发布流程。目标不是记录流水账，而是把这次 `Inspiration Hunter` 走通和踩坑的经验变成一条最短路径。

核心原则：本地仓库是唯一可信源，Craft 是在线开发和打包环境，Lingzhu 是发布和提审入口。不要只相信某个平台页面上的“看起来成功”，每个阶段都要有可复查的验收证据。

## 0. 最短总路径

1. 先定一个 60 到 90 秒能讲清楚的作品概念。
2. 先读 Rokid Glasses 设备约束：`docs/rokid/rokid-glasses-device-constraints.md`。
3. 在本地创建 `apps/<project-name>`，不要直接在网页里散落修改。
4. 写 `AGENTS.md`、`app.json`、`.ink` 页面、图标、场景数据。
5. 为眼镜预览优先做 448x150 关键路径适配。
6. 加入眼镜按键、返回键和 hands-free 自动推进。
7. 本地跑校验脚本，确认图标、页面、schema、AIX 都可解析。
8. 推送 GitHub。
9. 在 Craft 用 GitHub 子目录导入。
10. 在 Craft 运行，看到 `初始化成功` 后走一遍黄金路径。
11. 在 Craft 打包生成 `.aix`。
12. 把 `.aix` 放进 `artifacts/`，更新 manifest，再重新跑校验。
13. 在 Lingzhu 创建 `AIUI智能体`，上传 icon 和 `.aix`。
14. 等 Lingzhu 自动解析出 md5、标题、版本、页面、工具后再点确认。
15. 用 `defaultAgentId=<agent-id>` 回到 Craft 绑定智能体。
16. 再跑一次 Craft 运行测试。
17. 打开 `提审`，确认绑定目标，填写版本说明，提交。
18. 从官方发布入口或 Rokid 硬件启动验证。

只有第 16 步也通过，才算真正发布完成。

## 1. 立项和比赛设计

比赛项目不要先做“大而全”。先做一个评委 1 分钟能记住的核心瞬间：

```text
看到真实世界目标 -> 眼镜锁定 -> AI 给出意外洞察 -> 进入挑战或互动 -> 得到明确 payoff
```

推荐输出物：

- `docs/superpowers/specs/<date>-<project>-design.md`
- `docs/superpowers/plans/<date>-<project>-implementation.md`
- `docs/contest/<project>-submission.md`
- `docs/contest/<project>-demo-runbook.md`
- `docs/contest/<project>-judge-scorecard.md`

判断一个想法是否值得做：

- 第一屏能不能在 3 秒内让人知道发生了什么。
- 是否天然适合眼镜，而不是把手机网页搬到眼前。
- 是否能离线或半离线跑通稳定 demo。
- 是否有可拍照、可截图、可讲故事的舞台效果。

## 2. 本地项目结构

推荐结构：

```text
apps/<project-name>/
  AGENTS.md
  VERSION
  app.js
  app.json
  package.json
  assets/
    icon.png
    icon.svg
  lib/
    scenarios.js
  pages/
    index/index.ink
    discovery/index.ink
    challenge/index.ink

docs/contest/
docs/rokid/
scripts/
artifacts/
release/
```

每个 AIUI app 至少要准备：

- `AGENTS.md`：写清楚名称、版本、能力、demo 路径。
- `VERSION`：和 AIX 包版本对应。
- `app.json`：声明页面路由。
- `.ink` 页面：每页都写 `description` 和 `schema.data`，方便 Lingzhu 生成工具。
- `assets/icon.png`：Lingzhu 上传用，建议 1024x1024 PNG。
- `lib/scenarios.js`：稳定 demo 数据，避免现场依赖不可控接口。

## 3. 眼镜预览优先设计

这次最大的教训：Craft 预览不是普通手机长页面。`Inspiration Hunter` 第一次在 Craft 里能初始化，但 448x150 预览只看到上半张卡片，看不到 `开始解析`，实际不可用。

以后所有 AIUI 页面先按眼镜关键路径设计：

- 主容器固定到 Craft 预览高度，例如 `.screen { height: 150px; overflow: hidden; }`。
- 不要在核心页面使用 `min-height: 100vh` 作为主要布局。
- 第一屏必须同时露出标题、状态和主按钮。
- 横向布局优先，关键信息用短句。
- 不要依赖鼠标精确点击；支持 `Enter`、`Backspace`、语音和短停留自动推进。
- 动效和装饰只服务识别感，不占用主路径空间。
- 每个页面的下一步按钮必须在 448x150 内可见。

建议给每个项目加一个视口回归测试。`Inspiration Hunter` 的示例是：

```bash
node --test scripts/inspiration-hunter-viewport-fit.test.mjs
```

这个测试不替代 Craft 截图，但可以阻止再次把页面改回长屏手机布局。

## 4. 本地校验门禁

每次交给 Craft 或 Lingzhu 前都要跑本地校验。

`Inspiration Hunter` 当前命令：

```bash
node scripts/verify-inspiration-hunter-release.mjs
node --test scripts/inspiration-hunter-viewport-fit.test.mjs scripts/build-inspiration-hunter-submission-pack.test.mjs
AIX_VERIFY_REBUILD=1 node scripts/verify-inspiration-hunter-release.mjs
```

校验要覆盖：

- icon 文件存在、大小和 hash 稳定。
- AIX 文件存在，并能用官方 AIX reader 解析。
- AIX 标题和版本符合预期。
- 页面列表完整。
- 每个页面有 schema-backed tools。
- 发布包里包含 icon、AIX、路演材料、handoff 文档、流程手册。

## 5. GitHub 和 Craft 导入

Craft 推荐用 GitHub 子目录导入：

```text
https://github.com/<owner>/<repo>/tree/main/apps/<project-name>
```

如果 GitHub SSH 22 端口不通，仓库 remote 用 443：

```bash
git remote set-url origin ssh://git@ssh.github.com:443/<owner>/<repo>.git
git push origin main
```

导入后在 Craft 检查：

- 文件树里有 `app.js`、`app.json`、`lib/`、`pages/`。
- 页面卡片都是 `READY`。
- 点击 `运行智能体` 后出现 `初始化成功`。
- 预览区能看到第一屏主按钮。

如果 Craft 仍然显示旧代码：

1. 点击重新加载当前工程。
2. 再次用 GitHub 子目录导入同一个 main URL。
3. 仍然不行时，重新打开 GitHub 子目录导入表单，再确认同一个 main URL；`Inspiration Hunter` 最终就是靠这个动作刷新到了最新源码。
4. 具体 commit URL 只作为实验兜底，不要默认依赖它，因为 Craft 可能无法解析完整 commit SHA 的 `/tree/<commit-sha>/...` 地址。
5. 重新运行智能体并截图确认。

```text
https://github.com/<owner>/<repo>/tree/main/apps/<project-name>
```

## 6. Craft 打包

本地 CLI 不稳定或缺失时，优先使用 Craft 打包。

推荐步骤：

1. 先运行智能体，确认 `初始化成功`。
2. 点击 `打包`。
3. 保持默认项，尤其是 `资源优化` 和 `JSON 校验`。
4. 点击 `开始打包`。
5. 下载 `.aix`。
6. 放入 `artifacts/`。
7. 更新 `docs/contest/<project>-release-manifest.json` 里的 bytes 和 sha256。
8. 重新运行 verifier。
9. 重建 `release/<project>-submission-pack.zip`。

不要把 `.zip` 上传到 Lingzhu 的 `agent程序包` 字段，那里要的是 `.aix`。

## 7. Lingzhu 创建 AIUI 智能体

入口一般是：

```text
https://rizon.rokid.com/space/<space-id>/develop
```

路径：

```text
项目开发 -> AIUI智能体 -> 创建
```

推荐表单：

```text
智能体名称: <PascalOrCamelName>
智能体版本: 1.0.0
类别: 选择最接近的用户场景
功能介绍: 一句话说明价值
开场白: 一句用户可以说出口的启动语
```

眼镜类 demo 常用权限：

```text
网络
摄像头
语音识别
麦克风
```

上传文件：

```text
图标*: apps/<project-name>/assets/icon.png
agent程序包: artifacts/<package-name>.aix
```

上传 `.aix` 后必须等这些字段自动填充：

```text
文件md5值
jsui包标题
jsui包版本
jsui包页面
jsui包工具
```

如果这些字段为空，不要点 `确认`。

## 8. 文件选择器的现实限制

Codex in-app browser 可以点按钮、填表、勾权限、读页面状态，但不能稳定地绕过系统原生文件选择器。这是浏览器和操作系统的安全边界。

最快方式：

1. Codex 打开文件选择器。
2. 人手按 `Shift + Command + G`。
3. 粘贴 Codex 给出的绝对路径。
4. Enter，确认选择。
5. Codex 继续检查 Lingzhu 是否解析成功。

不要把时间浪费在注入 `File`、`Blob`、`DataTransfer`、`localStorage` 上；这个环境里这些 API 不可靠。

## 9. Craft 绑定和提审

Lingzhu 创建成功后，记录 agent ID，然后用这个 URL 回到 Craft：

```text
https://js.rokid.com/craft?defaultAgentId=<agent-id>
```

提审前检查：

- URL 里有 `defaultAgentId`。
- `提审` 第一步显示的是当前 Lingzhu 智能体。
- icon、名称、版本、ID 都和 Lingzhu 一致。
- 重新运行智能体，黄金路径可用。

已有智能体上传新 AIX 时，按这个顺序走：

1. 在 Craft 打开 `设置` -> `本地目录`。
2. 选择 Lingzhu AIUI 智能体，必要时点击 `绑定当前目录`。
3. 保存设置。
4. 打开 `打包`，重新生成 AIX，再点 `上传到灵珠`。
5. 递增版本号，例如 `1.0.0` -> `1.0.1`。
6. 确认上传，并等到上传成功提示。
7. 回到 `设置` -> `本地目录`，点击 `刷新绑定`，再保存设置。
8. 只有当 `提审` 第一步显示新版本号时，才继续提交提审。

`Inspiration Hunter` 这次踩到的坑：上传 `1.0.1` 后，Craft 第一次打开提审仍显示旧的 `版本 1.0.0`，后台日志出现版本校验错误。刷新绑定后，提审目标变成 `版本 1.0.1`，再次提交才成功进入 `审核中`。

建议版本说明：

```text
Initial contest demo release. Includes scan landing, discovery explanation, and challenge payoff flow.
```

不要在运行测试失败时提审。可以先创建智能体，但提审必须等黄金路径可见、可点、可讲。

## 10. 最终验收标准

不能只因为某一步成功就说发布完成。下面这些说法都不等于发布：

- AIX 能解析。
- Craft 能初始化。
- Lingzhu 智能体创建成功。
- Craft URL 有 `defaultAgentId`。
- `提审` 面板能打开。

真正完成需要：

- 最新 AIX 已上传到绑定的 Lingzhu AIUI 智能体。
- Craft 提审返回成功。
- 官方发布入口或目标 Rokid 设备可以启动。
- 至少走过一次完整路径：scan -> discovery -> challenge。
- 截图或文字证据已经写入 final release evidence 文档。

## 11. Inspiration Hunter 当前复用值

```text
Local app:
/Users/geek/Documents/AIUI/apps/inspiration-hunter

GitHub import:
https://github.com/gdgeek/AIUI/tree/main/apps/inspiration-hunter

Icon:
/Users/geek/Documents/AIUI/apps/inspiration-hunter/assets/icon.png

AIX:
/Users/geek/Documents/AIUI/artifacts/gdgeek-AIUI-apps-inspiration-hunter.aix

Lingzhu agent ID:
7c5ebbe8edc04f1fa09b6bf9c59a3f26

Craft bound URL:
https://js.rokid.com/craft?defaultAgentId=7c5ebbe8edc04f1fa09b6bf9c59a3f26
```

当前还不能写“已完全发布”，因为最后还需要在 Craft 重新导入最新 448x150 版本、跑通黄金路径、提交提审，并从官方入口或设备侧验证启动。

## 12. 下个项目直接复制的执行清单

```text
[ ] 写概念和 60 秒 demo hook
[ ] 创建 apps/<project-name>
[ ] 准备 AGENTS.md / VERSION / app.json / app.js
[ ] 准备 1024x1024 icon.png
[ ] 写 2 到 3 个 .ink 页面
[ ] 每页补 description 和 schema.data
[ ] 按 448x150 检查首屏和按钮
[ ] 增加本地 verifier 和 viewport test
[ ] 推送 GitHub
[ ] Craft GitHub 子目录导入
[ ] Craft 运行并截图
[ ] Craft 打包 .aix
[ ] 本地解析 .aix
[ ] 更新 release manifest
[ ] 重建 submission pack
[ ] Lingzhu 创建 AIUI 智能体
[ ] 上传 icon 和 .aix
[ ] 等 Lingzhu 解析字段齐全
[ ] 记录 agent ID
[ ] Craft 用 defaultAgentId 绑定
[ ] Craft 重新运行黄金路径
[ ] Craft 提审
[ ] 官方入口或设备启动验证
[ ] 把证据写回 docs/contest/*final-release-evidence.md
```
