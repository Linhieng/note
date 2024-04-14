# 或运算

或运算：

- 二进制进行或运算，只有有一个 1，则结果为 1
- 多个数字进行或运算

## [例题 - 按位或最大的最小子数组长度](https://leetcode.cn/problems/smallest-subarrays-with-maximum-bitwise-or/description/)

```py
class Solution:
    def smallestSubarrays(self, nums: List[int]) -> List[int]:
        ans = [1] * len(nums)
        maxOR = []
        for i, x in enumerate(nums):
            maxOR.append(x)
            for j in range(i-1, -1, -1):
                """
                由于 i 是从左到右，所以当 maxOR[j] | x 的结果等于 maxOR[j] 后，
                则说明再往前找，也找不到比 maxOR[j] 更大的了
                因为 maxOR[j] 表示的是 nums[0..j] 的最大或值。
                多个数字的或运算，意味着某一位上一旦有一个 1，那么这个位上就只会是 1 了
                也就是说，或运算的结果，要么保存不变，要么增加了值为 1 的位的数量。
                所以当 a | b = a 时，类似于 b 是 a 的子集，
                因为 b 二进制上有 1 的位，在 a 上都有
                """
                if maxOR[j] | x == maxOR[j]:
                    break
                maxOR[j] |= x
                ans[j] = i - j + 1
        return ans
```

