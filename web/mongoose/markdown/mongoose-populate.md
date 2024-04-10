关键词: `populate`, `ref`, `外键`

- [参考1](https://juejin.cn/post/7025910030033485854)
- [参考2](https://juejin.cn/post/6844904008495300616)
- [参考3](https://www.yisu.com/zixun/187392.html)
- [官方文档](https://mongoosejs.com/docs/populate.html)


## 🍕 通过代码案例理解

代码的基本结构如下:

```js
// tmp.js
const mongoose = require('mongoose')
const { connect  /* ... */ } = mongoose

async function main () {
  const db = await connect('mongodb://localhost:27017/test')

  /* 书写代码 */

  db.disconnect()
}
main()

```

### 代码案例一

```js
const personSchema = Schema({ name: String })
model('persons', personSchema) // 会在数据库中创建一个名为 persons 的 collection

const movieSchema = Schema({
  name: String,
  director: {
    // 可以通过 ref , 指定类似于 mysql 中的 "外键"
    type: Schema.Types.ObjectId, // 类型一般都设置为 ObjectId
    ref: 'persons' // 与数据库中的 collection 名称对应
  },
  actors: [{ // 也可以是数组
    type: Schema.Types.ObjectId,
    ref: 'persons'
  }]
})
const Movie = model('movies', movieSchema)

// 创建三个人名, 会返回创建好的文档内容, 里面有 _id 属性
const createPerson = await Person.create([{ name: '周星驰' }, { name: '黄圣依' }, { name: '元华' }])
await Movie.create([{
  name: '功夫',
  // 这里只保存 persons 中的 _id 值就可以了
  director: createPerson[0]._id,
  actors: [
    createPerson[0]._id,
    createPerson[1]._id,
    createPerson[2]._id
  ]
}])

// 下面看看 populate 有什么用:

const a = await Movie.find({name: '功夫'})
console.log('✨✨✨debugger: ', a)
/*
[{
    _id: new ObjectId("6360c358d8092ac1b9877a07"),
    name: '功夫',
    director: new ObjectId("6360c358d8092ac1b9877a01"),
    actors: [
      new ObjectId("6360c358d8092ac1b9877a01"),
      new ObjectId("6360c358d8092ac1b9877a02"),
      new ObjectId("6360c358d8092ac1b9877a03")
    ],
    __v: 0
  }
]
可以看到, 此时并无法获取 director 实际的内容, 只有一个 "外键"
*/

const b = await Movie.find({name: '功夫'}).populate('director')
console.log('✨✨✨debugger: ', b)
/*
[{
    _id: new ObjectId("6360c358d8092ac1b9877a07"),
    name: '功夫',
    director: {
      _id: new ObjectId("6360c358d8092ac1b9877a01"),
      name: '周星驰',
      __v: 0
    },
    actors: [
      new ObjectId("6360c358d8092ac1b9877a01"),
      new ObjectId("6360c358d8092ac1b9877a02"),
      new ObjectId("6360c358d8092ac1b9877a03")
    ],
    __v: 0
}]
当填充一个 director 时, 代表 mongoose 会将 director 中的值全部替换成实际的值
即 mongoose 会根据刚开始设置的 ref , 去数据库中查找对应的 collection,
然后将 director 的 ObjectId 与 persons 集合进行匹对, 然后将找到的值填充到 b 里面
*/

// 如果填充多个值, 使用字符数组, 此时 director 和 actors 都会被 "填充", 或者理解为 替换掉
const c = await Movie.find({name: '功夫'}).populate(['director', 'actors'])
console.log('✨✨✨debugger: ', c)
```

### 代码案例二

```js
const secondLevelSubjectSchema = Schema({ title: String })
const firstLevelSubjectSchema = Schema({
  title: String,
  children: [Schema.Types.ObjectId]
})
const FirstLevelSubject = model('first_level_subjects', firstLevelSubjectSchema)
const SecondLevelSubject = model('second_level_subjects', secondLevelSubjectSchema)

await FirstLevelSubject.create({
  title: '前端',
  // 没有指定 ref
  children: []
})

const newSubjects = await SecondLevelSubject.create([
  { title: 'html' },
  { title: 'css' },
  { title: 'js' }
])

await FirstLevelSubject.findOneAndUpdate({ title: '前端' }, {
  // 注意 populate 默认是根据 _id 进行匹配查询的
  children: [
    newSubjects[0]._id,
    newSubjects[1]._id,
    newSubjects[2]._id,
  ]
})

const unionData =
  await FirstLevelSubject
    .find({ title: '前端' })
    // 第二个参数设置为空字符串, 等效于 undefined
    // 没有指定 ref 时 ,可以通过第三个参数指定和哪个 model "连接"
    // 第三个参数可以是字符串, 用于指定数据库中的 collection 名, 也可以是一个 Model 对象, 比如 SecondLevelSubject
    .populate('children', '', 'second_level_subjects')

console.log('✨✨✨debugger: ', unionData)
```

### 代码案例三

好像只能通过 `_id` 进行填充
[虚拟状态(Populate Virtuals)](https://mongoosejs.com/docs/populate#populate-virtuals)
弄不了, `localField` 和 `foreignField` 的配置好像无效, 不太懂