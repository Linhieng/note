/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    // Boyer-Moore 投票算法
    // 不会证明，所以只能理解，而我的理解就是：
    // 既然你出现的次数大于长度的一半，
    // 那么你 (count) 干掉（减去）其他所有人后，肯定还大于一！

    let candidate
    let count = 0
    for (let n of nums) {
        if (count === 0) {
            // 还没有候选人，那就随便选一个
            candidate = n

            // 这里其实可以简写到后面，但是这样写更加容易理解，
            count = 1
            continue
        }

        // 进入到这里，说明有候选人，那就开始投票
        // 投票时，肯定非减即增！
        count += n === candidate ?
            1 :
            -1
    }

    return candidate
};
