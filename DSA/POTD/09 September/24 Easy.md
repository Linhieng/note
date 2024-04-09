# [230924 Find duplicates in an array](https://practice.geeksforgeeks.org/problems/find-duplicates-in-an-array/1)

## Solution

```py
class Solution:
    def duplicates(self, arr, n):
        visited = set()
        ans = set()
        for a in arr:
            if a in visited:
                if a not in ans:
                    ans.add(a)
            visited.add(a)
        return sorted(ans) if len(ans) > 0 else [-1]
```
