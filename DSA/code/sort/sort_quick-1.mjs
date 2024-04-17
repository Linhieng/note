/**
 * 二段划分，速度较慢
 *
 * @param {number[]} nums
 * @return {number[]}
 */
export default function quickSort (nums) {
    // 这里记得是 len - 1
    quick_sort(nums, 0, nums.length - 1)
    return nums
};
function quick_sort(arr, leftIndex, rightIndex) {
    // 递归时永远要记得设置终止条件！
    if (leftIndex >= rightIndex) {
        return
    }

    let pivot = arr[leftIndex]

    // 这里提前 -1 和 +1 是为了方便 while 循环中的 do while
    let l = leftIndex - 1
    let r = rightIndex + 1
    while (l < r) {
        // 这里的 do while 为什么不加等号呢？
        // 因为加了等号会导致 l,r 范围溢出 [leftIndex, rightIndex]
        // 比如为 r 添加等号：arr[r] >= pivot
        // 那么当 arr = [1, 3, 2], pivot 取 1 时，r 最终会等于 -1
        // 再比如为 l 添加等号：arr[l] <= pivot
        // 那么当 arr = [3, 1, 2], pivot 取 3 时，l 最终会等于 3

        // 并不是说溢出了就不能处理，而是因为我们后面讨论的前提
        // 是 l, r 最终都还是在 [leftIndex, rightIndex] 范围内
        do l++; while (arr[l] < pivot);
        do r--; while (arr[r] > pivot);

        // 此时，arr[l] 肯定 >= pivot
        //      arr[r] 肯定 <= pivot
        if (l < r) {
            [arr[l], arr[r]] = [arr[r], arr[l]]
        }
        // 此时，[leftIndex, l]  <= pivot
        //                [r, rightIndex] >= pivot
    }

    // 出循环后，此时的 l 和 r 不一定相同，它们还可能是 r+1 === l
    // 原因是每轮循环中，l 和 r 的变化大小是不确定的！
    // 所以，不要看到 while 条件是 l < r，就以为除了循环后这两个就相等！

    // 此时的 l 和 r 之间的关系，只可能是
    //          [      l      ]
    //          [      r      ]
    // 或者
    //          [        l    ]
    //          [      r      ]
    // 现在，来考虑边界情况
    // l 和 r 的范围肯定都是在 [leftIndex, rightIndex] 内的
    // 问题是 l 是否可能等于 leftIndex
    // 而 r 是否可能等于 rightIndex
    // 答案是可能的！
    // 当我们选取的 pivot 是最左边的值，同时最左边的是最大值时
    // 最终 l 就是等于 leftIndex 的。比如 [3, 1, 2]
    // 同理，若我们选取的 pivot 是最右边的值，同时最右边的是最大值时
    // 最终 r 就是等于 rightIndex 的。比如 [1, 2, 3]

    // 所以，最终的 l 和 r 都可能等于边界
    // 那么我们在进一步划分时，就必须让其 +1 或者 -1
    // 这样才能让区间收缩，从而防止死循环（死递归）
    // 为什么会死递归？会问出这个问题，就说明对递归的理解不深刻
    // 能用递归的前提是能划分出子问题的划分，如果你这轮递归都没法继续划分子问题
    // 那么你的递归要如何终止呢？
    // 自己写一下代码，然后跑一下，发现报错后自己调试一下，你自然就懂得哪里错了

    // 根据上面结果，我们下一步划分时，
    // 要么是 r 和 r+1
    // 要么是 l-1 和 l
    // 那么我们这里选取哪一个呢？
    // 那得看 pivot 的取值
    // 因为我们 pivot 选取的是 arr[leftIndex]
    // 所以 l 可能等于 leftIndex
    // 那么 l-1 就是无效的（没有划分子问题）
    // 故，这里选取的是 r 和 r+1
    quick_sort(arr, leftIndex, r)
    quick_sort(arr, r + 1, rightIndex)
}





/**
 * 方法同上，只不过 pivot=arr[rightIndex] 罢了
 *
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
    quick_sort2(nums, 0, nums.length - 1)
    return nums
};
function quick_sort2(arr, leftIndex, rightIndex) {
    if (leftIndex >= rightIndex) {
        return
    }

    let pivot = arr[rightIndex]
    let l = leftIndex - 1
    let r = rightIndex + 1
    while (l < r) {
        do l++; while (arr[l] < pivot);
        do r--; while (arr[r] > pivot);
        if (l < r) {
            [arr[l], arr[r]] = [arr[r], arr[l]]
        }
    }

    // 现在，应该知道这里为什么是 l-1 和 l 了吧！
    // 因为 pivot=arr[rightIndex]
    // 所以 r 可能等于 rightIndex
    // 故 r+1 是无效的
    // 所以这里选取 l-1 和 l
    quick_sort(arr, leftIndex, l - 1)
    quick_sort(arr, l, rightIndex)
}
