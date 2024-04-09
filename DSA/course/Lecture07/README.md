## 🍕 前缀树

前缀树作用:
- 查询某字符串数量
- 查询以某字符为前缀的字符串数量

操作:
- 往前缀树中插入一个字符串
- 查找一个字符串的数量 (end)
- 查找某前缀的字符串的数量 (pass)
- 删除某个字符串
    - 方法1: 先查找, 看看这个字符存不存在, 然后再删除
    - (我认为的)方法2: 同样先查找, 但是查找过程中保存走过的路径, 如果找到, 那就就直接在路径上删除。
    - 方法2: 其实和 方法1 是一样的, 在时间复杂度上是一样的, 常数时间上方法2快一点点, 但是占用了更多的内存。

```java
class TrieNode {
    int pass; // 构造前缀树时经过了这个节点多少次
    int end;  // 这个节点是多少个字符串的最后一个字符
    TrieNode[] nexts; // 这个节点的后面有多少个节点。 如果字符串是纯小写字母的话, nexts 数组长度为 26 初始值为 Null, 表示不存在这条路
    // 刷题过程中的, 字符的种类基本是固定的, 所以这里使用固定长度的数组形式
    // 实际项目中, 字符的种类可能是未知的, 这个时候可以使用 哈希表 的, key 就是字符, value 就是对应的 TrieNode 节点
}

class Trie {
    TrieNode root;

    Trie() {
        // 根节点上的 pass 表示的含义是以 空串 为前缀的数量, 也就是加入的字符串数量
        //          end  的含义就是 空字符串 的数量
        root = new TrieNode();
    }

    // 插入一个字符串
    void insert(String word) {
        if (word == null) {
            return;
        }
        char[] chs = word.toCharArray(); // 将字符串拆分成单个字符
        TrieNode node = root;
        node.pass++;
        int index = 0;
        for (int i = 0; i < chs.length; i++) { // 遍历单个字符, 依次建路
            index = chs[i] - 'a';
            if (node.nexts[index] == null) {
                node.nexts[index] = new TrieNode()
            }
            node = node.nexts[index];
            node.pass++;
        }
        node.end++;
    }

    // 查找某个字符的数量
    int search(String word) {
        if (word == null) {
            return 0;
        }
        char[] chs = word.toCharArray();
        TrieNode node = root;
        int index = 0;
        for (int i = 0; i < chs.length; i++) {
            index = chs[i] - 'a';
            if (node.nexts[index] == null) {
                return 0;
            }
            node = node.nexts[index]
        }
        return node.end;
    }

    // 查询以某个字符为前缀的数量。 和 search 的区别只在于, 查询前缀返回的是 pass
    int prefixNumber(String word) {
        if (word == null) {
            return 0;
        }
        char[] chs = word.toCharArray();
        TrieNode node = root;
        int index = 0;
        for (int i = 0; i < chs.length; i++) {
            index = chs[i] - 'a';
            if (node.nexts[index] == null) {
                return 0;
            }
            node = node.nexts[index]
        }
        return node.pass;
    }

    void delete(String word) [
        if (search(word) != 0) {
            char[] chs = word.toCharArray();
            TrieNode node = root;
            node.pass--;
            int index = 0;
            for (int i = 0; i < chs.length; i++) {
                index = chs[i] - 'a'
                if (--node.nexts[index].pass == 0){
                    // 如果是 c++, 需要继续访问后续的节点, 将他们的空间释放。 具体做法可以是: 不在这里释放空间, 而是先记录下来, 同时把后续要释放空间的节点记录下来
                    // 等到循环结束后, 再将节点设置为空, 同时遍历要释放空间的节点, 依次释放空间。
                    node.nexts[index] = null;
                    return;
                }
                node = node.nexts[index];
            }
            node.end--;
        }
    ]

}

```

## 🍕 贪心算法

【算法核心】: 只考虑局部最优解, 不考虑全局最优解。

很多情况下, 局部最优就是全局最优, 但这往往需要证明。 如果在做题中还想着去证明, 那么时间肯定会不够用的。

### 案例1 安排会议

给出多场会议的开始时间和结束时间, 在限定一个会议室的情况下, 如何决定会议的顺序使得可以安排的会议数量最多？
- 【贪心策略1】: 以谁最早开始会议为标准, 安排会议顺序。 这种贪心策略很容易证明是非全局最优解的, 比如一个早上6点维持到下午6点的会议
- 【贪心策略2】: 以会议持续时间最短为标准, 安排会议顺序。 这种贪心策略也是很容易证明非全局最优解的。 比如一个会议6点到12点, 一个会议12点10分到下午6点, 而有一个会议在 11:50到12:20。
- 【贪心策略3】: 以谁最早结束会议为标准, 安排会议顺序。

