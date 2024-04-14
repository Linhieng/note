## 🍕 动态规划

### 先手后手

给定一个整型数组arr, 代表数值不同的纸牌排成一条线。
玩家 A 和玩家 B 依次拿走每张纸牌, 规定玩家 A 先拿, 玩家 B 后拿,
但是每个玩家每次只能拿走最左或最右的纸牌, 玩家A和玩家B都绝顶聪明。请返回最后获胜者的分数。

```java
int win1(int[] arr) {
    if (arr == null || arr.length == ) {
        return 0;
    }
    return Math.max(
        f(arr, 0, arr.length-1), // 在 [0, arr.length) 范围上先手能获得的分数
        s(arr, 0, arr.length-1)  // 在 [0, arr.length) 范围上后手能获得的分数
    );
}
// 在 [i, j] 范围上先手能获取的最大值
int f(int[] arr, int i, int j) {
    if (i == j) { // 如果只有一个数，则直接拿
        return arr[j];
    }
    return Math.max(
        arr[i] + s(arr,i+1, j), // 如果拿左边，则下一次就是在 [i+1, j] 范围上作为后手
        arr[j] + s(arr,i,j-1)   // 如果拿右边，则下一次就是在 [i, j+1] 范围上作为后手
    );
}
// 在 [i, j] 范围上后手能获取的最大值
int s(int[] arr, int i, int j) {
    if (i == j) { // 如果只有一个输，则拿不了（被先手拿了）
        return 0;
    }
    return Math.min(
        f(arr, i+1, j),
        f(arr, i, j-1)
    );
}

```

1. 根据上面的递归，确定两个变量 i 和 j 的变化范围
2. 然后根据 i 和 j 画出两张表（f 和 s）
3. 先根据 base case 处理表中的默认值（表的左下部分是无用的，对角线的值可以直接求）
4. 根据递归关系，确定每一个单元格的依赖关系（如何计算该单元格）
5. 根据依赖关系，反推单元格的值（动态规划）
重点⚠️：自己画图

【动态规划】
```java
int dp(int[] arr) {
    if (arr == null || arr.length == 0) {
        return 0;
    }
    int[][] f = new int[arr.length][arr.length];
    int[][] s = new int[arr.length][arr.length];
    for (int i = 0; i < arr.length; i++) {
        f[i][i] = arr[i];
    }
    int row = 0;
    int col = 1;
    // 从 [0,1] 位置开始，方向是斜向，每个单元格由另外一张表的左边和下边单元格比较大小得出。
    while (col < arr.length) {
        int i = row;
        int j = col;
        while (i < arr.length && j < arr.length) { // 斜着往下走
            f[i][j] = Math.max(
                arr[i] + s[i + 1][j],
                arr[j] + s[i][j - 1]);
            s[i][j] = Math.min(
                f[i + 1][j],
                f[i][j - 1]);
            i++;
            j++;
        }
        // 慢慢向右上角靠近。
        col++;
    }
    return Math.max(f[0][arr.length-1], s[0][arr.length-1]);
}
```

### 象棋跳马（三维）

假设由一个固定大小的棋盘（8×9），马只能走日。
问：马从 (0,0) 位置到 (x,y) 位置，必须跳 step 步。有多少种方法？

【暴力递归】
```java
void main(int x, int y, int step) {
    // 从 (0,0) 位置到 (x,y) 位置，必须跳 step 步。有多少种方法？
    return process(x, y, step);
}

// 潜台词：从 (0,0) 位置出发
// 要去往 (x,y) 位置，必需跳 step 步
// 返回方法数
int process(int x, int y, int step) {
    // 不可能到达的越界的位置，故方法数为 0
    if (x < 0 || x > 8 || y < 0 || y > 9) {
        return 0;
    }
    // 只能跳 0 步。初始位置又是 (0,0) 。
    // 如果要到达的位置是 (0,0) 则表示有一种方法到达。
    // 如果要到达的位置不是（0,0），则表示不可能到达。
    if (step == 0) {
        return (x == 0 && y == 0) ? 1 : 0;
    }
    // 有 8 个位置可以只花一步就到达 (x,y)
    // 转换一下就是，花了 step-1 步从 (0,0) 到达这 8 个位置。
    return  process(x - 1, y + 2, step - 1)
        +   process(x + 1, y + 2, step - 1)
        +   process(x + 2, y + 1, step - 1)
        +   process(x + 2, y - 1, step - 1)
        +   process(x + 1, y - 2, step - 1)
        +   process(x - 1, y - 2, step - 1)
        +   process(x - 2, y - 1, step - 1)
        +   process(x - 2, y + 1, step - 1);
}
```

