## 🍕 二叉树

### 搜索二叉树 BST

搜索二叉树 BST(Binary Search Tree): 对于任一子树, 左子树上**所有**节点的值 < 父节点的值, 右子树上**所有**节点的值 > 父节点的值。
经典的搜索二叉树, 是没有重复值的, 所以这里的判断没有等号。

判断搜索二叉树: 中序遍历, 都是升序, 没有降序, 则满足搜索二叉树

```java
// 用一个数, 判断中序遍历过程中是否是升序
int preValue = Integer.MIN_VALUE;

public static boolean checkBST(Node head) {
    if (head == null) {
        return true;
    }
    boolean isLeftBst = checkBST(head.left);
    // 中序遍历时, 这里的 打印 变成了 比较是否升序
    if (!isLeftBst) {
        return false;
    }
    if (head.value <= preValue) { // 不是升序
        return false;
    } else {
        preValue = head.value; // 更新
    }
    return checkBST(head.right);
}

// 最简单的理解代码
boolean checkBST2(Node head) {
    List<Node> inOrderList = new ArrayList<>();
    process2(head, inOrderList);
    if inOrderList 不是升序
        则不是搜索二叉树
}
void process2(Node head, List<Node> inOrderList) {
    if (head == null) return;
    process2(head.left, inOrderList);
    inOrderList.add(head);
    process2(head.right, inOrderList);
}

// 非递归代码
boolean checkBST3(Node head) {
    if (head != null) {
        int preValue = Integer.MIN_VALUE;
        Stack<Node> stack = new Stack<Node>();
        while (!stack.isEmpty() || head != null) {
            if (head != null) {
                stack.push(head);
                head = head.left;
            } else {
                head = stack.pop();
                // 特殊时刻 BEGIN
                if (head.value <= preValue) {
                    return false;
                } else {
                    preValue = head.value
                }
                // 特殊时刻 END
                head = head.right;
            }
        }
        return true;
    }
}
```

```py
def is_valid_BST1(root):
    # 存储中序遍历的结果
    inorder_list = []
    inorder(root, inorder_list)
    for i in range(1, len(inorder_list)):
        if inorder_list[i] <= inorder_list[i-1]:
            return False
    return True


def inorder(root, inorder_list):
    if root is None:
        return
    inorder(root.left, inorder_list)
    inorder_list.append(root.val)
    inorder(root.right, inorder_list)


def is_valid_BST2(root):
    # 传递地址
    pre_value = [None]
    return process(root, pre_value)


def process(root, pre_value):
    if root is None:
        return True
    # 先判断左侧是不是 BST
    is_left_BST = process(root.left, pre_value)
    if not is_left_BST:
        return False

    # 判断是否升序
    if pre_value[0] is None:
        pre_value[0] = root.val
    elif pre_value[0] >= root.val:
        return False
    else:
        pre_value[0] = root.val

    # 接着判断右侧是否是 BST
    return process(root.right, pre_value)


def is_valid_BST3(root):
    if root is None:
        return
    stack = []
    p = root
    pre_value = None
    while len(stack) != 0 or p is not None:
        if p.left is not None:
            stack.append(p)
            p = p.left
        else:
            p = stack.pop()

            # 判断是否升序
            if pre_value is None:
                pre_value = p.val
            elif pre_value >= p.val:
                return False
            else:
                pre_value = p.val

            p = p.right
    return True
```

### 完全二叉树 CBT

完全二叉树 CBT(Complete Binary Tree): 除了最后一层外, 其他所有层的节点都被填满, 并且最后一层节点都靠左排列。 (只允许最后一层出现右侧缺口)。

【判断方式】:
- 采用层序遍历
- 条件1: 任一节点, 如果没有左子节点却有右子节点, 直接返回 false
- 条件2: 在条件1没有违规过的前提下, 一旦遇到子节点未被填满, 则之后的层序遍历只允许出现叶节点, 否则返回 false

