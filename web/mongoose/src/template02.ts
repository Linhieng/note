import { connect, Document, Types, HydratedDocument, InferSchemaType, Model, model, Schema } from 'mongoose'
await connect('mongodb://localhost:27017/test')

// Schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
})

const User = model('users', UserSchema)
const userData: {
  name: string
  email: string
  avatar?: string | undefined
} = {
  name: 'name',
}
const user: HydratedDocument<InferSchemaType<typeof UserSchema>> = new User(userData)
user.save()