【动态规划】
```java
int dp(int x, int y, int step) {
    if (x < 0 || x > 8 || y < 0 || y > 9 || step < 0) {
        return 0;
    }
    int[][][] dp = new int[9][10][step + 1];
    dp[0][0][0] = 1;
    for (int h = 1; h <= step; h++) { // 层
        // 每一层中的值都只依赖下一层，所以下面两个循环（遍历层中每个值）的顺序无所谓。
        for (int r = 0; r < 9; r++) {
            for ( int c = 0; c < 10; c++) {
                dp[r][c][h] += getValue(dp, r - 1, c + 2, step - 1);
                dp[r][c][h] += getValue(dp, r + 1, c + 2, step - 1);
                dp[r][c][h] += getValue(dp, r + 2, c + 1, step - 1);
                dp[r][c][h] += getValue(dp, r + 2, c - 1, step - 1);
                dp[r][c][h] += getValue(dp, r + 1, c - 2, step - 1);
                dp[r][c][h] += getValue(dp, r - 1, c - 2, step - 1);
                dp[r][c][h] += getValue(dp, r - 2, c - 1, step - 1);
                dp[r][c][h] += getValue(dp, r - 2, c + 1, step - 1);
            }
        }
    }
}
int getValue(dp[][][], int x, int y, int step) {
    // 超出范围的均为 0
    if (x < 0 || x > 8 || y < 0 || y > 9 || step < 0) {
        return 0;
    }
    return dp[x][y][step];
}
```

### 生存概率（三维）

和象棋类似，给你一个 (N×M) 大小的地图，鲍勃初始位置在 (i,j) 上。
每次一定会走一步，有上下左右四个方向可以走，每个方向走的概率是相同的。
问走了 K 步后鲍勃生存的概率是多少


【暴力递归】
```java
String bob1(int N, int M, int i, int j, int K) {
    long all = (long) Math.pow(4, K);
    long live = process(N, M, i, j, K);
    long gcd = gcd(all, live);
    return String.valueOf( (live / gcd) + "/" + (all / gcd) );
}

long process(int N, int M, int row, int col, int step) {
    if (row < 0 || row == N || col < 0 || col == M) {
        return 0;
    }
    if (step == 0) {
        return 1;
    }
    long live = process(N, M, row - 1, col, step - 1)
            +   process(N, M, row, col - 1, step - 1)
            +   process(N, M, row + 1, col, step - 1)
            +   process(N, M, row, col + 1, step - 1);
    return live;

}

long gcd(long m, long n) {
    return n == 0 ? m : gcd(n, m % n);
}
```

【动态规划】
```java
String bob2(int N, int M, int i, int j, int K) {
    int[][] dp = new int[N + 2][M + 2][K + 1];
    for (int row = 1; row <= N; row++) {
        for (int col = 1; col <= M; col++) {
            dp[row][col][0] = 1;
        }
    }
    for (int step = 1; step <= K; step++) {
        for (int row = 1; row <= N; row++) {
            for (int col = 1; col <= M; col++) {
                dp[row][col][step] = dp[row - 1][col][step - 1]
                                    +dp[row1][col - ][step - 1]
                                    +dp[row + 1][col][step - 1]
                                    +dp[row][col + 1][step - 1];
            }
        }
    }
    long all = (long) Math.pow(4, K);
    long live = dp[i + 1][j + 1][K];
    long gcd = gcd(all, live);
    return String.valueOf( (live / gcd) + "/" + (all / gcd) );
}
```

### 凑零钱（斜率优化）

不限制每个面额的数量

#### 暴力递归
```java
int recursive(int[] arr, int aim) {
    return process(arr, 0, aim);
}
// 在 arr[index, ...] 范围上凑 rest 有多少种方法
int process(int[] arr, int index, int rest) { // rest: 剩余部分
    if (index == arr.length) {
        return reset == 0 ? 1 : 0;
    }
    int ways = 0;
    for (int zhang = 0; arr[index] * zhang <= rest; zhang++) {
        ways += process(arr, index + 1, rest - arr[index]*zhang);
    }
    return ways;
}
```

