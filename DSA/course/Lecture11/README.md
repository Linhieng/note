## 🍕 树型 DP

如果一个题目，能够通过向左子树有一个信息，向右子树要一个信息，然后就能得出我们想要的信息。那么这个题目就可以使用树型 DP 来解决

### 案例1 求一棵树的最大距离

【思考】：
- 最大距离有两种
    - 这个距离需要通过头节点
    - 这个距离不需要通过头节点
- 当距离不需要通过头节点时，这个最大距离就是左右两个子树的最大距离
- 当距离通过头节点时，这个距离就是左子树的最大高度＋右子树的最大高度＋１。
- 所以，我们只需要向两边的子树要两个信息:
    - 最大距离是多少
    - 最大高度是多少
- 然后我们从　“左子树的最大距离”　、　“右子树的最大距离”　和　“左右子树的最大高度＋１”　中找出最大值，这个最大值就是当前头节点的最大距离。

这种套路 —— 根据　“头节点”　是否参与这个过程，来列举出所有的可能性。在树型ＤＰ中是非常常见的。

```java
Info process(Node x) {
    if (x == null) {
        return new Info(0, 0);
    }
    Info leftInfo = process(x.left);
    Info rightInfo = process(x.right);
    int p1 = leftInfo.maxDistance;
    int p2 = rightInfo.maxDistance;
    int p3 = leftInfo.height + 1 + rightInfo.height;
    int maxDistance = max(p1, p2, p3);
    int height = Math.max(leftInfo.height, rightInfo.height) + 1;
    return new Info(maxDistance, height)
}
```

### 案例2 最大快乐值

派对的最大快乐值。
每一个员工都有两个属性：
- 本身的快乐值属性
- 他的直接下属
现在对一个公司的所有员工发请帖，但是要遵循如下规则：
- 如果邀请了一个员工，则不能再邀请该员工的直接下级（间接下级可以邀请）
- 在满足条件1的情况下，邀请的员工一定回来
问如何邀请，能获得最大快乐值——所有来的员工的快乐值累加

【分析】：
- 还是前面的套路，这就是一棵树，虽然是多叉树，但原理是一样的。分析头节点参不参与，可以得出两种可能性
    - 如果头节点参与，则它的最大快乐值是该节点的快乐值，加上所有子节点不参与的最大快乐值
    - 如果头节点不参与，则每个子节点都可以参与，也可以不参与，所以要比较子节点（直接下级）参与时的最大的快乐值和不参与时的最大快乐值。
- 最后，获取根节点的最大快乐值，比较根节点参与的最大快乐值和不参与的最大快乐值，然后返回
- 最大快乐值，其实就是最大收益，换汤不换药。
- 所以，每个头节点需要向每个子节点要以下信息：
    - 参与时的最大收益（最大快乐值）
    - 不参与时的最大收益（最大快乐值）
- 然后头节点根据子节点的信息，整合出自己要返回的信息
    - 头节点参与，则最大收益是所有子节点不参与时的最大快乐值累加
    - 头节点不参与，则最大收益是 max(子节点参与时的快乐值, 子节点不参与时的最大快乐值)。

```java

class Employee {
    int happy; // 该员工的快乐值（ 收益）
    List<Employee> nexts; // 该员工的直接下级（多个子节点）
}
class Info {
    int comeMaxHappy; // 参加时，能获得的最大快乐值（最大收益）
    int noComeMaxHappy; // 不参加时，能获得的最大快乐值（最大收益）
}
int maxHappy(Employee boss) {
    Info headInfo = process(boss);
    return Math.max(headInfo.comeMaxHappy, headInfo.noComeMaxHappy);
}
Info process(Employee x) {
    if (x.nexts.isEmpty()) {
        // x 是基层员工（叶子节点）时，如果参加，则最大快乐值（最大收益）就是自己的快乐值，不参加，则最大快乐值是０。
        return new Info(x.happy, 0);
    }
    int come = x.happy; // x 参加，以 x 为头节点能获取的最大值
    int no = 0; // x 不参加，以 x 为头节点能获得的最大值
    for (Employee next: x.nexts) {
        Info nextInfo = process(next);
        come += nextInfo.noComeMaxHappy; // x 参加，则直接下级一定不能参加
        no += Math.max(nextInfo.comeMaxHappy, nextInfo.noComeMaxHappy);　// x 不参加，则直接下级可以参加，也可以不参加。
    }
    return new Info(come, no);
}
```

