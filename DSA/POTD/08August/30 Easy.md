# [230830 Delete a Node in Single Linked List](https://practice.geeksforgeeks.org/problems/delete-a-node-in-single-linked-list/1)

【题意】：删除单链表的第 n 个节点

【Excepted】

- 时间复杂度：O(n)
- 额外空间复杂度：O(1)

## Solution

```js
/**
 * @param {Node} head
 * @return {Node}
*/

class Solution {
    deleteNode(head,x){
        if (!head) return null
        if (x === 1) return head.next
        head.next = this.deleteNode(head.next, x-1)
        return head
    }
}
```

```js
//User function Template for javascript

/*LINKED LIST NODE
class Node {
  constructor(x){
    this.data = x;
    this.next = null;
  }
}
*/


/**
 * @param {Node} head
 * @return {Node}
*/

class Solution {
    deleteNode(head,x){
        if (head === null) {
            return null
        }
        if (x === 1) {
            return head.next
        }

        let prev = null
        let cur = head
        let idx = 0
        while (cur) {
            idx += 1

            if (idx === x) {
                prev.next = cur.next
                break
            }

            prev = cur
            cur = cur.next
        }

        return head

    }
}
```

```py
def delNode(head, k):
    if k == 1:
        return head.next
    i = 0
    p = head
    while p is not None:
        i += 1
        if i == k-1:
            if p.next is not None:
                p.next = p.next.next
            break

        p = p.next

    return head
```
