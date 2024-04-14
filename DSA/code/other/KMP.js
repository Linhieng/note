check(bruteForce)
check(KMP)
check(KMP1)
check(KMP2)
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























function KMP(str, pattern) {
    const getNext = (pattern) => {
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

    const next = getNext(pattern)
    let i = 0, j = 0
    while (i < str.length && j < pattern.length) {
        if (j === -1 || str[i] === pattern[j]) {
            i++
            j++
        } else {
            j = next[j]
        }
    }

    if (j >= pattern.length) {
        return i - pattern.length
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
