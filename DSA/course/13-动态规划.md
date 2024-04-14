## 🍕 动态规划

优化过程（面试中的题目一定可以优化的，生活中的递归不一定可以优化）
- 暴力递归
- 记忆化搜索 - 在递归过程中加缓存
- 严格表结构的动态规划 - 整理依赖关系
    - 有几个可变参数，表示是几个维度的表
    - 计算可变参数的范围，该范围+1就是表的大小
    - 标出表中的默认值，也就是 base case。
    - 推理出普遍的位置是如何依赖其他位置的
    - 确定依次计算的顺序。是从左到右，还是从右到做。是从上到下还是从下到上。

### 机器人步数问题

一共 1...N 个位置，要你必须只用指定步数走到指定位置，并且每一步必须走，不能停。问有几种方式

#### 暴力递归

```java
// 一共有 N 个位置
// 目的地是位置 E
// 还剩 rest 步要走
// 当前在 cur 位置
// 返回值: 方法数 —— 只用 rest 步从 cur 位置走到 E 位置有多少中方法
int f(int N, int E, int rest, int cur) {
    if (rest == 0) {
        // 只剩 0 步可走。如果当前是在 E 位置，说明是一种方法，否则不是一种方法
        return cur == E ? 1 : 0;
    }
    // 如果在 1 位置，则只能往右走
    if (cur == 1) {
        return f(N, E, rest-1, 2)
    }
    if (cur == N) { // 同理，在右边界，则只能往左走
        return f(N, E, rest-1, N-1)
    }
    // 可以往右也可以往左。返回的是方法数，所以要加起来。
    return f(N, E, rest-1, cur-1) + f(N, E, rest-1, cur+1)
}
```

#### 记忆化搜索
```java
// 从 S 位置开始走，只能走 K 步
int walkWays2(int N, int E, int S, int K) {
    int[][] dp = new int[K+1][N+1]
    for (int i = 0; i <= K; i++) {
        for (int j = 0; j <= N; j++) {
            dp[i][j] = -1;
        }
    }
    return f2(N, E, K, S, dp);
}
int f2(int N, int E, int rest, int cur, dp) {
    if (dp[rest][cur] != -1) {
        return dp[rest][cur];
    }

    if (rest == 0) {
        dp[rest][cur] = cur == E ? 1 : 0
        return dp[rest][cur];
    }

    if (cur == 1) {
        dp[rest][cur] =return f(N, E, rest-1, 2)
    } else if (cur == N) {
        dp[rest][cur] = f(N, E, rest-1, N-1)
    } else {
        dp[rest][cur] = f(N, E, rest-1, cur-1) + f(N, E, rest-1, cur+1)
    }
    return dp[rest][cur];
}
```

#### 严格表结构的动态规划

```java
// N 表示有 1...N 个位置。
// 目标是走到 target 位置
// start 表示初始位置
// K 表示只允许 K 步
int walkWays3(int N, int target, int start, int K) {

    // dp[rest][cur] 表示花费 rest 步 走到 cur 位置有多少种走法。
    int[][] dp = new int[K+1][N+1]; // 默认 0

    // 初始位置
    dp[0][start] = 1;

    // 填表
    for (int rest = 1; rest <= K; rest++) {
        for (int cur = 1; cur <= N; cur++) {
            if (cur == 1) { // 走到最左侧，只能往右走
                dp[rest][cur] = dp[rest-1][2];
            } else if (cur == N) { // 走到最右侧，只能往左走
                dp[rest][cur] = dp[rest-1][N-1];
            } else {
                // 中间位置，既可以往左也可以往右。
                dp[rest][cur] = dp[rest-1][cur-1] + dp[rest-1][cur+1];
            }
        }
    }
    // 返回使用 K 步走到 targets 位置。
    return dp[K][target];
}
```

### 最少硬币

#### 暴力递归

