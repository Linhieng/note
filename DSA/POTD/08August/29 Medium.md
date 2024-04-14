# [230829 Delete nodes having greater value on right](https://practice.geeksforgeeks.org/problems/delete-nodes-having-greater-value-on-right/1)

【题意】：从单链表中删除节点的值小于其右侧最大值的节点

【Excepted】

- Time Complexity: O(N)
- Auxiliary Space: O(1)

## Solution

```js
//User function Template for javascript

/**
 * @param {Node} head
 * @returns {Node}
*/

/*
class Node{
    constructor(data){
        this.data = data;
        this.next = null;
    }
}
*/

class Solution {

    compute(head) {
        // Reverse
        let p = head
        let prev = null
        while (p) {
            const p_next = p.next
            p.next = prev
            prev = p
            p = p_next
        }

        // del and reverse again
        p = prev
        prev = null
        let max = Number.MIN_SAFE_INTEGER
        while (p) {
            const p_next = p.next

            if (p.data < max) {
                // del
            } else {
                p.next = prev
                prev = p
            }
            max = Math.max(max, p.data)
            p = p_next

        }

        return prev

    }
}
```

```py
class Solution:
    def compute(self,head):
        p = head
        arr = []
        while p is not None:
            arr.append(p.data)
            p = p.next

        m = float('-inf')
        ans = []
        for i in arr[::-1]:
            if i >= m:
                ans.append(i)
            m = max(i, m)
        p = head
        pre = None
        for i in ans[::-1]:
            p.data = i
            pre = p
            p = p.next

        pre.next = None
        return head
```

下面的方案来自评论区，虽然时间复杂度是 O(N^2)，但代码挺简洁的，而且也算是一种思路，所以记录一些。（做算法题还得是 py）

【评论区 超时❌ 595 / 1120】

```py
class Solution:
    def compute(self, head):
        curr = head
        while curr.next:
            if curr.data < curr.next.data:
                curr.data = curr.next.data
                curr.next = curr.next.next
                curr = head # 重新开始
            else:
                curr = curr.next
        return head
```
