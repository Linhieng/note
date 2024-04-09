# 位运算的方式，只能用 py 实现
class Solution:
    def addBinary(self, a, b) -> str:
        x, y = int(a, 2), int(b, 2)
        while y:
            answer = x ^ y # 异或相加
            carry = (x & y) << 1
            x, y = answer, carry
        return bin(x)[2:]
