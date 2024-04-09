# 快捷键

[点击查看我自定义的快捷键](https://github.com/Linhieng/vs-keymap/blob/main/src/keybindings.jsonc)

## when clause

when 表达式中的大部分条件操作符和 JavaScript 语法一致。需要注意的只有 `=~`, 该操作符用于匹配正则。此外还有 `in` 和 `not in` 操作符，和 Python 的类似。

when 表达式的左值有很多，目前只记录一些我用到的。至于右值，基本是和左值相关联的。所有有效的左值可以在 [when available-context-keys] 查看。

编写好 when 表达式后，可以在 keyboard shortcuts (`ctrl+k,s`) 中查看一下，如果发现显示为 `-`，则说明表达式语法出错。

### 案例

```js

activePanel == 'workbench.panel.output'
// 要求 “OUTPUT” 面板显示


editorLangId == 'python'
// 指定文件类型为 python


resourceFilename =~ /.*\\.py/i
// 使用正则指定文件名。

resourceExtname == .js
// 指定文件后缀名为 js


!editorHasSelection
// 要求没有选中任何文本
```


[when available-context-keys]: https://code.visualstudio.com/api/references/when-clause-contexts#available-context-keys
