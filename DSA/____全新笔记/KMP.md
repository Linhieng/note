# KMP 算法

KMP 算法的几个要点：
- 主串上的指针 i 永远不会回溯，这是 KMP 的优势所在
- 子串/模版串上的指针 j 不一定需要回到开头，这是 next 数组的功劳

## next 数组

### 字符串的前后缀

先了解一个字符串的**真前后缀**的概念（类比真子集）

- 字符串 abcdef
  - 真前缀有：
    - a
    - ab
    - abc
    - abcd
    - abcde
    - 真前缀不能等于字符串本身
  - 真后缀有：
    - f
    - ef
    - def
    - cdef
    - bcdef
    - 真后缀不能等于字符串本身

真前后缀，也简称为前后缀。

- 计算字符串 aabaab 的最大相同前后缀长度
    - 前后缀长度为 1 时, 前缀 a, 后缀 b, 不相同❌
    - 前后缀长度为 2 时, 前缀 aa, 后缀 ab, 不相同❌
    - 前后缀长度为 3 时, 前缀 aab, 后缀 aab, 相同✅
    - 前后缀长度为 4 时, 前缀 aaba, 后缀 baab, 不相同❌
    - 前后缀长度为 5 时, 前缀 aabaa, 后缀 abaab, 不相同❌
    - 故 aabaab 的最大相同前后缀长度为 3

### 手写 next 数组

一个字符串的 next 数组，其中的 next[x] 存储的就是子串 `0..=x` 的最大相同前后缀长度。

字符串的 next 数组，也称为字符串的**前缀表**，不过我们这里还是称为 next 数组。

比如 aabaab 的 next 数组：
- next[0] 求的是子串 `a` 的最大相同前后缀长度
  - 子串 `a` 没有前后缀，所以它的前后缀长度为 **0**
- next[1] 求的是子串 `aa` 的最大相同前后缀长度
  - 前后缀长度为 1 时，前缀 a，后缀 a，相同✅
  - 故 `aa` 的最大相同前后缀长度是 **1**
- next[2] 求的是子串 `aab` 的最大相同前后缀长度
  - 前后缀长度为 1 时，前缀 a，后缀 b，不相同❌
  - 前后缀长度为 2 时，前缀 aa，后缀 ab，不相同❌
  - 故 `aab` 的最大相同前后缀长度是 **0**
- next[3] 求的是子串 `aaba` 的最大相同前后缀长度
  - 前后缀长度为 1 时，前缀 a，后缀 a，相同✅
  - 前后缀长度为 2 时，前缀 aa，后缀 ba，不相同❌
  - 前后缀长度为 3 时，前缀 aab，后缀 aba，不相同❌
  - 故 `aaba` 的最大相同前后缀长度是 **1**
- next[4] 求的是子串 `aabaa` 的最大相同前后缀长度
  - 前后缀长度为 1 时，前缀 a，后缀 a，相同✅
  - 前后缀长度为 2 时，前缀 aa，后缀 aa，相同✅
  - 前后缀长度为 3 时，前缀 aab，后缀 baa，不相同❌
  - 前后缀长度为 4 时，前缀 aaba，后缀 abaa，不相同❌
  - 故 `aabaa` 的最大相同前后缀长度是 **2**
- next[5] 求的是子串 `aabaab` 的最大相同前后缀长度
  - 前后缀长度为 1 时，前缀 a，后缀 b，不相同❌
  - 前后缀长度为 2 时，前缀 aa，后缀 ab，不相同❌
  - 前后缀长度为 3 时，前缀 aab，后缀 aab，相同✅
  - 前后缀长度为 4 时，前缀 aaba，后缀 baab，不相同❌
  - 前后缀长度为 5 时，前缀 aabaa，后缀 abaab，不相同❌
  - 故 `aabaab` 的最大相同前后缀长度是 **3**

综上，字符串 `aabaab` 的 next 数组是 `[0, 1, 0, 1, 2, 3]`



