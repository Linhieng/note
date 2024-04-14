# [230902 Leaf under budget](https://practice.geeksforgeeks.org/problems/leaf-under-budget/1)

【题意】：最多能遍历到的叶子节点个数

【Excepted】

- Time Complexity: O(N)
- Auxiliary Space: O(N)

## Solution

```py
class Solution:
    def getCount(self,root,n):
        queue = [root]
        level = 1
        cur_end = root
        next_end = None
        ans = 0
        while len(queue) > 0:
            cur = queue.pop(0)

            if cur.left is None and cur.right is None:
                n -= level
                if n >= 0:
                    ans += 1
                else:
                    break

            if cur.left:
                next_end = cur.left
                queue.append(cur.left)
            if cur.right:
                next_end = cur.right
                queue.append(cur.right)

            if cur is cur_end:
                cur_end = next_end
                level += 1

        return ans
```

```py
class Solution:
    def getCount(self,root,n):
        if not root:
            return 0

        stack = [root]
        had = set()
        leaf = []

        while len(stack) > 0:
            cur = stack.pop()
            had.add(cur)

            if cur.left is None and cur.right is None:
                leaf.append(len(stack) + 1)
                continue

            if cur.left is not None and cur.left not in had:
                stack.append(cur)
                stack.append(cur.left)
                continue
            if cur.right is not None and cur.right not in had:
                stack.append(cur)
                stack.append(cur.right)
                continue
        leaf = sorted(leaf)
        ans = 0
        while len(leaf) > 0 and n > 0:
            n -= leaf.pop(0)
            if n >= 0:
                ans += 1
        return ans
```

## JavaScript 创建 tree 模版

```js
class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

/**
 *
 * @param {Array<string>} tree_str
 */
function build_tree(tree_str) {
    const str = tree_str
        .trim()
        .split(" ")
        .filter((v) => v !== "")
        .map((v) => (v === "N" ? "N" : Number.parseInt(v)));

    if (str.length === 0 || str[0] === "N") return null;

    let root = new Node(parseInt(str[0]));

    let queue = [];
    let start = 0;
    queue.push(root);

    let i = 1;
    while (queue.length !== start && i < str.length) {
        let currNode = queue[start];
        start += 1;

        let currVal = str[i];

        if (currVal !== "N") {
            currNode.left = new Node(parseInt(currVal));
            queue.push(currNode.left);
        }

        i += 1;
        if (i >= str.length) break;
        currVal = str[i];

        if (currVal !== "N") {
            currNode.right = new Node(parseInt(currVal));
            queue.push(currNode.right);
        }
        i += 1;
    }
    return root;
}

/**
 * @param {Node} root
 * @param {number} n
 * @return {number}
 */

function getCount(root, n) {
    if (root === null) {
        return 0;
    }

    const stack = [root];
    const had = new Set();
    const leaf = [];
    while (stack.length > 0) {
        const cur = stack.pop();
        had.add(cur);

        if (cur.left === null && cur.right === null) {
            leaf.push(stack.length + 1);
            continue;
        }
        if (cur.left && !had.has(cur.left)) {
            stack.push(cur, cur.left);
            continue;
        }
        if (cur.right && !had.has(cur.right)) {
            stack.push(cur, cur.right);
            continue;
        }
    }
    leaf.sort((a, b) => a - b);
    let ans = 0;
    while (leaf.length > 0 && n > 0) {
        n -= leaf.shift();
        if (n >= 0) {
            ans += 1;
        }
    }
    return ans;
}

let root = build_tree(
    "14 3 15 1 11 N N N 2 4 12 N N N 10 N 13 5 N N N N 6 N 9 8 N 7",
);
console.log(getCount(root, 14));

```
