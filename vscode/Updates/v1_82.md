# vscode 1.82 简介

我只记录对我个人来说有趣的特性。完整的更新记录请查看[官方文档](https://code.visualstudio.com/updates/v1_82)

## Workbench

### Built-in port forwarding

1. 打开一个想要在网络上共享的文件夹
2. 在终端上运行 `npx serve`，或者自己搭建一个 serve
3. 命令行（ctrl+shift+p）运行 `ports: focus on Ports View`，选择一个端口启动
4. 点击对应链接就可以在线上访问了，默认是私有的，只能登录对应的 github 账号才能看到

### 控制是否允许鼠标和键盘快捷键来关闭 pinned tabs

> 所谓 pinned tab，就是将某个 tab 固定在上方。可以通过鼠标右键点击 pin 来固定，或者通过快捷键 `ctrl+k, shift+enter` 来切换是否固定。

`workbench.editor.preventPinnedEditorClose` 配置项有以下可选值：

- `keyboardAndMouse` 默认，不允许鼠标和键盘来关闭被固定的 tab
- `keyboard` 不允许键盘快捷键关闭（ctrl+w）
- `mouse` 不允许鼠标中键关闭
- `never` 允许鼠标和键盘快捷键来关闭

## Editor

### 允许通过快捷键快速定位 Code Actions 和 QuickFix 的 navigation

简单的说，就是当执行了某个 Code Actions 或 QuickFix 时，会有一些选项，现在可以通过它们的首字母来快速切换了，不需要按上下键。

> code actions: 比如选中某段代码，然后按下 `ctrl+shift+R` 触发重构，这就是一个 code actions

### 支持保存 json 文件时自动排序

开启 `json.sortOnSave.enable` 为 `true` 即可在保存 json/jsonc 的时候自动排序。

```json
// 排序前：
{
    "c": "xxx",
    "b": "xxx"
}
// 排序后
{
    "b": "xxx",
    "c": "xxx"
}
```

## Diff Editor

- `diffEditor.experimental.showMoves` 配置项，设置为 true 时能够显示代码块的移动。

- `diffEditor.hideUnchangedRegions.enabled` 配置项，设置为 true 时会自动折叠（collapsing）未变更的代码。

- `diffEditor.useInlineViewWhenSpaceIsLimited` 配置项，默认情况下，当两个 diff 宽度太小时，会自动变为一个 diff。设置为 false 可以禁止这一行为（不清楚有什么场景会用到，都看不见内容了）。

## Ternimal

- `terminal.integrated.hideOnStartup` 默认为 `never`，如果关闭某个项目时 ternimal 是显示状态的，那么再次打开时也会自动显示。设置为 `always` 可以禁止这一行为，这样一来每次打开之前的项目时，都不会自动显示出 ternimal 了。

## Debug

一个非常有用的更新，虽然只有短短几句话，但非常有用。

> **Source map loading improvements**
>
> We made many improvements to the way source maps are loaded in this release:
>
> - Source maps in some common cases, like in applications compiled with the tsc command line, are loaded 3-5x faster.
> - Hot module reloading from the Vite dev server is now supported.
> - Source maps can now be automatically loaded from authenticated endpoints.

其他的不清楚，但有关 vite 那条，指的是通过 vite 项目调试 vue 源码时，不需要在 vite.config.js 中配置以下内容了

```js
optimizeDeps: {
  exclude: ['vue']
}
```

## language

搭配以下配置项：

```json
"editor.inlayHints.enabled": "on", // 可选，因为这是默认指
"typescript.inlayHints.parameterNames.enabled": "all", // 必须，因为不是默认值
"javascript.inlayHints.parameterNames.enabled": "all", // 必须，因为不是默认值
```

效果是：

```ts
function fn(a, b) {}
// 未配置前，效果是：
fn("123", 312);
// 配置后，效果是：可以直接点击 a，b 参数调到对对应声明的位置（可能是声明文件）我记得这个功能在 idea 中一直都有的。
fn(a: "123", b: 312);
```

## Preview Features

打开 Command Palette（ctrl+p），输入 `%` 就可以在当前项目（workspace）中快速搜索对应内容了。