再比如 aabaaf 的 next 数组：
- next[0] 求的是子串 `a` 的最大相同前后缀长度
  - 子串 `a` 没有前后缀，所以它的前后缀长度为 **0**
- next[1] 求的是子串 `aa` 的最大相同前后缀长度
  - 前后缀长度为 1 时，前缀 a，后缀 a，相同✅
  - 故 `aa` 的最大相同前后缀长度是 **1**
- next[2] 求的是子串 `aab` 的最大相同前后缀长度
  - 前后缀长度为 1 时，前缀 a，后缀 b，不相同❌
  - 前后缀长度为 2 时，前缀 aa，后缀 ab，不相同❌
  - 故 `aab` 的最大相同前后缀长度是 **0**
- next[3] 求的是子串 `aaba` 的最大相同前后缀长度
  - 前后缀长度为 1 时，前缀 a，后缀 a，相同✅
  - 前后缀长度为 2 时，前缀 aa，后缀 ba，不相同❌
  - 前后缀长度为 3 时，前缀 aab，后缀 aba，不相同❌
  - 故 `aaba` 的最大相同前后缀长度是 **1**
- next[4] 求的是子串 `aabaa` 的最大相同前后缀长度
  - 前后缀长度为 1 时，前缀 a，后缀 a，相同✅
  - 前后缀长度为 2 时，前缀 aa，后缀 aa，相同✅
  - 前后缀长度为 3 时，前缀 aab，后缀 baa，不相同❌
  - 前后缀长度为 4 时，前缀 aaba，后缀 abaa，不相同❌
  - 故 `aabaa` 的最大相同前后缀长度是 **2**
- next[5] 求的是子串 `aabaaf` 的最大相同前后缀长度
  - 前后缀长度为 1 时，前缀 a，后缀 f，不相同❌
  - 前后缀长度为 2 时，前缀 aa，后缀 af，不相同❌
  - 前后缀长度为 3 时，前缀 aab，后缀 aaf，不相同❌
  - 前后缀长度为 4 时，前缀 aaba，后缀 baaf，不相同❌
  - 前后缀长度为 5 时，前缀 aabaa，后缀 abaaf，不相同❌
  - 故 `aabaaf` 的最大相同前后缀长度是 **0**

综上，字符串 `aabaab` 的 next 数组是 `[0, 1, 0, 1, 2, 0]`

### next 数组的使用

以主串 `ABABABC`、子串/模版串 `ABABC` 为例

首先，我们计算出子串 `ABABC` 的 next 数组为 `[0, 0, 1, 2, 0]`

```txt
          i=4
          ↓
  A B A B A B C
  A B A B C
          ↑
          j=4
① 此时发现 A 和 C 不匹配，按照暴力算法，我们会同时让
i 进行回溯，然后重置 j 为 0。但是 KMP 中我们永远不会回溯 i，
而对于 j 也不一定会重置为 0。j 的具体取值是根据 next 数组来的。
在这里，我们会更新 j = next[j-1]，所以 j = next[3] = 2

          i=4
          ↓
  A B A B A B C
      A B A B C
          ↑
          j=2
上面这图，就是更新后的情况，然后我们继续匹配，可以发现匹配成功了！
```

通过上面过程，可以看到，我们更新 j 时，需要计算的是 `next[j-1]`。
由于一直要 `j-1`，看着不方便，所以我们可以将 next 数组整体右移一位。
这个时候，我们就可以直接通过 `next[j]` 得到更新后的值了！

由于整体右移了一位，导致最左侧空出一个位置，这个位置的值是无所谓的，
常见的做法是将其设置为 `-1`。

所以，现在我们的 next 数组就是 `[-1, 0, 0, 1, 2]`

> [!TIP]
> 需要注意的是，虽然我们改变了 next 数组的值，但它的原理是不变的！

### next 数组的代码实现

