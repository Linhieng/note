# 计算阶乘

计算 $X^N$，常规的计算需要 N-1 次乘法。但明显下面这种计算更加高效：

- 如果 N 是偶数，$X^N = X^{N/2} \cdot X^{N/2}$
- 如果 N 是奇数，$X^N = X^{(N-1)/2} \cdot X^{(N-1)/2} \cdot X$

为此，可以写出以下代码

```py
def power(X, N):

    if N == 0:
        return 1
    # if N == 1:   这一行和下面的等效
    #     return X
    if N % 2 == 0:
        return power(X * X, N // 2)
    else:
        # return X * power(X * X, (N - 1) // 2) 等同下面的
        return X * power(X, N - 1)
```

如果不使用递归，可以写成下面这样

```py
def power(X, N):
    ans = 1
    while N > 0:
        if N % 2 == 1:
            ans *= X
        X *= X
        N //= 2
    return ans
```

如果是在做算法题，一般会要对结果求模。此时要注意，虽然 python 不设整数上限，但在计算大数据时会影响性能，从而导致超时，所以还是得在计算的过程中直接求模，而不是等到最后才求模。
