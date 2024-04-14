/**
 * 仔细看一看，这两种计算方式似乎是相同的呀！
 * 每轮循环中 j 都是不一定会 +1 的。
 * 而 k 都是通过 next[k] 递减的！
 * 那为什么计算出来的 while 循环中，始终是 2 比较多呢？
 */

check()

function check(checkTimes = 1000) {
    const getRandomString = () => {
        const length = Math.max(
            1,
            ~~(Math.random() * 2000)
        )

        const str = Array.from({ length }, () => {
            return String.fromCharCode(
                0x41 + ~~(Math.random() * 6)
            )
        }).join('')

        return str
    }

    // 定义变量用于存储差值的总和和平方和
    let sumOfDifferences = 0;
    // 定义两种计算方式的胜利次数
    let win2 = 0, win22 = 0

    for (let i = 0; i < checkTimes; i++) {
        // 生成随机字符串
        const pattern = getRandomString();

        // 调用函数获取循环次数
        const whileTime2 = [0]
        const whileTime22 = [0]
        getNext2(pattern, whileTime2);
        getNext22(pattern, whileTime22);

        // 计算差值
        const difference = whileTime2[0] - whileTime22[0];
        // 更新差值的总和
        sumOfDifferences += difference;

        if (difference > 0) {
            win22++
        } else {
            win2++
        }

    }

    // 计算差值的平均值
    const mean = sumOfDifferences / checkTimes;
    // 输出平均值和方差
    console.log("两者的平均循环差值:", mean);
    console.log(`普通计算胜利次数 ${win2}次；动态规划计算胜利次数：${win22}`)
}

function getNext22(pattern, whileTime) {
    const len = pattern.length
    if (len < 2) return [-1]

    whileTime[0] = 0

    const next = [0, 0]
    let j = 2
    let pre = 0 // 当前最长的相同前后缀的长度，同时可以作为下标使用
    while (j < len) {
        whileTime[0]++

        if (pattern[pre] === pattern[j - 1]) {
            pre += 1
            next[j] = pre
            j++
        } else if (pre > 0) {
            pre = next[pre]
        } else {
            next[j] = 0
            j++
        }
    }
    return next
}
/**
 * 手算 next 数组统一右移一位，然后最左边补 -1
 */
function getNext2(pattern, whileTime) {
    // k 表示，在模版串 t 中，存在 k 个字符组成的前缀 t0..tk-1 依次与真后缀 tj-k...tj-1 相同
    let k = -1, j = 0
    const next = [-1]

    whileTime[0] = 0


    while (j < pattern.length) {
        whileTime[0]++

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