## 🍕 Morris 遍历

【Morris 遍历】：一种遍历二又树的方式，并且时间复杂度 O(N)，额外空间复杂度O(1)。
【核心】： 通过利用原树中大量空闲指针的方式，达到节省空间的目的。

【递归遍历的本质】： 能够回到一个节点三次！

【Morris 遍历的本质】： 能够回到一个节点两次

【说明】: 每一个叶子节点都有两个空指针，借助这些空指针指回头节点，我们就能够到达一个节点两次。

【步骤】:
- 假设当前来到节点 cur
- 如果 cur 没有左孩子，则 cur 向右移动
- 如果 cur 有做孩子。 则先找到左子树上的最右节点 mostRight（注意我们这里逻辑上描述是找到最右节点，但代码中不是简单的循环判断右节点是否为空就可以的，还要加上右节点不为 cur 的情况。）
    - 如果 mostRight 的右节点指向空，则让他指向 cur。（这代表是第一次来到 cur）。然后　cur 向左移动。
    - 如果 mostRight 的右节点不为空（或者说 mostRight 等于 cur ，这样也许更容易理解），则当前是第二次来到 cur，故需要将右子节点的右指针指向空。因为这个是我们之前设置的
- 不断遍历，直到 cur 为空。
- 单纯只看不画，肯定是看不懂的，自己用纸画一下就很清楚了。当第一次把左子树的最右节点指向 cur 后，下一次再遍历最右节点时，在纸上你可以很轻松的知道最右节点不能再往上走。但是在程序上你就需要通过一个判断条件来判断了，这个判断条件就是 mostRight != cur 。不然你的程序走到最右节点后，会直接就往上走到 cur 了。

```java
void morris(Node head) {
    if (head == null) {
        return ;
    }
    Node cur = head;
    Node mostRight = null;
    while (cur != null) { // 遍历，知道 cur 为空，则表示遍历完整棵树了
        mostRight = cur.left;
        if (mostRight != null) { // 如果当前 cur 有左子树
            while (mostRight.right != null && mostRight.right != cur) { // 则找到左子树上最右的节点 mostRight 。 注意这里还有一个判断条件是往右走时，右子节点不能等于 cur
                mostRight = mostRight.right;
            }
            // 找到 cur 的左子树最右节点后
            if (mostRight.right == null) { // 如果最右节点的右指针是空，说明当前是第一次到达 cur 节点
                mostRight.right = cur; // 让最右节点的右指针指向 cur，这样就能确保回到 cur
                cur = cur.left; // cur 往左移动
                continue
            } else { // 这里也可以写成 mostRight.right == cur 。原因是前面的 while 循环限定死了我们的条件。
                // 如果最右节点的右指针不是空，说明当前 最右节点的右指针一定是指向 cur，即这是第二次来到 cur
                mostRight.right = null; // 修改回去
            }
        }
        // 只有当 cur 是第二次来的时候，才会向右移动。
        cur = cur.right; // cur 往右移动。
    }
}
```

看完上面说明和代码，空间复杂度很好理解，但可能会怀疑时间复杂度，因为每一次都会遍历左子树的最右边界。
那就计算一下，对整个树的每一个节点，都遍历它的左子树的最右边界，你会发现每一个节点的遍历过程，他们走的的节点都是不重的。
所以所有节点遍历左子树的最右边界的总代价是 O(N) 水平的。而每一个节点都会回到自己两次（叶子节点除外），所以总的代价也就是 3N，故时间复杂度是 O(N) 的。