前面已经说了，我们的 next 数组原理就那一个，但具体的实现有多种。
- 第一种：直接手算。比如子串 `ABABC` 的 next 数组为 `[0, 0, 1, 2, 0]`
- 第二种：统一右移一位，然后左边补 -1。此时 next 数组为 `[-1, 0, 0, 1, 2]`。
- 第三种：统一减 1，此时 next 数组为 `[-1, -1, 0, 1, -1]`。

第一种计算方式中，我们更新 j 是通过 `j = next[j-1]` 更新的，而第二种计算方式
中，我们是直接通过 `j=next[j]` 更新的。

我更推荐的是第二种计算方式。

#### 第二种 next 数组代码实现

```js
const getNext2 = (pattern) => {
    // k 表示，在模版串 t 中，存在 k 个字符组成的前缀 t0..tk-1
    // 与后缀 tj-k...tj-1 相同
    let k = -1
    let j = 0
    const next = [-1]
    while (j < pattern.length) {
        // 当 k 等于 -1 时，表示 t0...=tj 不存在相同前后缀
        if (k === -1 || pattern[k] === pattern[j]) {
            k++
            j++
            // 我们是统一右移了一位，所以这里是在 j++ 后再赋值
            // 换句话说，我们这里求的 next[j] 的值，其实是
            // t0...!tj 字符串（不包含 tj）的最长相同前后缀长度
            next[j] = k
        } else {
            // 加快处理。这里有动态规划的思想
            k = next[k]
        }
    }
    return next
}
```

#### 第一种 next 代码实现

```js
const getNext1 = (pattern) => {
    let k = 0
    const next = [0]

    // next[0] 的已经指定了，所以这里直接从 1 开始
    for (let j = 1; j < pattern.length; j++) {
        // 1. 前后缀不相同，则不断向前回退
        while (k > 0 && pattern[k] !== pattern[j]) {
            k = next[k - 1]
        }
        if (pattern[k] === pattern[j]) {
            // 2. 直到找到相同的前后缀
            k++
        }
        // 3. 或者 k 变为 0，表示没有相同前后缀

        // 4. 最终，将计算处理的最长前后缀长度 k 赋值给 next[j]
        next[j] = k;
    }
    return next
}
```

个人不太喜欢上面的代码，我觉得写成下面这样比较好：
```js
const getNext1 = (pattern) => {
    let k = 0
    // 第一个字符根本没有前后缀，所以直接赋值为 0
    const next = [0]
    let j = 1
    while (j < pattern.length) {
        if (pattern[k] === pattern[j]) {
            // 相同，则可以直接在前人的基础上 + 1
            next[j] = k + 1
            k++
            j++
        } else if (k > 0) {
            // 这里是 k - 1 哦。计算算一下 bba 的 next 就知道了
            k = next[k - 1]
        } else {
            // k = 0，表示没有相同前后缀
            next[j] = 0
            j++
        }
    }
    // 如果你在这里往头插入一个任意元素，那么 next 数组就变成了
    // 第二种 next 数组了。
    return next
}
```

#### 第三种 next 代码实现

第三种代码实现其实和第一种是差不多的

```js
const getNext3 = (pattern) => {
    // 这里变为 -1
    let j = -1
    const next = [j]

    for (let i = 1; i < pattern.length; i++) {
        // 这里的判断需要变成 >= 0。同时下标要变为 j+1
        while (j >= 0 && pattern[i] !== pattern[j + 1]) {
            // 这里下标变为 j
            j = next[j]
        }

        // 同样的，下标变为 j+1
        if (pattern[i] === pattern[j + 1]) {
            j++
        }

        next[i] = j;
    }
    return next
}
```

### next 数组存在的问题

计算模版串 `aaaab` 的 next 数组为：`[0, 1, 2, 3, 0]`

在字符串 `aaabaaaab` 中匹配 `aaaab` 的过程如下：