第三种贪心策略似乎比较靠谱, 但是我们也无法马上证明。 在考试时, 遇到这个问题, 不要去证明, 平时可以尝试, 但考试的时候不要。
考试时, 利用对数器的方案, 外加暴力枚举的方法, 验证你的贪心策略, 如果基本都成功的话, 就提交上去。
所以重点在于, 你要很熟练的写出对数器, 并且熟悉暴力枚举等方式。 不然的话, 考试时对数器都不会写, 那么这种方式也就没用了。

贪心策略的代码一般都会简单。

```java
class Program {
    int start;
    int end;
}

int bestArrange(Program[] programs, int timePoint) {
    Arrays.sort(programs, (o1, o2) -> o1.end - o2.end ); // 按会议结束时间进行排序
    int result = 0;
    for (int i = 0; i < programs.length; i++) {
        if (timePoint <= programs[i].start) {
            result ++;
            timePoint = programs[i].end;
        }
    }
    return result;
}
```

### 案例2 最小字典序

给定一个字符串数组, 如何拼接字符串, 能够拼接出最小字典序的字符串。

【字典序大小规则】: 把单词看成 26 位进制的数, 然后在长度短的单词后补零, 最终两个单词长度一样, 然后比较大小。  比如 b 和 ba, b 补零后变成 b0, b0 < ba, 所以 b 的字典序小

【贪心策略1】: a 和 b 比较, 若 a 的字典序小, 则把 a 放前面。 这种贪心是错的, 明显的反例就是 b 和 ba 拼接, 按这种贪心排序最终会是 bba, 但实际上 bab 比 bba 字典序小。
【贪心策略2】: a 和 b 比较, 如果 a拼接b <= b拼接a, 则 a 放在前面。

贪心策略2 是正确的, 但在考试时不要想着证明。 或者说, 如果考试时自己想出了这种贪心策略, 同时无法自己找到反例时, 不要想着证明, 而是想把代码写下来, 然后去跑一下。
贪心策略的代码都是很简单的, 比如 贪心策略2 的代码如下:

```java
String lowestString(String[] strs) {
    if (strs == null || strs.length == 0) {
        return "";
    }
    Array.sort(strs, (a, b) -> (a+b) - (b+a)); // 如果 ab 字典序 < ba 字典序, 则 a 放在 b 前面
    // 排序后直接拼接起来, 最后结果就是最小字典序
    String res = "";
    for (int i = 0; i < strs.length; i++) {
        res += strs[i];
    }
    return res;
}
```

#### 贪心证明

首先, 要证明我们的比较策略, 是一个有效的比较策略。 举个无效的比较策略例子:
假设一个字符串只由 "甲"、 "乙"、 "丙" 组成, 如果定义的策略是:
这就是无效的比较策略, 因为比较的结果是个环, 就像石头箭头布一样, 你没法知道谁是最强的。

如果使用无效的策略, 对数组进行排序, 那么就无法保证排序结果的唯一性。 所以不能使用无效的比较策略。

专业地讲, 要证明我们的比较策略是有效的, 就需要证明我们的比较策略具有 **"传递性"**。

【证明比较策略具有传递性】:
- 要证明比较策略有传递性, 需要证明的是:
    - 如果 $ab$ $≤$ $ba$
    - 且 $bc$ $≤$ $cb$
    - 则 $ac$ $≤$ $ca$
- 我们把这些单词看成是 $k$ 进制, $k=26$, 那么 $ab$ 就可以写成 $a * k^(b长度) + b$, 我们用 $a * m(b)$ 来表示 $a * k^(b长度) + b$
    - 举个例子, 比如数字 12345, 可以看成是 $123 * 10^2 + 45$, 其中的 $10^2$ 的 $2$ 表示 $45$ 的长度。
- 故证明的内容可以改写成:
    - 如果 $a * m(b) + b$ $≤$ $b * m(a) + a$, ①
    - 且 $b * m(c) + c$ $≤$ $c * m(b) + b$, ②
    - 则 $a * m(c) + c$ $≤$ $c * m(a) + a$ ③
- 对第一个不等式 ① 两边同时减去 $b$ 再乘 $c$, 得到:
    - $a * m(b) * c$ $≤$ $b * m(a) * c + a * c - b * c$,  ④
- 对第二个不等式 ② 两边同时减去 $b$ 再乘 $a$, 得到:
    - $b * m(c) * a + c * a - b * a$ $≤$ $c * m(b) * a$, ⑤
