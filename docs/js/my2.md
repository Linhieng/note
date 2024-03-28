# 新整理

## await 对普通函数没有影响，但它依旧会让后面的代码延迟一轮

```js
setTimeout(() => {
    console.log(5)
});
async function a() {
    console.log(1)
    await b()
    console.log(4)
}
function b() {
    console.log(2)
}
a()
console.log(3)

```
