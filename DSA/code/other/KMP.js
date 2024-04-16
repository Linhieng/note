check(bruteForce)
check(KMP1)
check(KMP2)
check(KMP2_1)
check(KMP2_2)
check(KMP22)
check(KMP3)
console.log('✅');

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
function KMP2(str, pattern) {
    const getNext2 = pattern => {
        // 这里的实现，next[0] 不能任意
        // 因为后面的 kmp 中会访问到 next[0]
        // 这里专门弄个 -1，其实就是简化了代码量
        const next = [-1]
        let k = -1
        let j = 0
        while (j < pattern.length) {
            if (k === -1 || pattern[k] === pattern[j]) {
                j++
                k++
                next[j] = k
            } else {
                k = next[k]
            }
        }
        return next
    }

    const next = getNext2(pattern)

    let i = 0
    let j = 0
    while (i < str.length && j < pattern.length) {
        if (j === -1 || str[i] === pattern[j]) {
            i++
            j++
        } else {
            j = next[j]
        }
    }

    if (j === pattern.length) {
        return i - j
    }
    return -1
}
/** 第二种 next 数组的第二种实现 */
function KMP2_1(str, pattern) {
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
/** 第二种 next 数组的第三种实现 */
function KMP2_2(str, pattern) {
    const getNext2 = pattern => {
        const next = [0]
        let k = 0
        let j = 1
        while (j < pattern.length) {
            if (pattern[k] === pattern[j]) {
                next[j] = k + 1
                j++
                k++
            } else if (k > 0) {
                k = next[k - 1]
            } else {
                next[j] = 0
                j++
            }
        }
        // 其实可以简单的往头添加一个元素，就变成第二个 next 了
        // 而且这个元素是无所谓的，因为我们的 KMP 中永远不会调用
        // 到 next[0] 的值。
        next.unshift(null)
        return next
    }
    const next = getNext2(pattern)

    let i = 0
    let j = 0
    while (i < str.length && j < pattern.length) {
        if (str[i] === pattern[j]) {
            i++
            j++
        } else if (j > 0) {
            // 换成第二个 next 后，这里就可以是 next[j] 了
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
                // 这里是易错点。求第一个 next 数组时，记得这里要 k-1。自己算一下 aab 就知道了
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
            // 易错点。这里也是一样的道理，我们需要 j - 1
            // 因为当前的 si tj 是不相同的，但 si-1 和 tj-1 是相等的
            // 我们需要需要查找的前后缀是不包含 j 所在字符的
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



function bruteForce(str, pattern) {
    let [i, j] = [0, 0]
    while (i < str.length - j) {
        const ans = i
        while (j < pattern.length && str[i] === pattern[j]) {
            i++
            j++
        }
        if (j >= pattern.length) {
            return ans
        }

        i = ans + 1
        j = 0
    }

    return -1
}

function check(fn) {
    const getRandomStrAndPattern = () => {
        const length = Math.max(
            1,
            ~~(Math.random() * 26)
        )

        const str = Array.from({length}, () => {
            return String.fromCharCode(
                0x41 + ~~(Math.random() * 6)
            )
        }).join('')

        const a = ~~(Math.random() * length)
        const b = ~~(Math.random() * length)
        const left = Math.min(1, a, b)
        const right = Math.max(1, a, b)
        const pattern = str.slice(left, right)

        return [str, pattern]
    }
    const oneCheckSuccess = (fn) => {
        const [str, pattern] = getRandomStrAndPattern()

        if (fn(str, pattern) !== str.indexOf(pattern)) {
            throw new Error(`${fn.name}: ${str} \n ${pattern}`)
        }
    }
    const oneCheckUnknown = (fn) => {
        const [str] = getRandomStrAndPattern()
        const [pattern] = getRandomStrAndPattern()
        if (fn(str, pattern) !== str.indexOf(pattern)) {
            throw new Error(`${fn.name}: ${str} \n ${pattern}`)
        }
    }

    for (let i = 0; i < 100; i++) {
        oneCheckSuccess(fn)
        oneCheckUnknown(fn)
    }
}