- 可以发现, 不等式 ④ 的左侧等于不等式 ⑤ 的右侧, 所以得到:
    - $b * m(c) * a + c * a - b * a$ $≤$ $b * m(a) * c + a * c - b * c$, ⑥
- 化简不等式 ⑥, 首先两边同时减去 $c*a$, 得到
    - $b * m(c) * a - b * a$ $≤$ $b * m(a) * c - b * c$, ⑦
- 然后两边同时除以 $b$, 得到:
    - $m(c) * a - a$ $≤$ $m(a) * c - c$, ⑧
- 然后将两边的 $-a$ 和 $-c$ 互换一下变成 $+c$ 和 $+a$, 得到:
    - $m(c) * a + c$ $≤$ $m(a) * c + a$, ⑨
- 最终得到的不等式 ⑨, 就是前面的不等式 ③, 故成功证明我们的比较策略是有传递性的

证明了比较策略是有效的后, 只证明了: 不管使用什么排序算法, 都能保证最终的结果是唯一的。

【证明通过上面的比较策略得出的字典序是最小的】:
~~- 我们使用反证法证明: 假设一个字符串数组, 使用上面的比较策略后拼接成的字符串是 "……a……b……" 不是字典序最小的, 即存在 a b 两个字符交换后的字符串 "……b……a……" 的字典序比 "……a……b……" 字典序更小。~~
- 假设一个字符串数组, 使用上面的比较策略后拼接成的字符串是 "……a……b……"
    - 我们需要证明的是交换 a 和 b 两个字符后的字符串 "……b……a……" 字典序更大。
- 情况1, ab 是拼接在一起的, 即  "……ab……" 和 "……ba……"
    - 因为 ab 是我们使用比较策略后拼接的结果, 所以一定满足 ab ≤ ba
- 情况2, a 和 b 不是拼接在一起的, ab 之间有若干个字符 $m_1$, $m_2$, 即 "……a$m_1$$m_2$b……", "……b $m_1$$m_2$ a……"
- 如果我们将 a 往后移动, 即 a$m_1$ 交换成 $m_1$a, 我们能保证 $m_1$a 的字典序会变大
- 同理 b 往前移动, 我们也能保证 b$m_2$ 比 $m_2$b 更大,
- 以此类推, 通过数学归纳法, 最终就能够证明, 对于拼接后的字符串, 不管交换哪两个字符, 都会让字典序变大。

### 案例3 哈夫曼编码

群人想整分整块金条, 怎么分最省铜板?
例如,给定数组 [10,20,30], 代表一共三个人, 整块金条长度为10+20+30=60。
金条要分成 10,20,30 分别给三个人。
如果先把长度 60 的金条分成 10 和 50, 花费 60;
再把长度 50 的金条分成 20 和 30, 花费 50; 一共花费 110 铜板。
但是如果先把长度 60 的金条分成 30 和 30, 花费 60;
再把长度 30 金条分成 10 和 20 花费 30。 一共花费 90 铜板。

输入一个数组, 返回分割的最小代价

上面题意, 就是在说, 一个数字 60, 每次只能切割成两部分, 并且切割的代价是 60。
现在要将 60 切割成 10,20,30, 请问如何切割代价最小。
答案就是 先将 60 切成 30 和 30, 此时代价 60, 再将 30 切割成 10 和 20, 此时代价 30, 总代价 90。

抽象一下题意, 就是哈夫曼编码问题: 给定一个数组, 将他们构成一棵树, 要让最终树的数字之和最小。
比如数组 [10, 20, 30], 如果先将 20 和 30 合成一颗子树, 头节点就是 50, 然后再利用 50 和 10 构成一棵完整的树, 头节点就是 60。
但如果先将 10 和 20 构成一颗子树, 然后再将这棵子树和 30 构成完整的一棵树, 这棵树的数字之和会比前一种方法小。
```
    60          60
  /   \       /   \
 10   50     30   30
     /  \        /  \
    20  30      20  10
```

【哈夫曼编码步骤】:
- 每次从数组中选取出最小的两个数, 将他们构成一棵子树, 子树头节点的值为两个数之和
- 构造完后, 再把这棵子树的头节点值放到数组中, 然后重复前一步
- 直到最终构成一棵完整的树, 即数组中只剩下一个数, 这个树就是根节点的值。

```java
int lessMoney(int[] arr) {
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    for (int i = 0; i < arr.length; i++) {
        pq.add(arr[i]);
    }
    int sum = 0;
    int cur = 0;
    while (pq.size() > 1) {
        cur = pq.poll() + pq.poll();
        sum += cur; // 去除两个最小的数;   或者说切割的代价;    反正就是合成的子树的头节点的值就是了。
        pq.add(cur);
    }
    return
}

```

### 案例4 项目利润

