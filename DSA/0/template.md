# 模版

## 二分

- 有单调性的，一定可以用二分，但二分的本质不是单调性。
- 二分的本质是能够一分为二，能够将答案始终套在我们所给的区间上，然后慢慢收缩区间直至区间为 1，此时就是值就是二分的结果
- 二分一定是有解的，这个解指的是二分的解，不是答案的解！比如二分查找。

### 二分模版

二分的模版，是帮助你处理边界条件的，这样你在写二分的时候就不会又一个不小心就死循环，或者越界了。
而二分的核心思想，是得慢慢做题找感觉的，总的来说，核心就是 check 函数！

两个模版，通用部分是：

- left 和 right 指的都是下标，也就是闭区间
- 循环判断条件是 left < right，没有等号，这样的好处是，当出循环时，保证 left 和 right 是相同的，不需要思考选择 left 还是 right
- 循环内的条件始终只有两个（除非相等是可以直接返回），都是用一个 check 函数，这个的目的是将结果区间一分为二，我们需要确保答始终在我们的 [left, right] 区间内
- 当 check 满足时，需要移动一个指针到 mid 上。原因在于 mid 本身可能是我们所需要的答案。所以直接相关就可以，不需要考虑 mid + 1 还是 mid - 1。


第一个模版：
- 满足 check 条件时让 left 移动到 mid 上
- 那么此时 else 的条件很明显就是 right = mid - 1。因为条件不满足，所以肯定不需要等于 mid，然后是向左移动，所以是 - 1
- 注意此时的中点是 left + right + 1 >> 2。

第二个模版：
- 满足 check 条件时让 right 移动到 mid 上
- 那么此时 else 的条件很明显就是 left = mid + 1。因为条件不满足，所以肯定不需要等于 mid，然后是向右移动，所以是 + 1
- 此时的中点就是普通的 left + right >> 2


说明一下为什么当 left = mid 的时候，需要让中点 + 1。
原有是这样的：通过 left + right >> 2 所计算处理的数值 mid 可能是等于 left 的。比如当 left 和 right 之间只相差 1 时。
由于此时 mid 已经等于 left 了，而我们的赋值又是 left = mid，那么这就会进入死循环。
所以我们需要在计算中点 mid 时 +1，此时 mid 就不会等于 left，而是会等于 right 了！

同理，为什么当 right = mid 的时候不需要加 1，原因就是不加 1 的时候，计算出来的 mid 值才不会等于 right。

关于二分，最难的地方就是边界的处理，不同处理方式，你可以整理出不同的模版。而上面两个模版我也觉得非常合适。所以就选定这两个模版了。

为什么我觉得这两个模版合适呢？是因为他有这些优点：
- 循环判断时，不需要等号，那么出循环时，就不需要考虑 left 和 right 的选取问题，因为它们是相同的！
- 模版中的条件语句，当满足 check 的时候，都是直接将 left/right 赋值为 mid，不需要考虑 + 1 还是减 1 问题
- 而当确定了是 left=mid 还是 right=mid 后，另外一个 else 语句也很容易确定！
- 对于为什么要加 1 这个理由，我觉得非常容易记忆。

总的来说，这个模版容易记忆，而且理解起来也很方便。

::: code-group

```js [模版1]
let leftIndex = 0
let rightIndex = len - 1
while (leftIndex < rightIndex) {
  let mid = leftIndex + rightIndex + 1 >> 1
  if (check(mid)) leftIndex = mid
  else rightIndex = mid - 1
}
// 最后需要注意，当 leftIndex 和 rightIndex 相等时，不会进入循环
// 所以你可能需要在这里进行进一步的判断！
```

```js [模版2]
let leftIndex = 0
let rightIndex = len - 1
while (leftIndex < rightIndex) {
  let mid = leftIndex + rightIndex >> 1
  if (check(mid)) rightIndex = mid
  else leftIndex = mid + 1
}
// 这里也同理，你可能需要在这里进行进一步的判断！
```
:::
