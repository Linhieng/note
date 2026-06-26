## 🍕 在 ts 中的声明 mongoose 特有类型

### `ObjectId`

`Schema.Types.ObjectId` 和 `Types.ObjectId` 是不一样的，
前者是继承 `SchemaType`, 可用在 `new Schema()` 中;
后者是用来创建 `ObjectId` 对象的, 可用在 `interface` 中。

```ts
import { Schema, Types } from 'mongoose';
// 1. Create an interface representing a document in MongoDB.
interface IUser {
  // Use `Types.ObjectId` in document interface...
  organization: Types.ObjectId;
}
// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  // And `Schema.Types.ObjectId` in the schema definition.
  organization: { type: Schema.Types.ObjectId, ref: 'Organization' }
});
```

### `Array`

ts 中使用数组, 建议使用 `Types.Array` 或 `Types.DocumentArray`

```ts
import { Schema, Model, Types } from 'mongoose';

interface BlogPost {
  _id: Types.ObjectId;
  title: string;
}

interface User {
  tags: Types.Array<string>;
  blogPosts: Types.DocumentArray<BlogPost>;
}

const schema = new Schema<User, Model<User>>({
  tags: [String],
  blogPosts: [{ title: String }],
});
```

## 🍕 Schema

Until mongoose V6.3.1: 在 V6.3.1 版本之前, 需要这样:

```ts
import { Schema } from 'mongoose';

// Document interface
interface User {
  name: string;
  email: string;
  avatar?: string;
}

// Schema
const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String
});
```

新版本可以省略 `interface` 的定义。同时, 可以通过 `InferSchemaType` 获取其类型:

```ts
import { Schema, InferSchemaType } from 'mongoose';

// Document interface
// No need to define TS interface any more.
// interface User {
//   name: string;
//   email: string;
//   avatar?: string;
// }

// Schema
const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String
});

type User = InferSchemaType<typeof schema>;
// InferSchemaType will determine the type as follows:
// type User = {
//   name: string;
//   email: string;
//   avatar?: string;
// }
```

> By default, Mongoose does not check if your document interface lines up with your schema.
> [来自官网](https://mongoosejs.com/docs/typescript/schemas.html#:~:text=By%20default,%20Mongoose%20does%20not%20check%20if%20your%20document%20interface%20lines%20up%20with%20your%20schema.)
>
> 也就是说, mongoose 不支持在编辑过程中, 提示类型报错.
> 比如上面代码中, email 是必须的, 但在你编辑过程中, ts 并不会提示你缺少了该属性. 只有在编译后运行 js 文件时, 才会报 `ValidatorError` 错误
> [这里](#解决mongoose不会编辑时检查document类型) 尝试给出解决方案

### 解决mongoose不会编辑时检查document类型

```ts
interface IUser {
  name: string
}
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
})
const User = model('users', UserSchema)
const user: HydratedDocument<IUser> = new User({
  id: 123,
})
user.save()
```
上面这段代码, `new User({})` 时, mongoose 无法对参数进行校验, 那么我们可以自己为它进行校验。
也就是我们将其分开来, 先创建一个校验好的对象, 然后再赋值进去:

```ts
interface IUser {
  name: string
}
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
})
const User = model('users', UserSchema)
const userData: IUser = {
  id: 123, // 报错了
}
const user: HydratedDocument<IUser> = new User(userData)
user.save()
```