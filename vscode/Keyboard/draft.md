# 草稿

```json
[
{
    "key": "ctrl+alt+n",
    "command": "workbench.action.tasks.runTask",
    // 由于只用于运行 rust 命令，所以可以提供一个 editorLangId == rust
    "when": "editorTextFocus && editorLangId == rust",
    // 提供 task 的 label 值
    "args": "rust: run variables"
},

{
    "key": "ctrl+l ctrl+v",
    "command": "editor.action.pasteAs",
    "when": "editorLangId == 'markdown'",
    "args": {
        // id 为 text 表示粘贴为纯文本
        "id": "text"
    }
},

{
    // 该快捷键用来运行 jest 测试
    // 添加 when 是为了和首字母大写快捷键区分开，同时确保只在 *.test.js 文件中执行，后续可能还会添加 .(js|ts|jsx) 之类的。
    "key": "ctrl+l ctrl+t",
    "command": "workbench.action.tasks.runTask",
    "when": "!editorHasSelection && resourceFilename =~ /.*test\\.(js|ts)/",
    "args": "jest single file"
},

{
    // py 中混用空格缩进和制表符缩进时，容易报错。提供的格式化工具又不会自动转换缩进类型。而且不怎么用到格式化，所以直接占用格式化快捷键。
    "key": "shift+alt+f",
    "command": "editor.action.indentationToSpaces",
    "when": "(editorLangId == 'python' || resourceFilename =~ /.*\\.py/i) && !editorHasSelection"
},

]
```
