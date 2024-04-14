# [230828 Remove duplicate element from sorted Linked List](https://practice.geeksforgeeks.org/problems/remove-duplicate-element-from-sorted-linked-list/1)

【题意】：从有序链表上删除重复的节点

【Excepted】

- Time Complexity : O(N)
- Auxiliary Space : O(1)

## Python3

代码中是使用 cur, next 还是 prev, cur 都一样。

```py
def removeDuplicates(head):
    cur = head
    next = head

    while next is not None:
        while next is not None and cur.data == next.data:
            next = next.next
        cur.next = next
        cur = next
    return head
```

下面代码是不太简洁，但很容易理解的代码：

```py
def removeDuplicates(head):
    if head is None:
        return head

    p = head.next
    prev = head

    while p is not None:
        # 每次 p 肯定走，但 prev 走不走就得看 p 的值了
        if p.data == prev.data:
            prev.next = p.next
        else:
            prev = p

        p = p.next

    return head
```
