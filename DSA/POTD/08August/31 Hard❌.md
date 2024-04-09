# [230831 AVL Tree Deletion](https://practice.geeksforgeeks.org/problems/avl-tree-deletion/1)

【题意】：从 AVL 树中删除节点

【Excepted】

- Time Complexity: O(height of tree)
- Auxiliary Space: O(height of tree)

## Python3

```py
def get_height(root):
    if not root:
        return 0
    return root.height

def update_height(node):
    node.height = 1 + max(get_height(node.left),
                          get_height(node.right))

def get_balance_factor(root):
    if not root:
        return 0
    return get_height(root.left) - get_height(root.right)

def get_min_value_node(root):
    while root.left is not None:
        root = root.left
    return root

def left_rotate(node):
    new_root = node.right
    node.right = new_root.left
    new_root.left = node
    update_height(node) # 注意先更新 node，再更新 new_root
    update_height(new_root)
    return new_root

def right_rotate(node):
    new_root = node.left
    node.left = new_root.right
    new_root.right = node
    update_height(node) # 注意先更新 node，再更新 new_root
    update_height(new_root)
    return new_root

def deleteNode(root, key):
    if not root:
        return root

    # 1. Find the node to be deleted and remove it
    if key < root.data:
        root.left = deleteNode(root.left, key)
    elif key > root.data:
        root.right = deleteNode(root.right, key)
    else:
        if root.left is None:
            return root.right
        elif root.right is None:
            return root.left
        tmp = get_min_value_node(root.right)
        root.data = tmp.data
        root.right = deleteNode(root.right, tmp.data)

    # 2. Update the balance factor of nodes
    update_height(root)
    balance_factor = get_balance_factor(root)

    # 3. Balance the tree
    if balance_factor > 1:
        if get_balance_factor(root.left) >= 0:
            return right_rotate(root)
        else:
            root.left = left_rotate(root.left)
            return right_rotate(root)
    if balance_factor < -1:
        if get_balance_factor(root.right) <= 0:
            return left_rotate(root)
        else:
            root.right = right_rotate(root.right)
            return left_rotate(root)
    return root
```