【输入】:
- 正数数组costs
    - costs[i]表示i号项目的花费
- 正数数组profits
    - profits[i]表示i号项目在扣除花费之后还能挣到的钱(利润)
- 正数k
    - k表示你只能事行的最多做k个项目
- 正数m
    - m表示你初始的资金

【说明】: 你每做完一个项目, 马上获得的收益, 可以支持你去做下一个项目

【输出】: 你最后获得的最大钱数。

```java
class Node { // 表示一个项目
    int c;  // 项目要求资金
    int p; // 项目利润
}
int findMaximizedCapital(int k, int w, int[] Profits, int[] Capital) {
    PriorityQueue<Node> minCostQ = new PriorityQueue<>( (a, b) -> a.c-b.c ); // 小根堆, 根据资金从小到大排序排序。 每次从中取出资金足够的项目, 拿到 大根堆中
    PriorityQueue<Node> maxProfitQ = new PriorityQueue<>( (a,b) -> b.p-a.p ); // 大根堆, 根据利润从大到小排序。 只存放当前资金足以去做的项目
    for (int i = 0; i < Profits.length; i++) {
        minCostQ.add(new Node(Profits[i], Capital[i]));
    }
    for (int i = 0; i < k; i++) { // 最多只允许执行 k 个项目
        while (!minCostQ.isEmpty() && minCostQ.peek().c <= w) { // 取出所有能做的(资金足够)的项目
            maxProfitQ.add(minCostQ.poll()); // 将资金足够的项目加到大跟堆中
        }
        if (maxProfitQ.isEmpty()) {
            return w; // 大根堆为空, 所以不再有项目能够做了, 资金无法再增长
        }
        w += maxProfitQ.poll().p; // 每次制作利润最大的项目, 做完后, 资金都会增加。
    }
}
```

## 🍕 暴力递归

暴力递归就是尝试
- 把问题转化为规模缩小了的同类问题的子问题
- 有明确的不需要继续进行递归的条件(base case)
- 有当得到了子问题的结果之后的决策过程
- 不要求记录每一个子问题的解

【注意⚠️】:
- 初学暴力递归时, 一定不要步子迈得太大。 初学时, 能理解好局部就可以, 即思考一个子问题怎么做就行, 至于全局的内容, 不要去纠结, 不然容易陷入自己的思维陷阱中。如果一开始就想着全局是如何的, 那么很容易走火入魔, 越想越乱。
- 暴力递归就是动态规划的基础。 暴力递归是人的智慧, 动态规划是机器的"智慧"——运行的更快
- 在尝试的过程中, 优先选择可变参数形式最简单, 可变参数更少的试法。
    - 可变参数, 即该尝试的过程中参数值会变的
    - 可变参数形式简单, 就是这个参数使用一个值就可以表达, 别弄出什么链表之类的来表示可变参数。
    - 可变参数形式越简单, 数量越少, 才更容易改成动态规划。


### 案例1 汉诺塔问题

三层塔时, 最优解步骤如下:

```
         ═╬═
      ════╬════
   ═══════╬═══════
──────────┴─────────   ────────────────────   ────────────────────

      ════╬════
   ═══════╬═══════                                     ═╬═
──────────┴─────────   ────────────────────   ──────────┴─────────


   ═══════╬═══════           ════╬════                 ═╬═
──────────┴─────────   ──────────┴─────────   ──────────┴─────────

                                ═╬═
   ═══════╬═══════           ════╬════
──────────┴─────────   ──────────┴─────────   ────────────────────

                                ═╬═
                             ════╬════           ═══════╬═══════
────────────────────   ──────────┴─────────   ──────────┴─────────


         ═╬═                 ════╬════           ═══════╬═══════
──────────┴─────────   ──────────┴─────────   ──────────┴─────────

                                                    ════╬════
         ═╬═                                     ═══════╬═══════
──────────┴─────────   ────────────────────   ──────────┴─────────
                                                       ═╬═
                                                    ════╬════
                                                 ═══════╬═══════
────────────────────   ────────────────────   ──────────┴─────────
```

抽象一下, 从上到下, 圆盘依次是 1, 2, 3, ... i, 我们的目标就是将 1 ~ i 圆盘, 从 from 杆移动到 to 杆上去, 另外一个杆叫做 other。
- 主函数接收四个输入 (i, from, to, other)
- 第一步: 把上面的圆盘 1 ~ (i-1) 从 from 移到 other 上
- 第二步: 把最底下圆盘 i从 from 移到 to 上
- 第三步: 把上面的圆盘 1 ~ (i-1) 从 other 移到 to 上。