#### 动态规划 TC: O(N * aim^2)
```java
int way2(int[] arr, int aim) {
    if (arr == null || arr.length == 0) {
        return 0;
    }
    int N = arr.length;
    int[][] dp = new int[N + 1][aim + 1];
    dp[N][0] = 1;

    // 填表时是从下往上的。每一行中的每个值都只依赖下一行中的某些值。
    for (int index = N - 1; index >= 0; index--) {
        for (int rest = 0; rest <= aim; rest++) {

            // 这里的内容直接照抄递归中的内容
            int ways = 0;
            for (int zhang = 0; arr[index] * zhang <= rest; zhang++) {
                ways += dp[index + 1][rest - arr[index]*zhang];// process(arr, index + 1, rest - arr[index]*zhang);
            }
            d[index][rest] = ways; // return ways;

        }
    }

    return dp[0][aim];
}
```

【[py 版本](https://practice.geeksforgeeks.org/problems/coin-change2448/1)】
```py
class Solution:
    def count(self, coins, N, aim):

        dp = [ [0] * (aim+1) for _ in range(N+1)]

        dp[N][0] = 1

        for index in range(N-1, -1, -1):
            for rest in range(aim + 1):

                ways = 0
                zhang = 0
                while zhang * coins[index] <= rest:
                    ways += dp[index+1][rest - zhang*coins[index]]
                    zhang += 1
                dp[index][rest] = ways


        return dp[0][aim]
```

#### 斜率优化 TC: O(N * aim)

前面的动态规划，我们求 `dp[index][rest]` 单元格的值时，是在下一行（dp[index+1]）中枚举相加的结果，这就是为什么时间复杂度中多了个 aim。
但实际上，我们不需要完全枚举下一行，完全可以从同一行或得到枚举的结果值。
（自己画图！）

这种优化称为斜率优化。即枚举行为可以被临近的某一个值直接代替。基本步骤如下：
- 原本（经典动态规划）：目标值 = x + 枚举1 + 枚举2 + 枚举3 + .....
- 观察（和题意吴冠希）：临近的某个值 = 枚举1 + 枚举2 + 枚举3 + .....
- 斜率优化（观察得到）：目标值 = x + 临近的某个值


```java
int way2(int[] arr, int aim) {
    if (arr == null || arr.length == 0) {
        return 0;
    }
    int N = arr.length;
    int[][] dp = new int[N + 1][aim + 1];
    dp[N][0] = 1;

    // 填表时是从下往上的。每一行中的每个值都只依赖下一行中的某些值。
    for (int index = N - 1; index >= 0; index--) {
        for (int rest = 0; rest <= aim; rest++) {

            dp[index][rest] = dp[index+1][rest]; // 总是需要下面一行
            // 其他的枚举相加值，可以直接通过本行的前面某个格式直接得出了，这样就不需要枚举相加了
            if (rest - arr[index] >= 0) {
                dp[index][rest] += dp[index][ rest - arr[index] ]
            }

        }
    }

    return dp[0][aim];
}
```

【[py 版本](https://practice.geeksforgeeks.org/problems/coin-change2448/1)】
```py
class Solution:
    def count(self, coins, N, aim):

        dp = [ [0] * (aim+1) for _ in range(N+1)]

        dp[N][0] = 1

        for index in range(N-1, -1, -1):
            for rest in range(aim + 1):

                dp[index][rest] = dp[index+1][rest]
                if rest - coins[index] >= 0:
                    dp[index][rest] += dp[index][ rest - coins[index] ]


        return dp[0][aim]
```

## 🍕 总结动态规划

1. 暴力递归。常见的尝试有：从左到右、范围
2. 记忆递归。从这开始与原题意无关！
3. 画出表格分析：推导顺序、每个单元格的依赖关系
4. 得出严格表结构（经典动态规划）
5. 优化（斜率优化）

“尝试”有如人生，千奇百怪。但和人生不同的点在于，人生无法评价好坏，但“尝试”可以评价好坏：
- 第一原则：可变参数的维度是零纬度——可变参数应该是一个整数，而不是一个数组！（每年所有面试题，可变参数超出一维的题目不超过五道）。
- 第二原则：可变参数的个数尽量少。一般是 1,2,3 个（线面体）。
