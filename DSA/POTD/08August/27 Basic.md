# [230827 Reverse a String](https://practice.geeksforgeeks.org/problems/reverse-a-string/1)

【题意】：反转字符串

【Excepted】

- Time Complexity: O(|S|).
- Auxiliary Space: O(1).

## Python3

```py
class Solution:
    def reverseWord(self, s):
        return s[::-1]
```

```py
class Solution:
    def reverseWord(self, s):
        left, right = 0, len(s)-1
        s = [*s]
        while left < right:
            s[left], s[right] = s[right], s[left]
            left += 1
            right -= 1

        return ''.join(s)
```
