/**
 * @param {number[]} time
 * @param {number} m
 * @return {number}
 */
var minTime = function(time, m) {

    let left = 0
    let right = time.reduce((pre, cur)=>pre + cur, 0)

    // 对结果（一天花费多少时间做题）进行二分
    while (left < right) {
        let mid = left + (right - left >> 1)
        if (check(time, m, mid)) {
            right = mid
        } else {
            left = mid + 1
        }
    }
    return left
};

/**
 * 当一天只能花费 allowTimeOneDay 时间做题时
 * 能否在 limitDay 天数内完成所有算法题
 */
function check(questionsTimes, limitDay, allowTimeOneDay) {
    const len = questionsTimes.length
    let restTimeToday = allowTimeOneDay
    let spendDay = 1
    let maxTimeOneDay = 0
    let canForHelp = true
    for (let i = 0; i < len; i++) {
        const curQuestionTime = questionsTimes[i]
        maxTimeOneDay = Math.max(maxTimeOneDay, curQuestionTime)
        if (curQuestionTime <= restTimeToday) {
            // 既然还有剩余时间，那就自己完成一道题目
            restTimeToday -= curQuestionTime
        } else if (canForHelp && curQuestionTime <= restTimeToday + maxTimeOneDay) {
            // 剩余时间不够完成一道题目了，那么可以寻求场外求助
            // 但寻求场外求助时，肯定是让他帮忙解决耗时最长的那道题目啦
            // 所以，只有当 当前题目所需时间小于前面遇到的最大所需时间时
            // 我们才需要重新计算剩余时间。否则，直接跳过当前题目即可（给小杨做）
            restTimeToday += maxTimeOneDay
            canForHelp = false
            i-- // 当前题目还未完成，不能跳到下一个题目
        } else {
            // 没有场外求助了，剩余时间也也不够完成，所以就留到明天了。
            // 此时需要将数据重置：
            maxTimeOneDay = 0
            restTimeToday = allowTimeOneDay
            canForHelp = true
            spendDay++
            i-- // 当前题目还未完成，不能跳到下一个题目
        }
    }
    // 将计算出的完成天数，与允许的天数进行比较，看看能不能在规定天数内完成
    return spendDay <= limitDay
}
