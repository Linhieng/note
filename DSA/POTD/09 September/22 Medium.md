# [230922 First and last occurrences of x](https://practice.geeksforgeeks.org/problems/first-and-last-occurrences-of-x3116/1)

【题意】：查找元素左边界和右边界

【Excepted】：

- Time Complexity: O(logN)
- Auxiliary Space: O(1).

## Solution

```py
# 官方
class Solution:
    def find(self, arr, n, x):
        ans = [-1, -1]

        # Find the first occurrence of x
        left, right = 0, n - 1
        while left <= right:
            mid = left + (right - left) // 2
            if arr[mid] == x:
                ans[0] = mid
                right = mid - 1
            elif arr[mid] < x:
                left = mid + 1
            else:
                right = mid - 1

        # Find the last occurrence of x
        left, right = 0, n - 1
        while left <= right:
            mid = left + (right - left) // 2
            if arr[mid] == x:
                ans[1] = mid
                left = mid + 1
            elif arr[mid] < x:
                left = mid + 1
            else:
                right = mid - 1

        return ans
```

```py
class Solution:
    def find(self, arr, n, x):

        def first():
            low, high = 0, n-1
            while low <= high:
                mid = (low + high) // 2
                if arr[mid] < x:
                    low = mid + 1
                elif arr[mid] > x:
                    high = mid - 1
                else:
                    high = mid - 1
            if high + 1 < n and arr[high + 1] == x:
                return high + 1
            return -1

        def last():
            low, high = 0, n-1
            while low <= high:
                mid = (low + high) // 2
                if arr[mid] < x:
                    low = mid + 1
                elif arr[mid] > x:
                    high = mid - 1
                else:
                    low = mid + 1
            if low-1 > -1 and arr[low-1] == x:
                return low - 1
            return -1

        return [first(), last()]
```

```py
class Solution:
    def find(self, arr, n, x):
        first, last = -1, -1
        for i in range(n):
            if arr[i] == x:
                last = i
                if first == -1:
                    first = i
        return [first, last]
```
