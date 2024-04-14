## [230818 Leaders in an array](https://practice.geeksforgeeks.org/problems/leaders-in-an-array-1587115620/1)

【题意】：找出数组中的 leaders, leaders 元素表示：该元素大于右边的每一个元素。

【 Excepted 】：
- Time Complexity: O(n)
- Auxiliary Space: O(n)

5 分钟。

### Python3

```py
class Solution:
    def leaders(self, A, N):
        ans = []
        maxRight = float('-inf')
        for i in A[::-1]:
            if i >= maxRight:
                ans.insert(0, i)
                maxRight = i
        return ans
```