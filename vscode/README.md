# 我的 vscode

TODO:

- [ ] 该仓库中的几乎所有内容已经无用了（太过熟悉了，就会感觉这些旧笔记写的不好），需要清理掉。
- [ ] 完善 tasks 内容，总结 [该文章](https://juejin.cn/post/7035448197883363359) 中的有用知识点

## [智能提示/建议 IntelliSense](https://code.visualstudio.com/docs/editor/intellisense)

[提示中各个图标的含义](https://code.visualstudio.com/docs/editor/intellisense#_types-of-completions)

## [Emmet](https://code.visualstudio.com/docs/editor/emmet)

Emmet 用来提供简写，比如在 HTML 文件中，输入下面内容：

- `div#id>p`
- `div{$}*10`
- `.box$*10`
- `ul>li*18`

可在 [Emmet 文档](https://docs.emmet.io/cheat-sheet/) 中查看所有可用的简写

## Command-Palette 命令

| command                                                  | command palette                              | 简单说明                                             |
| -------------------------------------------------------- | -------------------------------------------- | ---------------------------------------------------- |
| editor.action.inspectTMScopes                            | Developer: Inspect Editor Tokens and Scopes  | 查看查看代码中各个部分的作用域，对定制代码高亮很有用 |
| workbench.action.files.setActiveEditorReadonlyInSession  | File: Set Active Editor Readonly in Session  | 设置当前文件为只读，同理还有 Reset 和 Toggle 命令    |
| workbench.action.files.setActiveEditorWriteableInSession | File: Set Active Editor Writeable in Session |                                                      |