### 先序遍历

【步骤】:
- 只能到达一次的节点（叶子节点），直接打印
- 能到达两次的节点，在第一次到达时打印

原理很简单，第一次到达时，说明肯定还没有遍历左右。因为是先序，所以先打印。
而如果只能到达一次的节点（或没有左子节点的节点），则说明它就是“头”，所以直接打印。

```java
void morrisPre(Node head) {
    if (head == null) {
        return ;
    }
    Node cur = head;
    Node mostRight = null;
    while (cur != null) {
        mostRight = cur.left;
        if (mostRight != null) {
            // 如果 cur 有左子节点，说明我一定能够再次回到该节点
            while (mostRight.right != null && mostRight.right != cur) {
                mostRight = mostRight.right;
            }
            if (mostRight.right == null) {
                // 先序遍历，就是在第一个到达的时候打印
                print(cur.value);
                mostRight.right = cur;
                cur = cur.left;
                continue
            } else {
                mostRight.right = null;
            }
        } else {
            // 如果 cur 没有左孩子，说明 cur 一定是叶子节点，直接打印
            print(cur.value);
        }
        cur = cur.right;
    }
}
```

### 中序遍历

【步骤】:
- 只能到达一次的节点（叶子节点），直接打印
- 能到达两次的节点，在第二次到达时打印

原理也很简单，因为第一次到达时，说明肯定还没有遍历左右，所以不能打印。
第二次到达时，说明只遍历了左子树 —— 因为有左子树时我们指回往左走，不会往右走（对应代码中的　ｃｏｎｔｉｎｕｅ）。
所以第二次到达时打印。然后该节点会继续走右子树。

```java
void morrisIn(Node head) {
    if (head == null) {
        return ;
    }
    Node cur = head;
    Node mostRight = null;
    while (cur != null) {
        mostRight = cur.left;
        if (mostRight != null) {
            // 如果 cur 有左子节点，说明我一定能够再次回到该节点
            while (mostRight.right != null && mostRight.right != cur) {
                mostRight = mostRight.right;
            }
            if (mostRight.right == null) {
                mostRight.right = cur;
                cur = cur.left;
                continue
            } else {
                // 能到达两次的节点，在第二次到达时打印
                print(cur.value);
                mostRight.right = null;
            }
        } else {
            // 如果 cur 没有左孩子，说明 cur 一定是叶子节点，直接打印
            print(cur.value); // 只能到达一次的节点（叶子节点），直接打印
        }
        // 也可以在这里打印，此时上面的两行 print 就不需要了。
        cur = cur.right;
    }
}
```

```py
def morrisIn(root):
    if root is None:
        return
    cur = root
    while cur is not None:

        if cur.left is not None:
            most_right = cur.left
            while most_right.right is not None and most_right.right is not cur:
                most_right = most_right.right
            if most_right.right is None: # 第一次到达
                most_right.right = cur
                cur = cur.left
                continue
            # 第二次到达
            most_right.right = None
        print(cur.data)
        # 当左子节点为空的时候， most_right.right = cur 保证了此时右节点是向上指的
        cur = cur.right
```

### 后序遍历

【步骤】:
- 只能到达一次的节点（叶子节点），不打印（无操作）
- 能到达两次的节点，在第二次到达时，逆序打印其左子树的右边界。当遍历完成后，再次打逆序印根节点的右边界

后序遍历需要一点 trick ，但实际上也不复杂，和中序遍历差不多，只不过打印时是慢一拍，并且是逆序。
在第二次时打印打印其左子树，确保的是左边先打印。逆序右边界打印，确保的是右边先打印，然后再头。
而想要不借助额外空间实现逆序打印也很简单 —— 逆序链表。

