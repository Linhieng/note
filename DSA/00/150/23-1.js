/**
 * 求解 KMP，重点是理解前后缀数组
 * 理解前后缀数组，首先要能够自己手动算出这个数组
 * 然后再去理解程序是怎么更快的算出这个数组中的
 *
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    const haystackLen = haystack.length,
        needleLen = needle.length

    if (needleLen === 0) {
        return 0
    }


    // 这里是在求 needle 的真前后缀数组（needle 前有一个虚拟的 # 符号）
    const pi = new Array(needleLen).fill(0)
    for (let i = 1, j = 0; i < needleLen; i++) {
        while (j > 0 && needle[i] !== needle[j]) {
            j = pi[j - 1]
        }
        if (needle[i] === needle[j]) {
            j++
        }
        pi[i] = j
    }

    // 这里是在 haystack 中求取真后缀 needle 所对应的真前缀
    // 只不过我们不需要保存整个数组的值，只需要保存最新的那个 j 值就可以了
    for (let i = 0, j = 0; i < haystackLen; i++) {
        while (j > 0 && haystack[i] !== needle[j]) {
            j = pi[j - 1]
        }

        if (haystack[i] === needle[j]) {
            j++
        }
        if (j === needleLen) {
            return i - needleLen + 1
        }
    }
    return -1
}