```java
// arr 中如何取出最少数量的硬币凑成 aim 金额。
int minCoins1(int[] arr, int aim) {
    return process1(arr, 0, aim);
}
// rest: 从 [index...] 要凑出的金额
// 返回值: 从 [index...] 凑出 rest 金额所需要的最少硬币
// 返回 -1 表示无解
int process1(int[] arr, int index, int rest) {
    if (rest < 0) { // 要凑成的金额是负数，无解
        return -1;
    }
    if (rest == 0) { // 前面已经凑够了，有解
        return 0; // 不需要再加上我(index) 这个硬币
    }
    if (index == arr.length) { // 没有硬币了
        return -1;
    }

    int p1 = process1(arr, index+1, rest); // 假如不选当前硬币
    int p2 = process1(arr, index+1, rest - arr[index]) // 假如选取当前硬币
    if (p1 == -1 && p2 == -1) { // 两个都无解
        return -1;
    } else {
        if (p1 == -1) { //  p1 无解
            return p2 + 1; // 直接返回 p2+1 ，+1 表示选取了当前硬币
        }
        if (p2 == -1) { // p2 无解
            return p1;
        }
        // 都有解，看谁使用的硬币数量少
        return Math.min(p1, p2 +1)
    }
}
```

#### 记忆化搜索

```java
int minCoins2(int[] arr, int aim) {
    int[][] dp = new int[arr.length+1][aim+1];
    for (int i = 0; i < arr.length; i++) {
        for (int j = 0; j < aim; j++) {
            dp[i][j] = -2;
        }
    }
    return process2(arr, 0, aim, dp);
}
int process2(int[] arr, int index, int rest, int[][] dp) {
    if (rest < 0) { // 下标越界
        return -1;
    }

    if (dp[index][rest] != -2) {
        return dp[index][rest];
    }

    if (rest == 0) {
        dp[index][rest] = 0;
    } else if (index == arr.length) {
        dp[index][rest] = -1;
    } else {

        int p1 = process2(arr, index+1, rest), dp;
        int p2 = process2(arr, index+1, rest - arr[index], dp)
        if (p1 == -1 && p2 == -1) {
            dp[index][rest] = -1;
        } else {
            if (p1 == -1) {
                dp[index][rest] = p2 + 1;
            } else if (p2 == -1) {
                dp[index][rest] = p1;
            } else {
                dp[index][rest] = Math.min(p1, p2 +1);
            }
        }
    }
    return dp[index][rest];
}
```

#### 严格表结构的动态规划

```java
int minCoins3(int[] arr, int aim) {
    int N = arr.length;
    int[][] dp = new int[arr.length+1][aim+1];

    for (int index = 0; index < arr.length; index++) { // if (rest == 0)  dp[index][rest] = 0;
        dp[index][0] = 0; // base case
    }
    for (int rest = 1; rest <= aim; rest++) { // if (index == arr.length)  dp[index][rest] = -1;
        d[N][rest] = -1;
    }


    // 从下到上，从左到右
    for (int index = N-1; index >= 0; index--) {
        for (int rest = 0; rest < aim; rest++) {

            // 因为我们规定了表格的推理方向，所以不需要考虑下面几种情况：
            // if (rest < 0) { return -1; }
            // if (dp[index][rest] != -2) { return dp[index][rest]; }
            // if (rest == 0) { dp[index][rest] = 0; }
            // if (index == arr.length) { dp[index][rest] = -1; }

            int p1 = dp[index+1][rest];
            // 这里因为下标又可以越界，所以需要考虑一下
            int p2 = -1;
            if (rest - arr[index] >= 0) {
                p2 = dp[index+1][rest - arr[index]]
            }

            if (p1 == -1 && p2 == -1) {
                dp[index][rest] = -1;
            } else {
                if (p1 == -1) {
                    dp[index][rest] = p2 + 1;
                } else if (p2 == -1) {
                    dp[index][rest] = p1;
                } else {
                    dp[index][rest] = Math.min(p1, p2 +1);
                }
            }
        }
    }



    return dp[0][aim];
}
```