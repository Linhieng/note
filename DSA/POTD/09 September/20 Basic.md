# [230920 Rotate Bits](https://practice.geeksforgeeks.org/problems/rotate-bits4524/1)

【题意】：循环位移

【Excepted】：

- Time Complexity: O(1).
- Auxiliary Space: O(1).

一道 basic 题目居然花了我 20分钟，而是还是没有使用位移的情况下……

## Solution

```py
class Solution:
    def rotate(self, N, D):

        D %= 16

        def leftRotate(N, D):
            # << 所谓循环左移 D 位，就是将左边的 D 位移动到右边的 D 位
            SET16 = (1 << 16) - 1
            leftMask = (( SET16 ) >> (16 - D)) << (16 - D)
            left = leftMask & N
            right = left >> (16 - D)
            N = (N << D) & SET16
            return N | right

        def rightRotate(N, D):
            # >> 所谓右移 D 位，就是将右边的 D 位移到左边的 D 位
            rightMask = (1 << D) - 1
            rotate = (N & rightMask) << (16-D)
            N >>= D
            return N | rotate

        return [leftRotate(N, D), rightRotate(N, D)]
```

```py
class Solution:
    def rotate(self, N, D):
        binary = bin(N)[2:].rjust(16, '0')
        leftRotate = []
        rightRotate = []

        le = D % 16
        ri = (16 - le) % 16

        for _ in range(16):
            leftRotate.append(binary[le])
            le += 1
            le %= 16
            rightRotate.append(binary[ri])
            ri += 1
            ri %= 16

        return (
            int(''.join(leftRotate), 2),
            int(''.join(rightRotate), 2)
        )
```

```py
class Solution:
    def rotate(self, n, d):
        # Rotation of 16 is the same as rotation of 0
        # Rotation of 17 is the same as rotation of 1
        # and so on.
        d = d % 16
        res = [0, 0]

        # Storing n in a temporary variable
        temp = n

        mask = (1 << d) - 1  # Picking up the leftmost d bits
        shift = (temp & mask)
        temp = (temp >> d)  # Moving the remaining bits to their new location
        temp += (shift << (16 - d))  # Adding removed bits at the rightmost end
        res[1] = temp  # Storing the new number

        temp = n
        mask = ~((1 << (16 - d)) - 1)  # Picking the rightmost d bits
        shift = (temp & mask)
        temp = (temp << d)  # Moving the remaining bits to their new location
        temp += (shift >> (16 - d))  # Adding removed bits at the leftmost end
        res[0] = temp  # Storing the new number

        mask = (1 << 16) - 1
        res[0] = (res[0] & mask)

        return res
```