```java
boolean isCBT(Node head) {
    if (head == null) {
        return true;
    }
    LinkedList<Node> queue = new LinkedList<>();
    queue.add(head);

    // leaf 表示事件已经是否发生。 这个事件是: 遇到子节点未被填满
    boolean leaf = false; // leaf 只会被改成 true, 没有 将 leaf 改为 false 的操作
    Node l = null;
    Node r = null;

    while (!queue.isEmpty()) {
        head = queue.poll();
        l = head.left;
        r = head.right;
        if (
            (l == null && r != null) // 条件1: 不允许出现 左空右不空 的情况
            ||
            (leaf && (l != null || r != null)) // 条件2: leaf 是开关, 一旦开启则要求只允许出现叶节点
         ) {
            return false
         }
        if (l != null) queue.add(l);
        if (r != null) queue.add(r);
        if (l == null || r == null) { // 其实这里只判断 r 就可以了, 因为在能走到这里说明满足条件1没有违规
            leaf == true; //
        }
    }
    return true;
}
```

### 满二叉树 FBT

满二叉树 FBT(Full Binary Tree), 对于任一子树, 他都有两个左右两个子节点(最后一层是叶节点)。

【我的代码】: 层序遍历, 统计节点数和层数。
```py
def is_full_binary_tree2(root):
    queue = Queue()
    queue.put(root)

    deep = 0
    nodes = 0
    cur_end = root
    next_end = None

    while not queue.empty():
        p = queue.get()
        nodes += 1
        if (p.left is None and p.right is not None) or (p.left is not None and p.right is None):
            return False
        if p.left is not None:
            next_end = p.left
            queue.put(p.left)
        if p.right is not None:
            next_end = p.right
            queue.put(p.right)
        if p is cur_end:
            cur_end = next_end
            next_end = None
            deep += 1
    return nodes == (1<<deep)-1
```

### 平衡二叉树( AVL 树)

平衡二叉树. 又名 AVL 树:  对于任一子树, 其左子树和右子树的高度差不超过1。
约定空树是二叉树。

【注意:】, 是每一颗子树都要满足高度差不超过 1, 而不是根节点的两个子树满足就行。

```py
"""
- 是否是平衡二叉树
- 高度
"""
def is_balanced_binary_tree(root):
    return is_balanced(root)[0]

def is_balanced(head):
    if head is None:
        return (True, 0)
    l_is_AVL, l_height = is_balanced(head.left)
    if False == l_is_AVL:
        return (False, None)

    r_is_AVL, r_height = is_balanced(head.right)
    if False == r_is_AVL:
        return (False, None)

    is_AVL = True
    height = 1 + max(l_height, r_height)
    if abs(l_height - r_height) > 1:
        is_AVL = False

    return (is_AVL, height)
```

### 二叉树递归套路

判断二叉树是否满足某一类型时, 条件经常是 "任一子树", 根据这个可以总结出判断二叉树类型的递归套路:
- 获取左右子树的信息
- 利用左右子树的信息, 来生成自己本身的信息
- base case。 终止递归的条件。

这个递归套路, 其实就是动态规划, 在解决复杂的 树型DP(dynamic programming) 非常有用。

什么情况下能使用这个套路?
当你想要需求, 能够通过左子树的信息和右子树的信息求解出来时, 就可以考虑使用套路。
【反例】: 求解中位数, 获取左子树的中位数和右子树的中位数, 并无法求出当前节点子树的中位数。 这种问题就无法使用这个套路来解决。 不过这种问题大多数是难以优化的题目, 所以很少考。

前面介绍的 搜索二叉树, 满二叉树, 平衡二叉树 的判断都是可以利用这个套路来解决的:

#### 平衡二叉树

【需要的信息】:
- 该子树的是不是平衡二叉树
- 该子树的高度

【是平衡二叉树的条件】:
- 左子树是平衡二叉树
- 右子树是平衡二叉树
- 左右子树高度差 <= 1

