[基本介绍](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md)
[插件介绍](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md)
这两份文档都是 2017 年的了, 但其中的插件核心是不变的

## 🍕 Babel 的处理步骤

解析(parse) -- 转换(transform) -- 生成(generate)

`babel.config.json` 中有两项内容:
`plugins` 和 `presets`,
`plugins` 中的执行顺序是顺序的;
`presets` 中的执行顺序是逆序的, 即先执行最后一个元素;
先执行 `plugins` 再执行 `presets`

### 解析

接收原始代码, 并输出 AST。
该步骤内主要做两件事:
**Lexical Analysis (词法分析)**
和
**Syntactic Analysis (语法分析)**

### 转换

转换步骤接收 AST 并对其进行遍历, 在此过程中可以做许多事情。
插件就介入在这个过程中。

### 生成

将经过转换的 AST 转换为字符串形式的代码, 同时创建 **source maps (源码映射)**。