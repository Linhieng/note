# 二叉树

- 前序遍历：**头**左右
- 中序遍历：左**头**右
- 后序遍历：左右**头**

## 根据前序和中序确定一个二叉树

原理：根据前序遍历结果，可以确定一个根节点。根据中序遍历和根节点，可以确定左右两棵子树。对两棵子树再次按照相同的方法继续确定根节点，依次递推则可确定一棵二叉树。

在线 OJ：

- [从前序与中序遍历序列构造二叉树 - 力扣](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/submissions/)
- [从中序与后序遍历序列构造二叉树 - 力扣](https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)

## 哈夫曼树

树的带权路径长度 = 各权值乘以对应点到根节点的边数。也就是权值乘以层数，根节点为第 0 层。

## 线索二叉树

核心：利用空节点来来指向遍历下一个节点。

线索二叉树中，每一个节点都有左右两个指针，但这两个指针指向的节点不一定是子节点。所以需要 lTag 和 rTag 来标识两个指针的指向是否是子节点。

- 若 lTag 为 1，则表示 lChild 并不是子节点，而是**前继**节点，具体是哪一个，得看该线索二叉树是前序、中序还是后续。比如中序线索二叉树，其 lChild 指向当前结点中序遍历的**前继**结点
- 若 rTag 为 1，则表示 rChild 并不是子节点，而是**后继**节点，具体是哪一个，得看该线索二叉树是前序、中序还是后续。比如中序线索二叉树，其 rChild 指向当前结点中序遍历的**后继**结点。
- 若 lTag 为 0，则表示 rChild 就是左子节点。
- 若 rTag 为 0，则表示 rChild 就是右子节点。

![中序线索二叉树图示例 - 来自知乎](https://pic2.zhimg.com/80/v2-890ef1e99682f6ce51523ea9463a481d_720w.webp)
![中序线索二叉树图示例 - 来自知乎](https://pic3.zhimg.com/80/v2-e6c1cca25caa64ef6468ec63e69d448a_720w.webp)
