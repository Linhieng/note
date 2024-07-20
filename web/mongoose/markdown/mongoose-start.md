## 🍕 初始化

```
npm install mongoose
tsc --init
npm init @eslint/config
```

配置 `tsconfig.json`, `.eslintignore`, `.eslintrc.js` 文件和 `package.json` 中的 `script`,

## 🍕 基本概念

MongoDB 最基本的概念就是 **db --> collection --> document**, 这其中我们最关心的就是 document 的结构(schema)。

在 mongoose 中, 要了解的最基本的概念就是 **Schema** 和 **model**, Schema 用于表示 document 的结构, model 用来构造 document。

> A model is a class with which we construct documents

## 🍕 基本使用

通过 `mongoose.model(name, schema)` 函数可以创建一个 model, 并且在数据库中创建对应的 collection。

第一个参数 `name` 的 **复数小写** 形式会作为数据库中的 collection 名称 (如果名字中有了 **s**, 则不会继续补上 **s**)。

```js
model('User', new Schema()) // 定义了一个模块, 同时会在 MongoDB 中创建一个名为 users 的 collection
```

第二个参数 `schema` 描述了 document 的结构, 我们可以通过 `new mongoose.Schema()` 创建一个 `schema`

```js
const kittySchema = new mongoose.Schema({ name: String }); // 定义一个猫咪结构
const Kitty = model('Kitty', kittySchema) // 创建一个 Kitty 模块, 用来构造 document
const silence = new Kitten({ name: 'Silence' }) // 创建一个 document 对象
silence.save() // 将新创建的 document 保存到数据库中的 kittys 集合中
```

### 结合 typescript 使用的 🌰:

只定义了属性, 没有方法
```ts
import mongoose, { model, Schema } from 'mongoose'

main().catch(err => console.log(err))

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string
  email: string
  avatar?: string
}
// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: String,
  email: String,
  avatar: { type: String, required: false }, // 这里应该和 IUser 保持一致, 如果不一致, mongoose 也不会报错
})
// 3. Create a Model.
const User = model<IUser>('User', userSchema)

async function main () {
  await mongoose.connect('mongodb://localhost:27017/test')
  // 4. 创建一个 document
  const user = new User({
    name: 'Bill',
    email: 'bill@initech.com',
    avatar: 'https://i.imgur.com/dM7Thhn.png',
  })
  await user.save() // 将 user 存进数据库, collection 名为 users, document 的结构(存储的值)就是 IUser
}
```

定义了属性和方法

```ts
import mongoose, { model, Model, Schema } from 'mongoose'

main().catch(err => console.log(err))

// 定义 document 的结构, 注意函数不要定义在这里
interface IKitten {
  name: string
  likes?: number
}
// 想要为一个 model 添加方法, 应该重新声明一个 interface
interface IKittenMethods {
  speak: () => void
  pet: (likesLevel: number) => void
}
// 想要使用方法, 需要声明一个 Model 类型, 他包含了 document 的结构和 model 的方法
type KittenModel = Model<IKitten, Record<string, unknown>, IKittenMethods>
// 第一个泛型是 document 的结构, 第二个参数是 model 的类型, 第三个参数是 model 的方法
const kittySchema = new Schema<IKitten, KittenModel, IKittenMethods>({
  name: { type: String, required: true },
  likes: { type: String, required: false },
})

// 为 model 添加方法
kittySchema.method('speak', function () {
  const greeting = this.name
    ? 'Meow name is ' + this.name
    : 'I don\'t have a name'
  console.log(greeting)
})
kittySchema.method('pet', function (likesLevel: number) {
  if (this.likes) {
    this.likes += likesLevel
  } else {
    this.likes = likesLevel
  }
})

// 定义模块时, 第一个泛型是 document 的结构, 第二个泛型是 model 的类型
const Kitten = model<IKitten, KittenModel>('Kitten', kittySchema)

async function main () {
  const db = await mongoose.connect('mongodb://localhost:27017/test')

  const silence = new Kitten({ name: 'Silence' })
  silence.speak()
  silence.pet(10)
  await silence.save()

  db.disconnect()
}
```