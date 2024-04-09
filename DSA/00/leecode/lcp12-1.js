/**
 * @param {number[]} time
 * @param {number} m
 * @return {number}
 */
var minTime = function (time, limitDay) {
    let left = 0
    let right = time.reduce((pre, cur) => pre + cur, 0)

    while (left < right) {
        let mid = left + (right - left >> 1)
        if (countSpendDay(time, mid) <= limitDay) {
            // 在一天可分配的时间是 mid 的前提下，
            // 依旧能完成，那么就继续缩短一天可分配的时间！
            right = mid // 这里的 right 其实相当于常规二分中的 length，所以没有 - 1
        } else {
            left = mid + 1
        }
    }
    return left
}

/**
 * 在每天只能花费 limitTimeOneDay 时间的前提下
 * 需要花费多少天才能完成所有题目。
 */
function countSpendDay(questionsTimes, limitTimeOneDay) {
    let maxTimeToday = 0 // 初始值为 0，因为场外寻求帮助不消耗时间
    let sumToday = 0
    let spendDay = 1

    questionsTimes.forEach(questionTime => {
        // 1. 利用最小值，来过滤掉一天中需要花费最多时间的那道题目
        let selfTime = Math.min(questionTime, maxTimeToday)
        if (sumToday + selfTime <= limitTimeOneDay) {
            sumToday += selfTime
            // 2. 记得更新最大值，因为一天只能使用一次场外求助
            // 如果一天内，后面遇到需要花费更多时间的题目
            // 我们可以驳回刚刚所花费的次数，转而用在这道新的题目上
            maxTimeToday = Math.max(maxTimeToday, questionTime)
        } else {
            // 今天的问题已达标，当前这个问题得留到明天
            spendDay++
            // 这里的初始值不为 0，因为当前这道题目我们还未解决
            maxTimeToday = questionTime
            sumToday = 0
        }
    })
    return spendDay
}
