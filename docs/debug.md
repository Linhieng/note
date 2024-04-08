# 遇到的问题

时间线通常是从新到旧。

## 爬虫时的并发控制

爬虫时，常常需要一次性获取数百个页面，甚至更多，这个时候肯定是不能一次性全部获取的，所以需要控制并发连接。

基本的需求这这样的：

- 可以指定最大并发连接数
- 当请求失败时，可以自动重试

经过一番查找，发现网上有一些开源的库可以作为参考，比如 [p-limit]。但它满足不了我的需求，最终找到了一篇[有关连接池的文章]，写的很不错，而且也解决了我的需求。

```js
// 参考自 https://juejin.cn/post/7310009007921791003
class Pool {
    #resources
    // releaseResolvers 是一个Promise的resolvers对象，包含promise和resolve方法
    #releaseResolvers


    constructor(resources) {
        this.#resources = resources
    }

    async acquire() {
        // 获取资源
        if (this.#resources.length > 0) {
            return this.#resources.pop()
        } else {
            if (!this.#releaseResolvers) {
                this.#releaseResolvers = {}

                this.#releaseResolvers.promise = new Promise((resolve) => {
                    this.#releaseResolvers.resolve = resolve
                })
            }
            // 等待资源释放
            await this.#releaseResolvers.promise
            // 重新获取资源
            return this.acquire()
        }
    }

    release(resource) {
        this.#resources.push(resource)
        if (this.#releaseResolvers) {
            // 通知等待的任务
            this.#releaseResolvers.resolve(resource)
            this.#releaseResolvers = undefined
        }
    }
}

export default function limit(concurrency, retryNum = 3) {
    const pool = new Pool(new Array(concurrency).fill())
    return {
        call: async (request) => {
            const resource = await pool.acquire()
            let result
            for (let i = 0; i < retryNum; i++) {
                try {
                    result = await request()
                    break
                } catch (e) {
                    console.log(`retry ${i + 1} times. ${e.message}`)
                }
            }
            pool.release(resource)
            return result
        }
    }
}
```

## vue 的 v-for 指令中的 key 问题

- 在使用 vue 的 v-for 指令动态渲染一系列元素时，我为新添加的元素提供了一个动画效果，这样可以方便用户知道这个元素是新增的。但在测试过程中发现新增的元素，并不是我所期待的元素。通过 devtool 可以看到，当我往数组中间添加一个元素时，vue 是直接在最后创建一个新的 DOM 结点。经过排查发现是我的 key 设置为了数组下标。下面是一个简单的案例来说明这种情况：

```js
// 原数组
arr = [
  {id: 'a', index: 1},
  {id: 'b', index: 2},
  {id: 'c', index: 3},
]
// 当我往中间插入一个元素后，数组变成了：
arr = [
  {id: 'a', index: 1},
  {id: 'x', index: 2},
  {id: 'b', index: 3},
  {id: 'c', index: 4},
]
// 由于使用 index 作为 v-for 的 key，
// 所以对于 vue 来说，效果是 第二个和第三个的值变更了，同时新增了一个 index 为 4 的元素！
```

具体可以参考 [vue 的 diff 算法](https://vue3js.cn/interview/vue/diff.html)。里面提供了很多图片说明，更加清晰易懂。

## 一次 canvas 绘制颜色时的性能优化

过去的内容笔试暂时没找到

## 服务器的端口无法访问

- 服务器的端口无法访问。当初查看了安全组，也查看了服务器的防火墙，甚至关闭了防火墙，但最终还是没有效果。无奈之下像阿里云提了一个工单，但和技术人员交流时，就发现原因所在了。原来是我一直配置的安全组，并不是我服务器所属的那个安全组。我的服务器是在深圳，但我配置的安全组却是在北京！

[p-limit]: https://github.com/sindresorhus/p-limit
[有关连接池的文章]: https://juejin.cn/post/7310009007921791003
