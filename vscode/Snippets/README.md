# [代码片段](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

<!-- [我的代码片段在这里](../backup/%E6%88%91%E7%9A%84%E4%BB%A3%E7%A0%81%E7%89%87%E6%AE%B5.code-snippets) -->

全局代码片段支持以下参数：

- `scope`：指定作用范围，不能乱写。并且区分大小写。使用逗号分割多个值。具体有哪些可用值，可通过 `ctrl+k m` 快捷键查看，注意是括号内的值。比如是 `html` 而不是 `HTML`，是 `markdown` 而不是 `Markdown`。

- `prefix`：触发代码片段的前缀，通过字符串数组可以设置多个触发前缀。

- `body`：具体的代码片段。可以是字符串，也可以是字符串数组。其中有一些特殊变量值，比如 `$1`, `$2`, ... 可指定 tab 跳转位置。`$0` 是最终光标的停留位置。`${1:default_name}`, `{2:default_name}`, ... 在 `$1`, `$2` 的基础上支持默认值（占位字符串）

- `description`：描述信息

## [vscode 代码片段中提供的变量](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_variables)

使用方法：`$name` 或者 `${name:default_value}`。

example              | 说明
---------------------|-------------
`$TM_FILENAME`       | 当前文件名
`$TM_FILENAME_BASE`  | 当前文件名，不含后缀
`$TM_FILEPATH`       | 当前文件的完整路径
`$RELATIVE_FILEPATH` | 当前文件相对工作区的路径
`$CURRENT_YEAR`      | 年，比如 2023
`$CURRENT_MONTH`     | 月，比如 09
`$CURRENT_DATE`      | 日，比如 16
`$CURRENT_HOUR`      | 点，比如 10
`$CURRENT_MINUTE`    | 分，比如 27
`$CURRENT_SECOND`    | 秒，比如 14

## 旧笔记搬运

可以在项目中创建 `.vscode/.code-snippets` 文件，作为该目录中的特定代码片段。
或者运行 snippet configure user snippets 创建全局、指定语言的代码片段。

可以在 `%vscode安装目录%\Microsoft VS Code\resources\app\extensions\javascript\snippets` 中修改 js 文件的默认代码片段，其他语言同理。在这里面可以很方便的学习代码片段的编写以及使用方式，同时还可以找到一些不知道的代码片段，比如 `Region` 强制折叠。

案例：

```json
{
    "获取当前时间": {
        "prefix": [ "get-time" ],
        "body": [
            "$CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE $CURRENT_HOUR:$CURRENT_MINUTE",
        ],
        "description": "获取当前时间"
    },
    "初始化 “长期更新的文件” 模板": {
        "prefix": [ "!", "！" ],
        "body": [
            "/**",
            " * @author:  Linhieng",
            " * @data:    $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE $CURRENT_HOUR:$CURRENT_MINUTE",
            " * @文件说明: $1 ",
            " */"
        ],
        "description": "基本代码模板"
    },
}
```

代码片段属于 suggest。通过快捷键 ctrl+i 可触发 suggest。suggest 有很多类型，代码片段（snippets）只是其中的一类。通过 `editor.snippetSuggestions` 配置项可用来代码片段的显示级别，有以下可选值；
    - `none`: 代码片段不显示在 “建议” 中。可搭配“插入代码片段”快捷键使用。
    - `top`：代码片段级别最高，会显示在其他 suggest 类型的前面。当使用 top 时，可以为自定义的代码片段提供一个特殊的前缀，这样就能保证自己的代码片段一定在最上方了。
    - `bottom`：与 `top` 相反。
    - `inline`：默认值。表示穿插在其他类型之间。
