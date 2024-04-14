# [230919 Find first set bit](https://practice.geeksforgeeks.org/problems/find-first-set-bit-1587115620/1)

【题意】：二进制上第一个 1 的下标。从右往左

【Excepted】：

- Time Complexity: O(log N).
- Auxiliary Space: O(1).

## Solution

```js
/**
 * @param {Number} n
 * @returns {Number}
*/

class Solution {
    //Function to find position of first set bit in the given number.
    getFirstSetBit(n) {
        const binary = n.toString(2)
        const index = binary.lastIndexOf('1')
        return index === -1? 0 : binary.length - index

        // 或

        let index = 0
        while (n !== 0) {
            index++
            if (n & 1 === 1) {
                return index
            }
            n >>>= 1
        }
        return 0
    }
}
```

```py
class Solution:
    def getFirstSetBit(self,n):
        b = bin(n)[2:]
        ans = 0
        for i in b[::-1]:
            ans += 1
            if i == '1':
                return ans
        return 0
```

```py
class Solution:
    def getFirstSetBit(self,n):
        if(n==0):
            return 0

        #doing AND operation of n and -n. n and -n will have similar
        #bits only till the first set bit starting from the right
        #and different bits after the first set bit.Then we take
        #log2 of the result to find the position.

        #we add 1 to obtained value so that count starts from 1 instead of 0.
        return math.ceil(math.log2(n&-n)+1)
```