```java
// 递归判断
boolean isBalanced(Node head) {
    // 判断一棵树是不是平衡二叉树, 只需要问 头节点 是不是平衡二叉树
    return process(head).isBalanced
}
class ReturnType {
    boolean isBalanced;
    int height;
    ReturnType(boolean isB, int hei) {
        isBalanced = isB;
        height = hei;
    }
}
ReturnType process(Node x) {
    if (x == null) {
        return new ReturnType(true, 0);
    }
    // 返回左子树的信息
    ReturnType leftData = process(x.left)
    // 返回右子树的信息
    ReturnType rightData = process(x.right)
    // 利用左右子树返回的信息, 来获取当前节点的信息
    int height = 1 + Math.max(leftData.height, rightData.height); // 当前节点的高度信息
    int height_diff = Math.abs(leftData.height - rightData.height) // 两棵子树高度差
    boolean isBalanced = leftData.isBalanced && rightData.isBalanced && height_diff < 2 // 当前节点是否是平衡二叉树
    // 返回当前节点 x 的信息
    return new ReturnType(isBalanced, height)

}
```


#### 搜索二叉树

【需要的信息】:
- 该子树是否是搜索二叉树
- 该子树的最大值
- 该子树的最小值

【是搜索二叉树的条件】:
- 左子树是搜索二叉树
- 右子树是搜索二叉树
- 左子树最大值 < 当前节点值
- 当前节点值 < 右子树最小值

【老师代码】:
```java
class ReturnData {
    boolean isBST;
    int min;
    int max;
    ReturnData(boolean is, int mi, int ma) {
        isBST = is;
        min = mi;
        max = ma;
    }
}

ReturnData process(Node x) {
    if (x == null) {
        // 空结点要返回的信息比较, 那么直接返回 null。
        // 但这样做的话, 在拿到信息的时候就需要判断是否是 null
        return null;
    }

    // 获取左右子树的信息
    ReturnData leftData = process(x.left);
    ReturnData rightData = process(x.right);

    int min = x.value;
    int max = x.value;
    if (leftData != null) {
        min = Math.min(min, leftData.min)
        max = Math.max(max, leftData.max)
    }
    if (rightData != null) {
        min = Math.min(min, rightData.min)
        max = Math.max(max, rightData.max)
    }

    // 写法1
    boolean isBST = true;
    if (leftData != null && (!leftData.isBST || leftData.max >= x.value)) {
        isBST = false
    }
    if (rightData != null && (!rightData.isBST || rightData.min <= x.value)) {
        isBST = false
    }

    // 写法2
    boolean isBST = false;
    if (
        // 如果左右两边为空, 则不用判断最大最小值了, 直接就是 true
        ( leftData == null ? true : ( leftData.isBST && leftData.max < v.value ) )  // 要求左边是搜索二叉树, 并且左边最大值 < 当前节点值
        &&
        ( rightData == null ? true : ( rightData.isBST && v.value < rightData.min  ) ) // 要求右边是搜索二叉树, 并且 < 右边最小值
    ) {
        isBST = true; // 满足上面条件, 才说明是搜索二叉树。
    }

    // 返回当前子树的信息
    return new ReturnData(isBST, min, max);
}
```

【我的代码】:
```py
def is_valid_BST4(root):
    return process(root)[0]


def process(x):
    if x is None:
        return None

    x_max = x_min = x.val

    l = process(x.left)
    if l is not None:
        l_is_BST, l_max, l_min = l
        if False == l_is_BST or l_max >= x.val:
            return (False, x_max, x_min) # 此时的 max 和 min 其实是无所谓的
        x_max = max(x_max, l_max)
        x_min = min(x_min, l_min)

    r = process(x.right)
    if r is not None:
        r_is_BST, r_max, r_min = r
        if False == r_is_BST or (x.val >= r_min):
            return (False, x_max, x_min)
        x_max = max(x_max, r_max)
        x_min = min(x_min, r_min)

    return (True, x_max, x_min)

```

#### 满二叉树

【需要的信息】:
- 该子树的节点数量 N
- 该子树的高度 H

【是满二叉树的条件】:
- $N = 2^H$

