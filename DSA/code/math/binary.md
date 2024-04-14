# 进制

## 十进制转二进制

```py
def to2(n10):
    stack = []
    while n10 != 0:
        stack.append(n10 % 2)
        n10 //= 2
    return ''.join(map(str, stack[::-1]))
```
