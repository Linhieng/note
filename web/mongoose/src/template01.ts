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

  const d = await Kitten.find({})
  console.log('debugger: ', typeof d)

  // const silence = new Kitten({ name: 'Silence' })
  // silence.speak()
  // silence.pet(10)
  // await silence.save()

  // const fluffy = new Kitten({ name: 'Fluffy' })
  // await fluffy.save()

  // const kittens = await Kitten.find()
  // console.log(kittens)

  // const fluffBegin = await Kitten.find({ name: /^Fluff/ })
  // console.log(fluffBegin)


  db.disconnect()
}