```java
boolean isF(Node head) {
    if (head == null) {
        return true;
    }
    Info data = f(head);
    return data.N == (1<<data.H)-1;
}
class Info {
    int H; // height
    int N; // nodes
    Info(int h, int n) {
        H = h;
        N = n;
    }
}
Info f(Node x) {
    if (x == null) {
        return new Info(0, 0);
    }
    Info leftData = f(x.left);
    Info rightData = f(x.right);
    int H = 1 + Math.max(leftData.height, rightData.height)
    int N = 1 + leftData.N + rightData.N
    return new Info(H, N);
}
```

### 最近公共祖先节点

查找两个节点的最低(最近)公共祖先节点

【思路1】: 从下到上。 先存储节点 o1 的祖先节点列表, 然后让另一个节点 o2 依次往上走, 每走一步都查看该节点 o2 的祖先节点是否在 o1 的祖先节点列表中。

【思路2】: 从上到下。 两个节点的最低公共祖先有两种情况:
- 情况1: o1 或 o2 本身就是最低公共祖先。 这种情况用自上而下的处理方式就是, 先找到谁, 谁就是最低公共祖先。
    - 注意, 因为我们是自上而下的, 所以找到公共祖先后, 要将它返回, 这样才能将下面的内容传递到上面。
- 情况2: o1 或 o2 不互为最低公共祖先。 这种情况需要从两个节点往上汇聚的时候才能找到公共祖先。 即递归的返回值应该传递一个信息, 这个信息就是从下而上传播的。


```java
// 获取 o1 和 o2 在 head 数上的最小公共祖先
Node lca(Node head, Node o1, Node o2) {
    // map 存储每个节点的父节点
    HashMap<Node, Node> fatherMap = new HashMap<>();
    fatherMap.put(head, head);
    process(head, fatherMap);

    // 记录 o1 往上整条连的节点
    HashSet<Node> set1 = new HashSet<>();
    Node cur = o1;
    while (cur != fatherMap.get(cur)) { // 往上遍历, 直到到 head
        set1.add(cur);
        cur = fatherMap.get(cur);
    }
    set1.add(head);

    // 有了 o1 的祖先节点链 后, 在 o2 遍历祖先节点链时, 检查该祖先节点是否在 o1 节点链上
    while (o2 != fatherMap.get(o2)) {
        if (set1.contains(o2)) {
            return o2;
        }
        o2 = fatherMap.get(o2)
    }
}


void process(Node head, HashMap<Node, Node> fatherMap) {
    if (head == null) return;
    fatherMap.put(head.left, head);
    fatherMap.put(head.right, head);
    process(head.left, fatherMap);
    process(head.right, fatherMap);
}
```

```java
Node lowestAncestor(Node head, Node o1, Node o2) {
    if (head == null || head == o1 || head == o2) { // 这里处理的是情况1的 base case
        return head;
    }
    Node left = lowestAncestor(head.left, o1, o2);
    Node right = lowestAncestor(head.right, o1, o2);
    if (left != null && right != null) { // 对于情况1, 这个 if 不可能命中
        /* 这个 if 处理的是情况2。
        在情况1下,  前面 left 和 right 一定有一个返回的是空, 表示在这一侧没有找到 o1 或 o2。 另外一个返回的肯定是 o1 或 o2, 表示在另一侧找到了 o1 和 o2
        只有当 左右两侧各自找到一个 o1 或 o2 时, 才会出现 left 和 right 都不为空的情况2
        所以这里返回的是 head, 因为 head 左侧找到了 o1 或 o2, head 右侧找到了 o1 或 o2, 所以 head 就是他们的最低公共祖先
        */
        return head;
    }
    // 一个空, 一个非空, 说明 o1 和 o2 互为公共祖先(o1 是 o2 的祖先, 或者 o2 是 o1 的祖先)
    return left != null ? left : right;
}
```