算法如下:
```java
void hannoi(int n) {
    if (n > 0) {
        func(n, '左', '右', '中');
    }
}
void func(int i, String from, String to, String other) {
    if (i == 1) { // base case
        print(f'将 {i} 从 {from} 移动到 {to} 上');
    } else {
        // 大象装冰箱分三步
        func(i-1, from, other, to); // 第一步, 将上面的圆盘全部从 from 移到 other 上
        print(f'将 {i} 从 {from} 移动到 {to} 上'); // 第二步
        func(i-1, other, end, start); // 第三步, 将上面的圆盘从 other 移到 to 上。
    }
}

```

### 案例2 打印字符串的全部子序列

对于字符串上的每个位置上的字符, 它们都只有两种情况, 输出 or 不输出。

比如字符串 abc
```
　　　　　　　　　　　　　　　　　　　　　〇　　　　　　　　　　　　　　　　　　　　　
　　　　　　　　　　ａ　　　　　　　　　　　　　　　　　　　　　〇　　　　　　　　　　要 a 和不要 a
　　　　ａｂ　　　　　　　　　ａ〇　　　　　　　　　〇ｂ　　　　　　　　〇〇　　　　　要 b 和不要 b
　ａｂｃ　　ａｂ〇　　　ａ〇ｃ　　ａ〇〇　　　〇ｂｃ　　〇ｂ〇　　　〇〇ｃ　〇〇〇　　要 c 和不要 c
   abc     ab         ac      a         bc      b         c     ''
```

```java

void process1(char[] str, int i, List<Character> res) {
    if (i == str.length) {
        printStr(res); // 每次选择的内容, 都会保存在 res 列表中, 最后输出就行。
        return;
    }

    List<Character> resKeep = copyList(res);
    resKeep.add(str[i]); // 当前是在对 i 位置的字符, 判断是要还是不要
    process1(str, i+1, resKeep);

    List<Character> resNoInclude = copyList(res);
    process1(str, i+1, resNoInclude);

}

// 省点空间的做法, 实现对 str 的复用
void process2(char[] str, int i) {
    if (i == str.length) {
        print(str);
        return;
    }

    process2(str, i+1); // 要当前字符串的路

    char tmp = str[i];
    str[i] = 0;
    process2(str, i+1);  // 不要当前字符的路
    str[i] = tmp; // 改完后又改回去
}

```

### 案例3 打印字符串的全部排列

打印字符串的全部排列, 要求不重复, 可以有两种方法,
- 一种是找出来后再洗数据, 但不推荐。
- 另一种方法是 "分支限界", 即在遍历的过程中, 不可能的分支直接杀死, 不去走。 这种方法只优化了常数时间, 不会改变时间复杂度。

全排列, 比如 abc, 它的全排列为 abc, acd, bac, bca, cab, cba

```java
ArrayList<String> Permutation(String str) {
    ArrayList<String> res = new ArrayList<>();
    if (str == null || str.length() == 0) {
        return res;
    }
    char[] chs = str.toCharArray();
    process(chs, 0, res);
    res.sort(null);
    return res; // 全部排列结果都在 res 里面
}

// str[i..] 范围上, 所有的字符, 都可以在 i 位置上, 后续都去尝试
// str[0..i-1]范围上, 是之前做的选择
void process(char[] str, int i, ArrayList<String> res) {
    if (i == str.length) {
        res.add(String.valueOf(str)); // 所有的字符串形成的全排列, 加入到res里去
    }

    boolean[] visit = new boolean[26]; // 但字符串全部都是小写字符是, 可以利用这张表实现不重复

    for (int j = i; j < str.length; j++) {  // 因为当前位置的值, 已经被前面的每个位置的值都交换过了, 所以不需要再和前面的交换
        // 这种在遍历过程中, 直接杀死不可能分支, 叫做 "分支限界"
        if (!visit[str[j] - 'a']) { // 在尝试前, 要确定该字符还没有尝试过。
            visit[str[j] - 'a'] = true;

            swap(str, i, j); // i 位置上的字符, 可以出现在 i ~ len 的所有位置上     比如 abc, 当前在 0 位置上
            process(str, i+1, res); // 获取 i 在其他位置上的所有情况                   这里将会依次尝试  axx, xax, xxa, 即 a 分别在 0,1,2 位置上
            swap(str, i, j); // 使用完后要将 i 换回去                                 尝试完后, 要把 xxa 换回到 axx

        }
    }
}

```

### 案例4 先手后手

给定一个整型数组arr, 代表数值不同的纸牌排成一条线。
玩家 A 和玩家 B 依次拿走每张纸牌, 规定玩家 A 先拿, 玩家 B 后拿,
但是每个玩家每次只能拿走最左或最右的纸牌, 玩家A和玩家B都绝顶聪明。请返回最后获胜者的分数。

