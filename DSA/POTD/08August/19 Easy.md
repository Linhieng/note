## [Subarray with given sum](https://practice.geeksforgeeks.org/problems/subarray-with-given-sum-1587115621/1)

【题意】：给定一个数组 arr 在 arr 中找到一个子数组，其元素之和等于给定数字 s。

【 Excepted 】：
- Time Complexity: O(N)
- Auxiliary Space: O(1)

窗口问题。两个指针往右滑动。

### Python3

【py 改写评论区】
```py
class Solution:
    def subArraySum(self,arr, n, s):
        if s < 1:
            return [-1]

        sum, left, right = 0, 0, 0
        while right < n:
            sum += arr[right]

            while sum > s:
                sum -= arr[left]
                left += 1

            if sum == s:
                return [left+1, right+1]

            right += 1

        return [-1]
```

【我的】
```py
class Solution:
    def subArraySum(self,arr, n, s):
        if s < 1:
            return [-1]

        sum, left, right = 0, 0, 0
        while True:
            if sum == s:
                return [left+1, right]
            elif right < n and sum < s:
                sum += arr[right]
                right += 1
            elif left < n and sum > s:
                sum -= arr[left]
                left += 1
            else:
                return [-1]
```