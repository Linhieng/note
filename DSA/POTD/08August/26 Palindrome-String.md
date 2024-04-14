## [230825 Palindrome String](https://practice.geeksforgeeks.org/problems/palindrome-string0817/1)

【题意】：判断字符串回文

【Excepted】

- Time Complexity: O(Length of S)
- Auxiliary Space: O(1)

### Python3

```py
class Solution:
    def isPalindrome(self, S):
        left, right = 0, len(S)-1
        while left < right:
            if S[left] != S[right]:
                return 0
            left += 1
            right -= 1
        return 1
```

```py
class Solution:
    def isPalindrome(self, S):
        return int(S == S[::-1])
```
