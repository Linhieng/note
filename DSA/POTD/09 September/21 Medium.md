# [230921 Stickler Thief](https://practice.geeksforgeeks.org/problems/stickler-theif-1587115621/1)

【题意】：小偷金额最大化

【Excepted】

- Time Complexity:O(N).
- Space Complexity:O(N).

## Solution

```py
class Solution:

    #Function to find the maximum money the thief can get.
    def FindMaxSum(self,a, n):

        preNoTakeMax = 0
        preTakeMax = 0
        for money in a:
            tmp = max(
                preTakeMax,
                money + preNoTakeMax
            )
            preNoTakeMax = max(preNoTakeMax, preTakeMax)
            preTakeMax = tmp
        return max(preNoTakeMax, preTakeMax)
```

```js
/**
 * @param {number[]} arr
 * @param {number} n
 * @returns {BigInt}
 */

class Solution {
    //Function to find the maximum money the thief can get.
    findMaxSum(arr, n) {
        const max = (a, b) => (a > b ? a : b);

        let preNoTakeMax = 0n;
        let preTakeMax = 0n;
        for (const money of arr) {
            const tmp = max(preTakeMax, preNoTakeMax + BigInt(money));
            preNoTakeMax = max(preNoTakeMax, preTakeMax);
            preTakeMax = tmp;
        }
        return max(preNoTakeMax, preTakeMax).toString();
    }
}
```

```py
class Solution:

    def FindMaxSum(self,a, n):

        preMax = [0] * (n+1)
        preMax[1] = a[0]
        for i in range(2, n+1):
            preMax[i] = max(
                preMax[i-1],
                preMax[i-2] + a[i-1]
            )
        return preMax[n]
```

【py 实现时会报错 Segmentation Fault (SIGSEGV)，这个其实就是栈溢出】

```py
#User function Template for python3
class Solution:

    #Function to find the maximum money the thief can get.
    def FindMaxSum(self,a, n):

        dp = [-1] * n

        def steal(i):
            if i >= n:
                return 0
            if dp[i] != -1:
                return dp[i]
            take = a[i] + steal(i+2)
            notake = steal(i+1)
            dp[i] = max(take, notake)
            return dp[i]
        return steal(0)
```