```java
class Record1 {
    HashMap<Node, Node> map;
    Record1(Node head) {
        map = new HashMap<Node, Node>();
        if (head != null) {
            map.put(head, null);
        }
        setMap(head);
    }
    setMap(Node head) {
        if (head == null) return ;
        if (head.left != null) map.put(head.left, head);
        if (head.right != null) map.put(head.right, head);
        setMap(head.left);
        setMap(head.right);
    }
    Node query(Node o1, Node o2) {
        HashSet<Node> path = new HashSet<Node>();
        while (map.containsKey(o1)) {
            path.add(o1);
            o1 = map.get(o1);
        }
        while (!path.contains(o2)) {
            o2 = map.get(o2);
        }
        return o2;
    }
}
class Record2 {
    hashMap<Node, HashMap<Node, Node>> map;
    Record2 (Node head) {
        map = new HashMap<Node, HashMap<Node, Node>>();
        initMap(head);
        setMap(head);
    }
    void initMap(Node head) {
        if (head == null) { return ; }
        map.put(head, new HashMap<Node, Node>());
        initMap(head.left);
        initMap(head.right);
    }
    void setMap(Node head) {
        if (head == null) { return ; }
        headRecord(head.left, head);
        headRecord(head.right, head);
        subRecord(head);
        setMap(head.left);
        setMap(head.right);
    }
    void headRecord(Node n, Node h) {
        if (n == null) return;
        map.get(n).put(h, h);
        headRecord(n.left, h);
        headRecord(n.right, h);
    }
    void subRecord(Node head) {
        if (head == null) return;
        preLeft(head.left, head.right, head);
        subRecord(head.left);
        subRecord(head.right);
    }
    void preLeft(Node l, Node r, Node h) {
        if (l == null) return;
        preRight(l, r, h);
        preLeft(l.left, r, h);
        preLeft(l.right, r, h);
    }
    void preRight(Node l, Node r, Node h) {
        if (l == null) return ;
        map.get(l).put(r.left, h);
        preRight(l, r.left, h);
        preRight(l, r.right, h);
    }
    Node query(Node o1, Node o2) {
        if (o1 == o2) return o1;
        if (map.containsKey(o1)) {
            return map.get(o1).get(o2);
        }
        if (map.containsKey(o2)) {
            return map.get(o2).get(o1);
        }
        return null;
    }
}
```

### 找到一个节点的后继节点

在中序遍历中的序列, node 的下一个节点就是后继节点。 同理, 前驱节点就是 node 的前一个节点

假设现在有一个二叉树, 每个节点都有 parent 指针指向了它的父节点。
对于这样的二叉树, 如何找到一个节点 x 的后继节点。 要求时间复杂度是 O(k), k 是该节点走到后继节点的真实距离。

分析有几种情况:
- x 有右树时, x 的后继节点就是右树上的最左节点
- x 没有右树时, x 的后继节点得往上(父节点)找。
    - 如果找到一个节点 y 是作为左子节点的存在, 那么 x 的后继节点就是 y 的父节点。
    - 如果找不到, 说明 x 就是整棵树最右侧的值, 所以 x 的后继节点是空

```java
Node getSuccessorNode(Node node) {
    if (node == null) {
        return node;
    }
    if (node.right != null) {
        // 有右树, 返回右树上最左的节点
        return getLeftMost(node.right);
    } else {
        Node parent = node.parent;
        while (parent != null && parent.left != node) { // 往上找, 找到一个节点 node 是作为 左子节点 的存在。 找不到, 就为空
            node = parent;
            parent = node.parent;
        }
        return parent;
    }
}
Node getLeftMost(Node node) {
    if (node == null) {
        return node;
    }
    while (node.left != null) {
        node = node.left;
    }
    return node;
}
```

【我的代码】:
```py
def get_next_node_inorder(node):
    if node.right is not None:
        node = node.right
        while node.left is not None:
            node = node.left
        return node
    while node.next is not None and node is not node.next.left:  # 判断当前节点是否是左子节点
        node = node.next
    return node.next
```

### 二叉树的序列化和反序列化

