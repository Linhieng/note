# 排列组合

## 组合（Combination）

```py
M=10**9+7
R=10**3
F=[1]*(R+1)
for i in range(2,R+1):
    F[i]=(F[i-1]*i)%M
Fhyp=[1]*(R+1)
Fhyp[R]=pow(F[R],M-2,M)
for i in range(R-1,-1,-1):
    Fhyp[i]=(Fhyp[i+1]*(i+1))%M
def C(n,k):
    if n<0 or k<0 or n<k:
        return 0
    return (F[n]*Fhyp[n-k]*Fhyp[k])%M

# 性能比上面一个慢
def C2(n, k):
    if n<0 or k<0 or n<k:
        return 0
    res = 1
    for i in range(n, n-k, -1):
        res *= i
    for i in range(2, k+1):
        res //= i
    return res % M

```
