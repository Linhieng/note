## 🍕 疑惑

如何获取子文档, 而不是整个文档

## 🍕 自动带上 s 问题

```js
const s = new Schema({name: String})
model('children', s)
```
上面的代码会自动创建一个名为 **childrens** 的 `collection`

可以使用方式解决:

- 方法一:

  ```js
  const s = new Schema({name: String}, {collection: 'children'})
  model('any name', s)
  ```

- 方法二:

  ```js
  const s = new Schema({name: String})
  s.set('collection', 'children')
  model('any name', s)
  ```

- 方法三:

  ```js
  const s = new Schema({name: String})
  model('any name', s, 'children')
  ```


## 🍕 关于连接数据库

使用 `mongoose.connect(url, config)` 可以创建一个默认连接,
并且可以通过 `mongoose.connection` 获取连接对象

如果要连接多个数据库时, 请使用 `mongoose.createConnection()` 函数,
该函数会返回一个连接对象 `connection`

`connection` 的作用有:

- 监听事件, 比如 `connection.on('disconnected', connectFun)`

## 🍕 类型

对某个属性设置为必填时, 空字符相当于没有输入。
注意，设置了默认值后，required 就应该是 false 了，
而且，required 为 false 时, 空字符串不会被替换成预设的默认值, 所以需要对空字符串进行处理, 将其设置为 undefined

### 错误类型

`Error.ValidationError`
`Error.CastError` 查找出错

### 定义嵌套类型(子文档)

- [参考1](https://segmentfault.com/q/1010000004326563)
- [查看文档中的 `Arrays` 部分说明](https://mongoosejs.com/docs/schematypes.html#usage-notes)
- [其他](https://runebook.dev/zh-CN/docs/mongoose/subdocs)

示例代码:

```js
const subjectChildren = new Schema({
  id: {type: Schema.Types.ObjectId, required: true},
  title: {type: String, required: true}
})
export const EduSubject = model('edu_subjects', new Schema({
  id: { type: Schema.Types.ObjectId, required: true },
  title: {type: String, required: true},
  children: { type: [subjectChildren], required: false }
}))
```

### 对子文档进行插入

下面代码可以将一个对象 push 到 EduSubject 的 children 子文档中
```js
await EduSubject.findOneAndUpdate({ title: '后端开发' }, {
    '$push': {
      children: {
        $each: [{
          id: new Types.ObjectId(),
          title: '巴拉'
        }]
      }
    }
  })
```

## 🍕 积累方法

不确定描述的是否正确, 有些是没看文档写下的笔记

`model()` 方法返回的对象是一个 `Model`

- `Model.countDocuments()` 计算文档总量
- `Model.find({}, null, {limit, skip})` 分页查询

## 🍕 mongoose 结构

- `mongoose`

  - `Error` 可获取错误对象
  - `Types` 用于创建类型, 如 `new Types.ObjectId()`, `new Types.Decimal128()`
  - `Schema` 里面也有一个 `Types` 类型, 但仅代表类型, 注意和 `mongoose.Types` 区分
  - `connect` 连接数据库
  - `model`