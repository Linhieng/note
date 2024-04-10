## 🍕 错误类型

错误类型的定义均通过 `mongoose.Error` 获取, 比如 `mongoose.Error.ValidationError`

拥有的错误类型如下:

- `Error.CastError`
- `Error.DivergentArrayError`
- `Error.DocumentNotFoundError`
- `Error.MissingSchemaError`
- `Error.MongooseServerSelectionError`
- `Error.OverwriteModelError`
- `Error.ParallelSaveError`
- `Error.StrictModeError`
- `Error.ValidationError`
- `Error.ValidatorError`
- `Error.VersionError`

上面的错误类型, 同时也是 `Error.prototype.name` 的一部分, 除此之外还有:

- `MongooseError`
- `DisconnectedError`
- `ObjectExpectedError`
- `ObjectParameterError`

## 🍕 错误说明

在开始之前, 要有一些前置知识:

- [validation 验证](./mongoose-validation.md)

### `ValidationError`

验证失败, 常见于插入数据时, 数据类型和定义的 `Schema` 类型不一致

## 🍕 其他收集到的错误

### `MongoBulkWriteError`

具体说明: `E11000 duplicate key error collection: guli.edu_teachers index: name_1 dup key: { name: "张三" }`
原因: name 属性定义了 `union:true`
解决: 删除 union 或者不要插入相同的 name
具体原因(不确定): 当 name 设置了 union 后, 若两个文档的 name 相同, 这这两个文档会被认为是同一个, 他们的 _id 也会是一样的

### `BSONTypeError`

这个错误在哪里不清楚, 但这个错误继承自 `TypeError` 原生错误,
不过可以通过 `e.name === 'BSONTypeError'` 来识别是否是这个错误