```java
void morrisPos(Node head) {
    if (head == null) {
        return ;
    }
    Node cur = head;
    Node mostRight = null;
    while (cur != null) {
        mostRight = cur.left;
        if (mostRight != null) {
            // 如果 cur 有左子节点，说明我一定能够再次回到该节点
            while (mostRight.right != null && mostRight.right != cur) {
                mostRight = mostRight.right;
            }
            if (mostRight.right == null) {
                mostRight.right = cur;
                cur = cur.left;
                continue
            } else {
                // 可以在这里打印，或者出了 if 后再打印
                mostRight.right = null;
                // 慢一拍打印左子树，确保左边先打印
                printEdge(cur.left); // 逆序打印右边界，确保先右再头。
            }
        }
        // 只有当第二次到达 cur 后， cur 才会往右走。
        cur = cur.right;
    }
    // 最后再打印一遍根节点的右边界。
    printEdge(head);
}

// 逆序打印头节点为 X 的树的右边界
void printEdge(Node X) {
    Node tail = reverseEdge(X);
    Node cur = tail;
    while (cur != null) {
        print(cur.value + ' ');
        cur = cur.right;
    }
    reverseEdge(tail);
}
// 逆序右边界 —— 逆序链表
Node reverseEdge(Node from) {
    Node pre = null;
    Node next = null;
    while (from != null) {
        next = from.right;
        from.right = pre;
        pre = from;
        from = next;
    }
    return pre;
}
```

morris 经典案例 —— 判断是否是搜索二叉树。
因为判断搜索二叉树需要中序遍历，而 morris 可以不借助额外空间中序遍历。
并且！判断搜索二叉树本质上只需要前后两个值，所以使用 morris 是最优解。

通过这一个也可以得出，当需要在　“第三次”　回到节点做信息的强整合时，树型 DP 是最优解。
如果不需要强整合，则可以考虑 morris 遍历。

## 🍕 大数据

32位无符号整数的范围是0~4,294,967,295，现在有一个正好包含40亿个无符号整数的文件，所以在整个范围中必然存在没出现过的数。可以使用最多1GB的内存，怎么找到所有未出现过的数?
【进阶】：内存限制为 3KB，甚至几个有限变量，但是只用找到一个没出现过的数即可。

【原问题 - 位图求解】： 无符号整数范围是 0~$2^{32}$，我们只保存这个范围，则只需要 $\frac{2^{32}}{8}$ = $2^29$，即差不多 500M 的空间。
然后分批次遍历 40 亿个数字，将它们对应位置上的位 “涂黑”，最后结束时，没有被涂黑的位的下标，就是没有出现过的数字。

【进阶问题求解】:
- 首先，用 3KB 全部拿来创建无符号整型的数组，要求数组长度是 2 的幂次方，则这个数组长度最大将会是 $\frac{3000}{4}$ = 750 ≈ 512 = $2^9$。
- 有了 $2^9$ 长度的大小的数组后，计算 $\frac{2^{32}}{2^9}$ = $2^{23}$ = 8388608 。 这个数字就是词频统计的范围，即：
    - 数组的 0 位置统计 0~8388608 范围内有多少个数字；
    - 数组的 1 位置统计 8388609~16777217 范围内有多少个数字；
    - 数组的 2 位置统计 16777217~2*x-1 范围内有多少个数字。
- 然后，我们遍历 40 亿个数字，将每个数字除以 8388608，就能得到一个下标值，这个下标就是该数字所在的范围，将数字上的对应下标的值加 1
- 遍历一遍后，就可以得到每个范围内的词频。由于一定存在不重复的数字，所以选取词频统计最少得那个范围。
- 对那个范围继续进行 512 份划分，重复上面的步骤。继续遍历 40 亿个数字，只不过这一次我们只在乎最小词频范围内的数字，即只统计某一个范围内的词频。
- 统计结束后，一定又会有某个范围词频最小，继续对该范围 512 份划分。
- 最终肯定能够找到一个没出现过的数字。

更极端点，只用有限几个变量，每次都二分，每次二分后再次遍历 40 亿个数字，最多只需要遍历 32 次，就能找到没出现过的数字。