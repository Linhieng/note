# [230913 Largest number possible](https://practice.geeksforgeeks.org/problems/largest-number-possible5028/1)

【题意】：给定一个数字 N 和 S，找到最大的数字，该数字的位数等于 N，每位上值的和等于 S

【Excepted】：

- Time Complexity: O(N)
- Auxiliary Space: O(1)

## Solution

```py
class Solution:
    def findLargest(self, N: int, S: int) -> str:
        ans = ""

        # If the sum of digits is 0 and the number of digits is more than 1,
        # return "-1" since it is not possible to form a number with only 0 digits.
        if S == 0 and N > 1:
            return "-1"

        # Iterating over each digit in the number.
        for i in range(N):
            # If the sum is greater than or equal to 9,
            # we add '9' to the number and subtract 9 from the sum.
            if S >= 9:
                ans += '9'
                S -= 9
            # If the sum is less than 9, we add the corresponding digit
            # to the number and set the sum to 0.
            else:
                ans += str(S)
                S = 0

        # If there is any remaining sum, it means we were not able to
        # use up the entire sum, so we return "-1".
        if S > 0:
            return "-1"

        # Returning the largest number that can be formed as a string.
        return ans
```

```py
class Solution:
    def findLargest(self, N, S):
        if N == 1 and S == 0:
            return 0
        if 9 * N < S or S < 1:
            return -1
        ans = 0

        for i in range(N):
            if S == 0:
                ans *= (10 ** (N - i))
                break
            ans *= 10
            if 0 < S < 10:
                ans += S
                S = 0
            else:
                ans += 9
                S -= 9
        return ans
```

【空间复杂度 O(N)】

```py
class Solution:
    def findLargest(self, N, S):
        if N == 1 and S == 0:
            return 0
        if 9 * N < S or S < 1:
            return -1
        ans = [0] * N

        for i in range(N):
            if S < 10:
                ans[i] = S
                break
            else:
                ans[i] = 9
                S -= 9
        return int(''.join(map(str, ans)))
```
