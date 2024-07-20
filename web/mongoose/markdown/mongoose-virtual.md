mongoose 中有虚拟属性的概念

[参考1](https://runebook.dev/zh-CN/docs/mongoose/tutorials/virtuals)
[官网 populate virtuals](https://mongoosejs.com/docs/populate.html#populate-virtuals)
[官网 `Schema.virtual`](https://mongoosejs.com/docs/api/schema.html#schema_Schema-virtual)

需要对 Schema 开启一定配置, 虚拟属性才会显示出来:

```js
const s = new Schema({}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
```

或者

```js
const s = new Schema({})
s.set('toJSON', { virtuals: true })
s.set('toObject', { virtuals: true })
```

通过 `Schema.prototype.virtual()` 可以为其添加一个虚拟属性, 比如:
```js
const s = new Schema({})
s.set('toJSON', { virtuals: true })
s.set('toObject', { virtuals: true })
s.virtual('id').get(function () {
  return this._id
})
```

上面的 `toJSON` 和 `toObject` 是 `Document` 文档的方法, 开启虚拟化后,
当调用文档的这两个方法时, 虚拟属性就会附带上去, 默认是不附带的。

**注意** `Query.prototype.lean()` 是不会附带上虚拟属性的