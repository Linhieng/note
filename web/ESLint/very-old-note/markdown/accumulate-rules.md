等这里积累的较多了, 就要清理掉一些熟悉的了.

这里的笔记格式, 学习官方文档的, 只不过较为简洁, 就当翻译了

## 🍕 new-cap

[new-cap - ESLint](https://eslint.org/docs/latest/rules/new-cap)

### Options

- `newIsCap`: 为 `true` 则要求所有 `new` 调用的函数, 首字母必须大写.
- `capIsNew`: 为 `true` 则要求所有首字母大写的函数必须由 `new` 调用
- `newIsCapExceptions`: 定义了 `newIsCap` 的例外项, 比如指定 `event`, 则允许 `new event()`
- `capIsNewExceptions`: 定义了 `capIsNew` 的例外项, 比如指定 `Router`, 则允许 `const router = Router()`