举例:
- 假设 arr=[1,2,100,4]。 开始时, 玩家 A 作为绝顶聪明的人不会先拿 4, 因为拿 4 之后, 玩家 B 将拿走 100。所以玩家 A 会先拿 1 让排列变为 [2,100,4],
- 假设 arr=[1,100.2]。开始时, 玩家 A 不管拿 1 还是 2, 玩家 B 作为绝顶聪明的人, 都会把 100 拿走。 玩家 B 会获胜分数为 100。所以返回 100。

```java
int win1(int[] arr) {
    if (arr == null || arr.length == ) {
        return 0;
    }
    // 查看先手和后手谁会赢, f 是先手, s 是后手
    return Math.max(f(arr, 0, arr.length-1), s(arr, 0, arr.length-1))
}
// 先手时, 在 i到j 范围内能拿到的最大值
int f(int[] arr, int i, int j) {
    if (i == j) {
        return arr[j];
    }
    // 当前回合是先手, 下一回合就肯定是后手, 先手时有两种情况: 取出最左的, 或者取出最右的
    return Math.max( arr[i]+s(arr,i+1, j), arr[j]+s(arr,i,j-1) )
}
// 后手时, 能拿到的情况
int s(int[] arr, int i, int j) {
    if (i == j) {
        return 0;
    }
    /*  如果先手选择的是左侧, 那么后手就只能拿到 [i+1, j] 范围上的最大值
        如果先手选择的是右侧, 那么后手就只能拿到 [i, j-1] 范围上的最大值
        也就是说, 后手能拿到什么值是由先手决定的。
        先手作为绝对聪明的人, 肯定会让我在两个最大值之间, 选择一个最小的, 这样先手才能赢。
        所以这里返回的是 Math.min(), 拿到最小值不是后手决定的, 而是先手决定的, 所以是返回最小的
        后手拿到的 "最大值" 体现在后手下一轮变成 "先手" 的情况。
      */
    return Math.min( f(arr, i+1, j), f(arr, i, j-1) )
}

```

### 案例5 逆转栈

给你一个栈，请你逆序这个栈，不能申请额外的数据结构/空间，只能使用递归函数如何实现?

【注意】: 只是说明自己不能申请额外的数据结构/空间, 但并不代表整个程序的使用过程中不会新创建一个数据结构/空间。 所以可以利用递归来实现。

```java
void reverse(Stack<Integer> stack) {
    if (stack.isEmpty()) {
        return;
    }
    // 逆转栈分三步
    int i = f(stack); // 第一步, 先弹出栈底元素
    reverse(stack); // 第二步, 将栈的剩余元素反转
    stack.push(i); // 第三步, 将栈底元素压入栈顶
}
int f(Stack<Integer> stack) {
    int result = stack.pop(); // 弹出栈顶元素
    if (stack.isEmpty()) {
        return result; // 如果为空, 说明该元素是栈顶元素, 是我们想要的, 所以直接返回
    } else {
        // 不为空, 说明栈中还有一个元素。 利用递归来保存当前弹出的元素, 即创建递归, 让递归函数去帮你找栈底元素, 同时自己也能保留 result 变量
        int last = f(stack); // 调用递归, 让他找到栈底元素返回返回
        stack.push(result); // 找到栈低元素了, 然后将原来的弹出的元素再弹回去, 因为 f 函数需要不能改变栈的情况下返回栈底元素
        return last; // 返回栈底元素; 人外有人, 天外有天, 你调用 f 递归函数, 让别人帮你找栈底元素, 但你自己又何尝不是别人的递归函数呢?
    }
}

```

### 案例6 数字转26进制所有结果

规定1和A对应、2和B对应、3和C对应.
那么一个数字字符串比如”111"，就可以转化为”AAA”、“KA"和”AK”给定一个只有数字字符组成的字符串str，返回有多少种转化结果。

