
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    // Boyer-Moore 投票算法
    // 不会证明，所以只能理解，而我的理解就是：
    // 既然你出现的次数大于长度的一半，
    // 那么你 (count) 干掉（减去）其他所有人后，肯定还大于一！

    let candidate // 无所谓是谁
    let count = 0 // 刚开始的投票数是 0
    for (let n of nums) {

        // 投票数等于 0，意味着两种情况：
        //      - 还没人当选，原因是现在是第一个元素
        //      - 还没人当选，原因是前面的所有人都同归于尽了
        if (count === 0) {
            candidate = n // 这里是在选一个当候选人
        }

        // 这里只是算法层面上简写了
        count += n === candidate ?
            1 :
            -1
    }

    // nums.forEach(v => {
    //     // 每一轮投票后，投票数肯定 +1 / -1
    //     if (v === candidate) count++
    //     else count--

    //     // 注意等于 0 也是满足条件的！
    //     if (count <= 0) {
                // 问题出现在这这里！ v 让 candidate 变成了 0
                // 并不意味着 v 就有资格当选 candidate！
                // 因为他们同归于尽了，所以这里不能对 candidate 赋值为 v
    //         candidate = v
    //         count = 0 // 注意要重置为 0
    //     }
    // })
    return candidate
};
