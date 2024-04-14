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
