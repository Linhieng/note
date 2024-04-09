## [230723 Given a linked list of 0s, 1s and 2s, sort it.](https://practice.geeksforgeeks.org/problems/given-a-linked-list-of-0s-1s-and-2s-sort-it/1)

- 【题意】 链表拆分与重组
- 【要求】
    - Time Complexity O(N)
    - Auxiliary Space O(N)
- 【Constraints】
    - 0 <= N <= $10^6$

三条链，然后依次连接。

看了评论区，发现一些其他解法。比如两次遍历，第一次只存储 0,1,2 各自的次数，第二次依次赋值。

### Python3 代码

【评论区 - 两次遍历】:
```py
class Solution:
    #Function to sort a linked list of 0s, 1s and 2s.
    def segregate(self, head):
        cur = head
        temp = [0, 0, 0]
        while cur is not None:
            temp[cur.data] += 1
            cur = cur.next
        cur = head
        for data, num in enumerate(temp):
            while num > 0:
                cur.data = data
                cur = cur.next
                num -= 1
        return head
```

【我的】:
```py
class Solution:
    #Function to sort a linked list of 0s, 1s and 2s.
    def segregate(self, head):
        zero_head, zero_tail = None, None
        one_head, one_tail = None, None
        two_head, two_tail = None, None

        while head is not None:
            if head.data == 0:
                if zero_head is not None:
                    zero_tail.next = head
                    zero_tail = zero_tail.next
                else:
                    zero_tail = head
                    zero_head = head
            elif head.data == 1:
                if one_head is not None:
                    one_tail.next = head
                    one_tail = one_tail.next
                else:
                    one_tail = head
                    one_head = head
            else:
                if two_head is not None:
                    two_tail.next = head
                    two_tail = two_tail.next
                else:
                    two_tail = head
                    two_head = head
            head = head.next
        if zero_tail is not None:
            zero_tail.next = one_head if one_head is not None else two_head
        if one_tail is not None:
            one_tail.next = two_head
        if two_tail is not None:
            two_tail.next = None
        return zero_head if zero_head is not None else ( one_head if one_head is not None else two_head )

```