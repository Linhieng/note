# 更新内容

记录一些每次更新时觉得有趣/有用的功能

## v1_90

- 支持使用 `window.newWindowProfile` 配置新窗口的默认 profile
- 开发 vscode 扩展，使用 esbuild 作为 bundle。[详见官方案例参考](https://github.com/microsoft/vscode-extension-samples/tree/main/esbuild-sample)。

- 注意，vscode 引入的 `terminal.integrated.suggest.enabled` 功能，目前看来不咋地，可能是因为我本身用的是 powershell 7 吧，pwsh7 本身就提供了代码提示，开启该功能后，启动终端时变慢了，而且输出了一段乱的 json 数据。

## v1_89


添加 `markdown.experimental.updateLinksOnPaste` 配置，能够让我们在 vscode 内复制粘贴 markdown 文本时，自动处理相对引用。

下面是一个案例，假设我们有这么一段 md 文本：

```md
# 测试

1. 请参考 [详见官方案例参考][ref1]。
2. [读写文件][ref2]

[ref1]: https://github.com/microsoft/vscode-extension-samples/tree/main/esbuild-sample
[ref2]: https://docs.deno.com/runtime/tutorials/read_write_files
```

然后，我们只复制了 `1. 请参考 [详见官方案例参考][ref1]` 这一部分。在以前，我们粘贴后，还需要自己处理相对引用，但现在，当我们开启 `markdown.experimental.updateLinksOnPaste` 为 `true` 后，vscode 将会自动帮助我们处理 `ref1` 的相对引用。

## v1_88

- 新增功能 workbench.editor.customLabels.patterns

当你配置：
```json
"workbench.editor.customLabels.patterns": {
    "src/components/**": "/${dirname}.${extname}"
}
```
然后，打开 src/components/Button/index.vue 和 src/components/Aside/index.vue 时，编辑器上会显示 /Button.vue 和 /Aside.vue，而不是 index.vue

- 新增命令 View: Toggle Locked Scrolling Across Editors

开启锁定滚动后，当你滚动时，视口中的所有编辑器都会同步滚动。
同时，你也可以为 `workbench.action.holdLockedScrolling` 命令配置快捷键，这样，当你按下这个快捷键时，可以临时锁定滚动。不过，经过我的实测效果一般，还存在 bug。

- 🎉重新加载扩展时，终于不再需要重启整个窗口了！当然，ssh 中还是需要的。

- 支持为新地图定义小标题

在文件的每行中使用：`//#region 小标题` 或 `//MARK: 小标题`，此时小地图中会显示对应的小标题。

- 新的文件链接格式 `FILE  path:line:column`

比如 `index.md line 6 column 4`


## v1_86

- 在 Command Palette 中以 `%` 开头可以快捷进行全局搜索。
- 支持 Toggle Word Wrap in Output panel! （快捷键 `alt+z`）
