# [230911 Lucky Numbers](https://practice.geeksforgeeks.org/problems/lucky-numbers2911/1)

【题意】：幸运数字

【Excepted】

- Time Complexity: O(sqrt(N)).
- Auxiliary Space: O(sqrt(N)).

## Solution

```py
class Solution:
    def isLucky(self, n):
        i = 2
        while n >= i:
            if n % i == 0:
                return False
            n -= n//i
            i += 1
        return True
```

```py
class Solution:
    def isLucky(self, n):
        def recursion(n, i):
            if n < i:
                return True
            if n % i == 0:
                return False
            return recursion(n - n//i, i+1)
        return recursion(n, 2)
```

```py
class Solution:
    def isLucky(self, n):
        arr = [i for i in range(n+1)]
        i = 1
        while len(arr) >= i:
            i += 1
            arrT = [*arr]
            for i in range(i, len(arr), i):
                arrT.remove(arr[i])
            arr = arrT
        return n in arr
```
