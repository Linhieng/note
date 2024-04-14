[117周赛](https://www.acwing.com/activity/content/3419/)。

题目比上一次简单。
- 第一题：难度比 A+B 还简单
- 第二题：在我看来，只涉及到 `ord()` 这个知识点。
- 第三题：模版题，DFS。当然，由于给定的数据输入有规律，可以不使用 DFS
    ```py
    N = int(input().strip())
    ancestry = {}
    ancestry['bessie'] = 1
    maxDeep = 1
    for _ in range(N):
        child, parent = input().strip().split()
        child, parent = child.lower(), parent.lower()
        ancestry[child] = 1
        ancestry[child] += ancestry[parent]
        maxDeep = max(ancestry[child], maxDeep)
    print(maxDeep)
    ```
