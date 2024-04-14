/**
 * @file 三种 next 求法
 */

check()
console.log('✅')

/**
 * 手算的 next 数组
 */
function getNext1(pattern) {
    let j = 0
    const next = [j]

    // next[0] 的已经指定了，所以这里直接从 1 开始
    for (let i = 1; i < pattern.length; i++) {
        // 1. 前后缀不相同，则不断向前回退
        while (j > 0 && pattern[i] !== pattern[j]) {
            j = next[j - 1]
        }
        if (pattern[i] === pattern[j]) {
            // 2. 直到找到相同的前后缀
            j++
        }
        // 3. 或者 j 变为 0，表示没有相同前后缀

        // 4. 最终，将计算处理的最长前后缀长度 j 赋值给 next[i]
        next[i] = j;
    }
    return next
}

/**
 * 手算 next 数组统一右移一位，然后最左边补 -1
 */
function getNext2(pattern) {
    // k 表示，在模版串 t 中，存在 k 个字符组成的前缀 t0..tk-1 依次与真后缀 tj-k...tj-1 相同
    let k = -1, j = 0
    const next = [-1]
    while (j < pattern.length) {
        if (k === -1 || pattern[k] === pattern[j]) {
            k++
            j++
            next[j] = k
        } else {
            k = next[k]
        }
    }
    return next
}

/**
 * 手算 next 统一减一
 */
function getNext3(pattern) {
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

/**
 * 对数器，校验三种 next 数组的求法是否与我们所定义的一致
 */
function check(checkTimes = 100) {
    const getRandomString = () => {
        const length = Math.max(
            1,
            ~~(Math.random() * 26)
        )

        const str = Array.from({ length }, () => {
            return String.fromCharCode(
                0x41 + ~~(Math.random() * 6)
            )
        }).join('')

        return str
    }
    for (let i = 0; i < checkTimes; i++) {
        const pattern = getRandomString()
        const len = pattern.length
        const next1 = getNext1(pattern)
        const next2 = getNext2(pattern)
        const next3 = getNext3(pattern)
        for (const [i, n] of next1.entries()) {
            if (n - 1 !== next3[i]) {
                throw new Error(pattern)
            }
        }
        if (next1.slice(0, len - 1).join(',') !== next2.slice(0, len).slice(1).join(',')) {
            throw new Error(pattern)
        }
    }
}