```txt
       i=3
       ↓
 a a a b a a a a b
 a a a a b
       ↑
       j=3
1️⃣ 此时匹配到不相等，于是我们会将 j 变为 next[j-1]
所以，j = next[2] = 2

       i=3
       ↓
 a a a b a a a a b
   a a a a b
       ↑
       j=2
2️⃣ 又匹配到不相等，于是再次 j = next[1] = 1

       i=3
       ↓
 a a a b a a a a b
     a a a a b
       ↑
       j=1
3️⃣ 又不相同，于是再次 j = next[0] = 0

       i=3
       ↓
 a a a b a a a a b
       a a a a b
       ↑
       j=0
4️⃣ 还是不相同，由于此时 j 是 0，所以移动 i

         i=4
         ↓
 a a a b a a a a b
         a a a a b
         ↑
         j=0
```

注意看上面过程中的 2️⃣、3️⃣、4️⃣ 这三次比较，你觉不觉得这三次比较其实是无用功？因为我们在 1️⃣ 过程中已经知道了模版串中的 a 是匹配不成功的了，那么 a 前面的三个 a 其实是完全可以跳过的！

所以，我们如何让程序能够自动跳过 2️⃣、3️⃣、4️⃣ 这三次比较呢？答案就是优化我们的 next 数组，我们将优化后的 next 数组称为 nextVal 数组。

### next 数组优化后的 nextVal 数组

按照前面的计算方式，在得到 next[j] = k 时，如果发现模版串 t 中的 $t_j$ 和 $t_k$ 两个字符相同，则意味着当目标串 s 中的字符 $s_i$ 和模版串中的字符 $t_j$ 不相同时，$s_i$ 和 $t_k$ 肯定也不相同。所以不需要再比较 $s_i$ 和 $t_k$ 是否相同，而是直接比较 $s_i$ 和 $t_{next[k]}$。
为此，我们优化后的数组计算方式为 `nextVal[j] = next[k]`，
而不是 `next[j] = k`。

```txt
        i=3
        ↓
  A B A C A B C
  A B A B C
        ↑
        j=3
按照 next 数组的计算方式，next = [-1, 0, 0, 1, 2]
下一步我们将 j 变为 k，而 k = next[3] = 1，所以 j = 1
        i=3
        ↓
  A B A C A B C
      A B A B C
        ↑
        j=1
但由于我们 j 所在字符为 B，k 所在字符也为 B
所以我们完全不需要再次将 i 与 k 所在字符进行比较。
而是可以直接将 i 与 next[k] = next[1] = 0 进行比较
```


> [!TIP]
> 明白了这个优化过程的原理后，你可能会觉得，我们不一定要修改 next 数组，
> 我们完全可以在 KMP 的过程中完成这一步操作。
> 没错，确实可以，但我们的 next 数组是可以复用的！
> 如果你要用同一个模版串在多个目标串中匹配，那
> 将信息存储在 nextVal 数组中，效率肯定更高！

### nextVal 数组的代码实现

这里暂时只给出第二种 next 数组优化后的 nextVal 求法。

```js
const getNextVal2 = (pattern) => {
  let k = -1, j = 0
    const nextVal = [-1]
    while (j < pattern.length) {
        if (k === -1 || pattern[k] === pattern[j]) {
            k++
            j++

            if (pattern[k] === pattern[j]) {
                // 2. 但实际上，当 tk 和 tj 相同时
                // 没有必要再让 si 和 tk 比较
                // 所以可以直接赋值为 next[k]
                nextVal[j] = nextVal[k]
            } else {
                // 1. 原本的 next 数组是直接将其赋值为 k
                nextVal[j] = k
            }

        } else {
            k = nextVal[k]
        }
    }
    return nextVal
}
```

## KMP 完整代码

KMP 算法的核心在于 next 数组的求取，至于 KMP 算法本身，思路是很简单的。
就是保持 i 不回溯，只让 j 回退。而且 j 也不一定会回退到 0，具体回退到哪里
取决于 next 数组。

> 有一说一，我实在不知道为什么会有人喜欢第三种 next 数组…… 对我来说，
> 第二种 next 就是最好理解的！第一种 next 数组是最容易手算的！

