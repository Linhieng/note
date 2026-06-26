## 🍕 standard

[官网](https://standardjs.com/index.html)

安装 `npm install standard --save-dev`

安装插件 `standard.vscode-standard`

快捷 fix 命令 `standard.executeAutofix`


## 🍕 start

`npm init @eslint/config` 按照提示依次选择

完成 eslint 初始化后，会有一个 `.eslintrc.{js,yml,json,csj}` 文件。
此时还是的 eslint 还没有任何 `rules` ，所以执行 `npx eslint index.ts` 检查时不会有任务错误。

建议安装 `ESLint` 插件，这样就不需要执行 `npx eslint index.ts` 也能检查错误了。

## 🍕 rules
rules 可以在 [官网](https://eslint.org/docs/latest/rules/) 查看

## 🍕 .eslintrc.json 换 .eslintrc.js

不建议使用 `.eslintrc.json`, 有些情况下, 会因为注释和尾随逗号导致错误, 但是 vscode 又不提示, 只是警告.

可以重新执行一遍 `npm init @eslint/config` 进行替换.

## 🍕 eslint 插件不生效

先试试命令行执行一下, 看看是否成功.
如果命令行成功, eslint 还是不生效, 看看这篇[文章](https://blog.csdn.net/qq_35459724/article/details/122192106)