- 序列化(Serialize): 把一棵二叉树按照某种遍历方式的结果以某种格式保存为字符串, 从而使得内存中建立起来的二叉树可以持久保存。
- 反序列化(Deserialize): 根据某种遍历顺序得到的序列化字符串结果重构二叉树。

前序中序后序层序遍历中, 单独一种遍历方式是无法唯一确定一棵二叉树的。 但通过存储前序和中序(后序和中序)的遍历结果, 就可以唯一确定一棵二叉树。 具体可通过数学规划法证明。
但这样的话需要两倍的空间。 通过存储空节点, 则可以唯一确定一棵二叉树。(后序和层序遍历同理)。

【注意⚠️】: 中序即使存储空值也无法唯一确定一棵二叉树。 反例如下:
```
    1      |        1
  1   X    |      X   1
X  X       |        X   X
这两颗树的中序遍历结果都是 X1X1X
```

```java
String serializeByPre(Node head ) {
    if (head == null) {
        return '#_';
    }
    String res = head.value + '_';
    res += serializeByPre(head.left);
    res += serializeByPre(head.right);
    return res;
}
Node deserializeByPreString(String preStr) {
    String[] values = preStr.split("_");
    Queue<String> queue = new LinkedList<String>();
    for (int i = 0; i != values.length; i++) {
        queue.add(values[i]);
    }
    return process(queue);
}
Node process(Queue<String> queue) {
    String value = queue.poll();
    if (value.equals("#")) {
        return null;
    }
    Node head = new Node(Integer.valueOf(value));
    head.left = process(queue);
    head.right = process(queue);
    return head;
}
```

#### 先序遍历实现序列化和反序列化

递归遍历
```py
def preorder_serialize_recursion(head):
    if head is None:
        return '#_'
    s = f'{head.val}_'
    s += preorder_serialize_recursion(head.left)
    s += preorder_serialize_recursion(head.right)
    return s


def preorder_deserialize_recursion(s):
    if s is None:
        return None
    queue = Queue()
    nodes = s.split('_')
    nodes.pop()
    for node in nodes:
        queue.put(node)
    return preorder_deserialize_recursion_helper(queue)


def preorder_deserialize_recursion_helper(queue):
    val = queue.get()
    if val == '#':
        return None
    head = TreeNode(int(val))
    head.left = preorder_deserialize_recursion_helper(queue)
    head.right = preorder_deserialize_recursion_helper(queue)
    return head
```

非递归遍历
```py
def preorder_serialize(root):
    if root is None:
        return None
    def _node(node):
        return f'{int(node.val)}_' if node is not None else '#_'

    stack = [root]
    s = ''
    while 0 != len(stack):
        head = stack.pop()

        if head is None:
            s += '#_'
        else:
            s += _node(head)
            stack.append(head.right)
            stack.append(head.left)
    return s

def preorder_deserialize_recursion(s):
    if s is None or s == '#_':
        return None
    nodes = s.split('_')
    t = [0] # 利用变量也能实现队列功能
    return preorder_deserialize_recursion_helper(nodes, t)

def preorder_deserialize_recursion_helper(nodes, t):
    if nodes[t[0]] == '#':
        return None
    head = TreeNode(int(nodes[t[0]]))
    t[0] += 1
    head.left = preorder_deserialize_recursion_helper(nodes, t)
    t[0] += 1
    head.right = preorder_deserialize_recursion_helper(nodes, t)
    return head
```

#### 后序遍历实现序列化和反序列化

```py
def postorder_serialize_recursion(head):
    if head is None:
        return '#_'
    s = postorder_serialize_recursion(head.left)
    s += postorder_serialize_recursion(head.right)
    s += f'{head.val}_'
    return s

def postorder_deserialize(s):
    if s is None:
        return None
    stack = []
    nodes = s.split('_')
    nodes.pop()
    for node in nodes:
        stack.append(node)
    return postorder_deserialize_recursion(stack)

def postorder_deserialize_recursion(stack):
    val = stack.pop()
    if val == '#':
        return None
    head = TreeNode(int(val))
    head.right = postorder_deserialize_recursion(stack)
    head.left = postorder_deserialize_recursion(stack)
    return head
```

