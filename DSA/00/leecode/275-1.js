/**
 * 咋一看题意，还真有点懵。
 * 看到一个题解说：《先逆序，然后二分，求最后一个满足
 * 下标对应的值大于下标+1的下标，返回该下标+1》 时
 * 就突然明白了这道题到底在考查什么。
 *
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function(citations) {
    const len = citations.length
    let leftIndex = 0,
        rightIndex = len - 1

    while (leftIndex <= rightIndex) {
        let mid = leftIndex + (rightIndex - leftIndex >> 1)

        if (citations[mid] >= len - mid) {
            // 引用次数大于 len-mid 篇论文
            rightIndex = mid - 1
        } else {
            leftIndex = mid + 1
        }
    }

    return len - leftIndex
};