```java
// 当前面的 [..., i] 位置是固定的时候, 更改 [i, ..] 位置上的转换, 有多少种转换结果
int process(char[] str, int i) {
    if (i == str.length) {
        return 1; // i 超出数组范围了, 则说明前面固定的转换结果是有效的, 这算作一种转换结果
    }
    if (str[i] == '0') {
        return 0; // 如果前面转换结果. 会导致有 0 开头的数字, 则说明这种转换不是合法的转换, 所以直接是 0 中转换结果
                //  注意, 因为我们这个函数, 只能查看 [i, ..] 后面有多种中结果, 所以 0 开头的数字, 肯定是错误的转换结果
    }
    if (str[i] == '1') {
        // 以 1 开头的数字, 可以有两种转换方式
        int res = process(str, i+1); // 第一种, 直接把 1 当成 a, 查看这种转换, 能有多少种转换结果
        if (i+1 < str.length) {
            res += process(str, i+2); // 第二种, 直接把 1x 当成某个字母, 查看这种转换能有多少种转换结果
        }
        return res;
    }
    if (str[i] == '2') {
        // 和 1 同理, 只不过 2 允许的后一个数字只能是 [0, 6]
        int res = process(str, i+1);
        if (i+1 < str.length && ('0' <= str[i+1] && str[i+1] <= '6' )) {
            res += process2(str, i+1);
        }
        return res;
    }
    // 如果当前位置是 [3-9], 则只有一种转换结果, 然后再查看固定了当前位置的转换结果后, 右侧剩下的位置有多少种结果, 故调用 process。
    return process(str, i+1);
}
```

### 案例7 暴力背包

给定两个长度都为 N 的数组 weights 和 values,
weights[i] 和 values[i] 分别代表 i 号物品的重量和价值。
给定一个正数 bag, 表示一只袋子允许的最大重量, 你装的物品不能超过这个重量。
返回你能装下最多的价值是多少?

```java
// 这个函数就是返回的是, 给我第 i 个物品时, 这个物品能产生的最大价值
int process1(int[] weights, int[] values,
    int i, int alreadyWeight, int bag
    // 之前做的决定所造成的重量就是 alreadyWeight
    //      这个决定可能是 装入物品 i, 那么 alreadyWeight 就 包含 i 物品重量
    //      也可能是 不装入物品 i, 那么 alreadyWeight 就不包含 i 物品重量
) {
    if (alreadyWeight > bag) { // 如果之前的决定导致重量超重了, 那么不用判断是否装入 i 物品了, 直接返回价值 0
        return 0;
    }
    if (i == weights.length) { // 如果要装的物品是 空, 那么也不会获得价值
        return 0;
    }
    return Math.max(
        // 不装入 i+1 物品时能获得的最大价值:  交给 看看是否装入 i+1 号获去决定
        process1(weights, values, i+1, alreadyWeight, bag),

        // 装入 i 物品时能获得的最大价值:  则在 i 物品价值的基础上, 再加上添加了 i+1 号物品的最大价值
        values[i] + process1(weights, values, i+1,
            alreadyWeight+weights[i], bag) // 加上了 i 号货, 所以要加重量
    )
}

// 获取换种写法, process2 是给我 i 号物品, 能获得的最大价值。 上一种写法更好, 因为上一种写法可变参数少(没有 alreadyValue)
int process2(int[] weights, int[] values,
    int i, int alreadyWeight, int alreadyValue, int bag
) {
    if (alreadyWeight > bag) {  // 一旦超重, 前面的安排就是没有意义的, 所以总价值是 0
        return 0;
    }
    if (i == weights.length) {
        return alreadyValue; // 返回的是最大价值, 而不是当前 i 物品能生成的最大价值, 所以直接返回当前最大价值
    }
    Math.max(
        // 不添加 i 物品时的能获取的最大价值
        process2(weights, values, i+1, alreadyWeight, alreadyValue,  bag)
        // 添加 i 物品时的能获取的最大价值
        process2(weights, values, i+1, alreadyWeight + weights[i], alreadyValue + values[i],  bag)
    )

}


int maxValue2(int[] c, int[] p, int bag) {
    int[][] dp = new int[c.length + 1][bag + 1];
    for (int i = c.length  - 1; i >= 0; i--) {
        for (int j = bag; j >= 0; i--) {
            dp[i][j] = dp[i+1][j];
            if (j + c[i] <= bag) {
                dp[i][j] = Math.max(dp[i][j], p[i]+dp[i+1][j+c[i]]);
            }
        }
    }
}
```

### 案例8 N 皇后问题

N 皇后问题是指在 N*N 的棋盘上要摆 N 个皇后, 要求任何两个皇后不同行、不同列也不在同一条斜线上。
给定一个整数n, 返回n皇后的摆法有多少种。
- n=1, 返回1。 只有一个格子一个皇后。
- n=2或3, 返回0。 因为 2x2 格子中两个皇后不管怎么放都会同行或同列或同斜线。 3x3 格子也一样。
- n=8, 返回 92。

N 皇后的时间复杂度是 O(N^2), 时间复杂度是没法优化的, 但是常数时间复杂度可以优化。
思路就是利用位运算的特性, 来检查放置的皇后是否合法, 这比起使用数组一列一列的查, 快得多。