::: code-group
```js [基于第二种 next 数组实现的 nextVal 数组]
function KMP22(str, pattern) {
    const getNextVal2 = (pattern) => {
        let k = -1, j = 0
        const nextVal = [-1]
        while (j < pattern.length) {
            if (k === -1 || pattern[k] === pattern[j]) {
                k++
                j++

                if (pattern[k] === pattern[j]) {
                    // 2. 但实际上，当 tk 和 tj 相同时
                    // 没有必要再让 si 和 tk 比较
                    nextVal[j] = nextVal[k]
                } else {
                    // 1. 原本的 next 数组，就是直接将其赋值为 k
                    nextVal[j] = k
                }
            } else {
                k = nextVal[k]
            }
        }
        return nextVal
    }

    let i = 0
    let j = 0
    const nextVal = getNextVal2(pattern)
    while (i < str.length && j < pattern.length) {
        // 当 j 等于 -1 时，表示当前 pattern 中已经没有字符
        // 与 si 比较了，所以应该让 i 前进一位，同时 j 变为 0
        if (j === -1 || str[i] === pattern[j]) {
            i++
            j++
        } else {
            j = nextVal[j]
        }
    }

    if (j === pattern.length) {
        return i - j
    }

    return -1
}
```
```js [第二种 next 数组]
function KMP2(str, pattern) {
    const getNext2 = (pattern) => {
        let k = -1
        let j = 0
        const next = [-1]
        while (j < pattern.length) {
            if (k === -1 || pattern[k] == pattern[j]) {
                k++
                j++
                // 是在加完后再赋值的，所以右移了一位！
                next[j] = k
            } else {
                k = next[k]
            }
        }
        return next
    }

    let i = 0
    let j = 0
    const next = getNext2(pattern)
    while (i < str.length && j < pattern.length) {
        if (str[i] === pattern[j]) {
            i++
            j++
        } else if (j > 0) {
            j = next[j]
        } else {
            i++
        }
    }

    if (j === pattern.length) {
        return i - j
    }

    return -1
}
```
```js [第一种 next 数组]
function KMP1(str, pattern) {
    const getNext1 = (pattern) => {
        let k = 0
        let j = 1
        const next = [0]
        while (j < pattern.length) {
            if (pattern[k] === pattern[j]) {
                next[j] = k + 1
                k++
                j++
            } else if (k > 0) {
                // 这里是 k - 1 哦。计算算一下 bba 的 next 就知道了
                k = next[k - 1]
            } else {
                next[j] = 0
                j++
            }
        }
        return next
    }

    let i = 0
    let j = 0
    const next = getNext1(pattern)
    while (i < str.length && j < pattern.length) {
        if (str[i] === pattern[j]) {
            i++
            j++
        } else if (j > 0) {
            // 这里变成了 j - 1
            j = next[j - 1]
        } else {
            i++
        }
    }

    if (j === pattern.length) {
        return i - j
    }

    return -1
}
```
```js [第三种 next 数组]
function KMP3(str, pattern) {
    if (pattern.length === 0) return 0

    const getNext3 = (pattern) => {
        // 这里换成 -1
        let k = -1
        let j = 1
        const next = [-1]
        while (j < pattern.length) {
            // 这里是 k+1
            if (pattern[k + 1] === pattern[j]) {
                next[j] = k + 1
                k++
                j++
            } else if (k >= 0) { // 这里有等号
                // 这里不需要 -1
                k = next[k]
            } else {
                // 找不到时，默认为 -1
                next[j] = -1
                j++
            }
        }
        return next
    }

    let j = -1
    let i = -1
    const next = getNext3(pattern)
    while (i < str.length) {
        i++
        while (j >= 0 && str[i] !== pattern[j + 1]) {
            j = next[j]
        }
        if (str[i] === pattern[j + 1]) {
            j++
        }
        if (j === pattern.length - 1) {
            return i - j
        }
    }
    return -1
}
```
:::

对数器代码如下：

<<< ../code/other/KMP.js
