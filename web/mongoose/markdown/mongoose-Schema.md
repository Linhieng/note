## 🍕 `Schema(SchemaType, options)`

###  `SchemaType`

`SchemaType` 有下面几种:

- `String`
- `Number`
- `Date`
- `Buffer`
- `Boolean`
- `Mixed`
- `ObjectId`
- `Array`
- `Decimal128`
- `Map`
- `Schema`

使用示例:

```js
const schema1 = new Schema({
  name: String,
})
const schema2 = new Schema({
  name: {type: String},
})
```

### 为 `SchemaType` 添加配置

[官网介绍的可选的配置](https://mongoosejs.com/docs/schematypes.html#schematype-options):

- `required`
- `default`
- `select`
- `validate`
- `get`
- `set`
- `alias`
- `immutable`
- `transform`

当然, 也可以配置 MongoDB 的配置, 比如:

Index
- `index`
- `unique`
- `sparse`

String
- `lowercase`
- `uppercase`
- `trim`
- `match`
- `enum`
- `minLength`
- `maxLength`
- `populate`

Number
- `min`
- `max`
- `enum`
- `populate`

Date
- `min`
- `max`
- `expires`

ObjectId
- `populate`