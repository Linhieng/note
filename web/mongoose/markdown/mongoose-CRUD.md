## 🍕 create 创建

先定义 `Schema`, 然后创建 `model`, 最后通过 `Model` 的相关方法插入数据即可.

注意: 定义 `Schema` 时, 要使用对象定义的形式, 并且要确保该属性存在, 所以一定要有 `required` 或 `default` 属性,
当然, 数组类型的是个例外, 即使不配置也会自动生成一个空数组, 比如:

```js
new Schema({
  id: { type: Schema.Types.ObjectId, required: true },
  modified: {type: Date, default: null},
  children: [{type: Schema.Types.ObjectId, ref: 'other_collection_name'}]
})
```

这样才能确保数据库了解文档的格式, 不然, 当用户没有插入对应的属性时, 数据库中就不会有对应的属性,
若在后续使用时, 使用的是有对应属性的 `Schema`, 则会发现操作失败, 因为没有对应的文档

- `Model.create`
- `Model.insertMany` 可以是数组, 也可以是对象, 但返回(await)的都是数组

## 🍕 retrieve 查找

[文档](https://mongoosejs.com/docs/models.html#querying)

- `Model.find()`
- `Model.findById()`
- `Model.findOne()`
- `Model.where()`

查询返回的是一个 `Query` 对象。
**注意** 默认是无法修改 `Query` 对象的

### `<<Query>>` 对象身上的一些方法

- `lean()`, 返回一个纯粹的 js 对象(显示为 LeanDocument)
- `select()`, 返回可选项, 可以限制文档的属性, 但不知道是否可以限制子文档的属性

## 🍕 update 修改

如果是使用 ObjectId 进行查询, 注意不要直接使用字符串, 而是要 `new Types.ObjectId(id)`,
并且, 不是任何字符串都有效的, 通过其他方式创建的数据库, id 可能无效

- [`Query.prototype.findOneAndUpdate()`](https://mongoosejs.com/docs/api.html#query_Query-findOneAndUpdate)

## 🍕 delete 删除