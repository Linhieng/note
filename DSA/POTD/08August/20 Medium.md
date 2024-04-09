## [230820 Number of occurrence](https://practice.geeksforgeeks.org/problems/number-of-occurrence2259/1)

【题意】： 在有序数组中查找指定数字的个数

【 Excepted 】：
- Time Complexity: O(logN)
- Auxiliary Space: O(1)

### Python3

【二分搜索】
```py
class Solution:
    def count(self,arr, n, x):

        lo, hi = 0, n
        while lo < hi:
            mid = (lo + hi) // 2
            if arr[mid] < x:
                lo = mid + 1
            else:
                hi = mid
        left = lo

        lo, hi = 0, n
        while lo < hi:
            mid = (lo + hi) // 2
            if x < arr[mid]:
                hi = mid
            else:
                lo = mid + 1
        right = lo

        return right - left
```

```py
from bisect import bisect_right, bisect_left
class Solution:
    def count(self,arr, n, x):
        left = bisect_left(arr, x)
        right = bisect_right(arr, x)
        return right - left
```

```py
class Solution:
    def count(self,arr, n, x):
        ans = 0
        for a in arr:
            if a == x:
                ans += 1
        return ans
```

```py
class Solution:
	def count(self,arr, n, x):
        return arr.count(x)
```