#### 层序遍历实现序列化和反序列化

```py
def traverse_serialize(root):
    if root is None:
        return '#_'
    queue = Queue()
    queue.put(root)
    s = f'{root.val}_'
    while not queue.empty():
        p = queue.get()

        if p.left is not None:
            queue.put(p.left)
            s += f'{p.left.val}_'
        else:
            s += f'#_'
        if p.right is not None:
            queue.put(p.right)
            s += f'{p.right.val}_'
        else:
            s += f'#_'
    return s


def traverse_deserialize(s):
    if s is None or s == '#_':
        return None
    def _node(val):
        return TreeNode(int(val)) if val != '#' else None

    # nodes 中从第一个元素(包含该元素)开始, 每两个元素是某一节点的两个子节点。
    # 根据这个规律, 可以按层序依次生成节点, 然后得到它的两个子节点
    nodes = s.split('_')
    i = 0
    root = head = _node(nodes[i])
    i += 1
    # queue 中按层序依次添加新节点。
    queue = Queue()
    queue.put(head)
    while not queue.empty():
        head = queue.get()
        head.left, head.right = _node(nodes[i]), _node(nodes[i+1])
        i += 2
        if head.left is not None:
            queue.put(head.left)
        if head.right is not None:
            queue.put(head.right)

    return root

```

### 折纸问题

请把一段纸条竖着放在桌子上, 然后从纸条的下边向上方对折1次, 压出折痕后展开。
此时折痕是凹下去的, 即折痕突起的方向指向纸条的背面。
如果从纸条的下边向上方连续对折2次, 压出折痕后展开, 此时有三条折痕, 从上到下依次是下折痕、下折痕和上折痕。
给定一个输入参数 N, 代表纸条都从下边向上方连续对折 N 次。请从上到下打印所有折痕的方向。
例如: N=1 时, 打印: down; N=2时, 打印: down down up。

```
┌────────────┬────────────┬────────────┐
│            │            │            │       自上而下打印折痕, 其实就是中序遍历。
│            │            │ ----3u---- │       每次对折, 旧折痕上的上下两侧会多出两条折痕, 并且上面永远是凹(u), 下面永远是凸(n)。
│            │            │            │       所以题意其实就是打印下面这么一个二叉树
│            │ ----2u---- │ ----2u---- │　　　　　　　　　　　　　　　　　　　　　　　　　　　
│            │            │            │　　　　　　　　　　　上边　　　　　凹　　　　　下边　
│            │            │ ----3n---- │　　　　　　　　　　　　　　　　／　　　＼　　　　　　
│            │            │            │　　　　　　　　　　　　　　　凹　　　　　凸　　　　　
│ ----1u---- │ ----1u---- │ ----1u---- │　　　　　　　　　　　　　　／　＼　　　／　＼　　　　
│            │            │            │　　　　　　　　　　　　　凹　　　凸　凹　　　凸　　　
│            │            │ ----3u---- │　　　　　　　　　　　　　　　　　　　　　　　　　　　
│            │            │            │　　　　　　　　　　　　　　　　　　　　　　　　　　　
│            │ ----2n---- │ ----2n---- │　　　　　　　　　　　　　凹　凹　凸凹凹　凸　凸　　　
│            │            │            │　　　　　　　　　　　　　　　　　　　　　　　　　　　
│            │            │ ----3n---- │　　　　　　　　　　　　　　　　　　　　　　　　　　　
│            │            │            │　　　　　　　　　　　　　　　　　　　　　　　　　　　
└────────────┴────────────┴────────────┘　　　　　　　　　　　　　　　　　　　　　　　　　　　
```

```java
void printProcess(int i, int N, boolean down) {
    if (i > N) {
        return;
    }
    printProcess(i+1, N, true);
    print(down ? "凹" : "凸");
    printProcess(i+1, N, false);
}
```