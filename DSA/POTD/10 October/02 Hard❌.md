# [231002 Number of distinct subsequences](https://practice.geeksforgeeks.org/problems/number-of-distinct-subsequences0909/1)

【题意】：不重复子序列的数量

【Excepted】

- Time Complexity: O(|str|)
- Auxiliary Space: O(|str|)

## Solution

```py
from collections import defaultdict

class Solution:

    def distinctSubsequences(self, S):
        ans = 1

        repetitionMap = defaultdict(lambda: 0)

        # countSub(n) = 2*Count(n-1) - Repetition
        for char in S:
            repetition = repetitionMap[char]
            repetitionMap[char] = ans
            ans = (2 * ans - repetition)

        return ans % int(1e9+7)
```

O(2^n)，超时

```py
class Solution:

    def distinctSubsequences(self, S):
        unique_subsequences = set()

        def subsequence(input, output):

            if len(input) == 0:
                unique_subsequences.add(output)
                return

            subsequence(input[1:], output+input[0])
            subsequence(input[1:], output)

        subsequence(S, '')

        return len(unique_subsequences)
```