```java
int num1(int n) {
    if (n < 1) {
        return 0;
    }
    // 下标表示行号, 同时也是第一个皇后, 也就是说, 第 i 个皇后一定放在第 i 行
    // 元素值表示列号。 比如 record[0] = 0 表示第 0 个皇后放在第0行第0列。
    int[] record = new int[n];
    return process1(0, record, n); // 从第 0 行开始
}
// i 表示当前来到第几行
// record[..., i-1] 表示之前的行, 皇后的位置列号, 并且都是合法的, 即这些皇后都是不同行同列同斜线
// n, 即 n 皇后, 不过因为我们是从 0 计数的, 所以准确的将只有 n-1 个皇后。 n 的含义是终止行, 即到达这一行就不能继续了。 因为皇后已经摆放完了
int process1(int i, int[] record, int n) {
    if (i == n) { // 如果能来到终止行, 说明前 n-1 行的皇后都有了合法的位置, 说明决策过程结束, 这是一种合法摆放的方式
        return 1; // 返回 1, 表示找到一种合法的方式
    }
    int res = 0;
    for (int j = 0; j < n; j++) {
        // 判断当前 i 行的皇后, 放在 j 列, 会不会和之前 (..i-1) 的皇后, 共行共列或者共斜线,
        if (isValid(record, i, j)) {
            record[i] = j; // 可以放, 则放
            res += process1(i + 1, record, n); // 同时继续查看这种方式下还有多少种摆放方式
            // 注意这里不要 break, 因为还有其他的列没尝试
        }
    }
    return res;
}

// 判断 如果第i行j列放了皇后, 是否合法
boolean isValid(int[] record, int i, int j) {
    for (int k = 0; k < i; k++) { // 只需要看 [0..i-1] 行的皇后是否满足
        // 只需判断是否同列, 或者同斜线。 因为不同皇后一定放在不同行, 所以不需要判断是否同行。
        if (j == record[k] || Math.abs(record[k] - j) == Math.abs(i - k)) {// 行号的差值和列号的差值相同, 说明同斜线
            return false;
        }
    }
    return true;
}


int num2(int n) {
    if (n < 1 || n > 32) { // 因为 int 是 4 字节 32 位的, 所以超出 32 的不处理
        return 0;
    }
    // 这个 limit 是用来限制那些位上可以用来尝试放皇后的, 比如 8 皇后, 则从右到左连续 8 位都是 1
    int limit = n == 32? -1 : (1 << n) - 1;
    return process2(limit, 0, 0, 0); // 初始值没有任何限制, 所以后三个参数都是 0
}
int process2(int limit,
    // 这三个参数, 只使用它们的位信息, 具体的十进制值是没有意义的。 位上为 1 表示被限制, 即这个位置上不能放皇后, 不然会和其他行的皇后同行同列同斜线
    int colLim, // 表示列限制
    int leftDiaLim, // 表示左斜线的限制
    int rightDiaLim // 表示右斜线的限制
) {
    if (colLim == limit) { // 达到 limit 时, 说明所有列上都放了皇后, 表示找到一种合法的放置方式
        return 1;
    }
    int mostRightOne = 0;

    // colLim | leftDiaLim | rightDiaLim 得到的是总的限制, 即这些位上放皇后会导致同列或同斜线
    // colLim | leftDiaLim | rightDiaLim 位上的信息是, 1 表示被限制, 0 表示不被限制
    // limit & (~ (总线制)), 这个过程是在将有效位上的信息, 0 变成 1, 1 变成 0。
    // 那不应该是直接 ~ 就可以了嘛, 还要再 & 上 limit 是因为我们不能改变左侧的无效位的信息
    int pos = limit & (~ (colLim | leftDiaLim | rightDiaLim) );
    // 所以 pos 上, 1 表示可以放皇后, 0 表示不可以放, 含义颠倒过来了

    int res = 0;
    while (pos != 0) {
        // 提取出最右侧第一个为 1 的值, 即从右侧查看第一个能放置皇后的位置是哪个位置
        mostRightOne = pos & (~pos + 1);
        // 每个位置尝试后, 就要把这个位置上的 1 变成 0, 所以直接减去。 当全部尝试完的时候 pos 就会是 0, 表示所以可尝试的位置都尝试了
        pos = pos - mostRightOne;
        // 递归
        res += process2(limit,  // limit 是不变的
            colLim | mostRightOne, // 每次尝试的是 mostRightOne 位置上放皇后, 所以下一个皇后的列限制, 就会多上 mostRightOne 这个位置
            (leftDiaLim | mostRightOne) << 1,  // 更新左斜线的限制
            (rightDiaLim | mostRightOne) >>> 1 // 更新右斜线的限制, 注意是无符号, 因为是 32 位都有在用。
            )
    }

}
```