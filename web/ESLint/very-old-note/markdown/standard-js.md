`standard` 是 `ESLint` 的加强版, 他帮我们定义了规范, 并且不能修改。
我感觉 `standard` 的大多数规范和我的规范是相同的,
所以使用 js 时可以直接使用 `standard` 替代 `ESLint`

同时, 可以以通过查看 [standard rules](https://standardjs.com/rules-zhcn.html)
来学习 `ESLint` 的相关规范。

## 🍕 standard 规范

具体说明就不给出了, 想要的可以查看[文档](https://standardjs.com/rules-zhcn.html)

这里将 standard 中给出的规则全部整理出来放到了 [rules.js](./resources//rules.js) 文件中了
被注释掉的配置, 是我认为不需要的, 直接用 `'error'` 表示的规则, 不一定是我所了解的那样, 所以后续会有更改.
但更改不会在 [rules.js](./resources//rules.js) 文件夹内更改,
而是整理到 [accumulate-rules](./accumulate-rules.md) 文件里面了

**注意**: standard style  是针对 js 的规范, 对于 ts 并不完全适用

下面给出一些不适用与 ts 的配置项(就是直接注释掉, 不管他的)

- `no-extra-parens`
- `no-unused-vars`
- `no-useless-constructor`
