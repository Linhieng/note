普通的验证是基于 `SchemaType` 的, 比如

```js
const s = new Schema({name: String})
```

上面创建的 `s` 就是要求 `name` 必须是一个字符串, 但不做 `required` 限制, 所以可以 `name` 也可以为空

需要注意, `SchemaType` 中的 `unique: true` 选项, 并不是验证器,
也就是说 mongoose 不会对每一个属性进行唯一性检查。
[详细请见官网](https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator)