import { connect, HydratedDocument, Model, model, Schema } from 'mongoose'

await connect('mongodb://localhost:27017/test')

interface IUser {
  name: string
}
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
})
const User = model('users', UserSchema)
const userData: IUser = {
  // id: 123, // 报错了
  name: 'okle',
}
const user: HydratedDocument<IUser> = new User(userData)
user.save()