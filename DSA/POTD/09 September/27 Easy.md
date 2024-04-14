# [230927 Find the closest pair from two arrays](https://practice.geeksforgeeks.org/problems/find-the-closest-pair-from-two-arrays4215/1)

【题意】：从两个数组中找出最接近给定值的两个元素

【Excepted】

- Time Complexity: O(N+M).
- Auxiliary Space: O(1).

## Solution

```py
class Solution:
    def printClosest(self, arr, brr, n, m, x):
        closest_sum = float('inf')
        closest_pair = (None, None)

        i = 0
        j = m - 1

        while i < n and j >= 0:
            current_sum = arr[i] + brr[j]

            if abs(current_sum - x) < abs(closest_sum - x):
                closest_sum = current_sum
                closest_pair = (arr[i], brr[j])

            if current_sum > x:
                j -= 1
            else:
                i += 1

        return closest_pair
```

```py
class Solution:
    def printClosest (self,arr, brr, n, m, x) :
        for i in range(n):
            arr[i] = x - arr[i]

        minDiff = float('inf')
        ans = []
        i, j = n-1, 0
        while i > -1 and j < m:
            if abs(arr[i] - brr[j]) < minDiff:
                ans = [x - arr[i], brr[j]]
                minDiff = abs(arr[i] - brr[j])
            if arr[i] <= brr[j]:
                i -= 1
            else:
                j += 1
        return ans
```

```py
class Solution:
    def printClosest (self,arr, brr, n, m, x) :
        for i in range(n):
            arr[i] = x - arr[i]

        ans = float('inf')
        i, j = n-1, 0
        while i > -1 and j < m:
            ans = min(ans, abs(arr[i] - brr[j]))
            if arr[i] <= brr[j]:
                i -= 1
            else:
                j += 1
        return [x+ans, 0]

```
