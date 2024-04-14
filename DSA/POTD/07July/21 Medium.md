## [230721 - Reverse a Linked List in groups of given size](https://practice.geeksforgeeks.org/problems/reverse-a-linked-list-in-groups-of-given-size/1)

- 【题意】 每 k 个节点反转链表
- 【要求】
    - Time Complexity O(N)
    - Auxiliary Space O(1)
- 【Constraints】
    - 1 ≤ N ≤ $10^5$
    - 1 ≤ k ≤ N

刚开始差点理解错题意, 以为 k 是某个节点的值, 测试了一下才发现是每 k 个节点反转，然后将每组连接起来返回。

首先不考虑要求，直接借助数组完成，耗时 25 分钟。

思考不借助额外空间，耗时近 40 多分钟。思路没啥好说的，就是 Coding 问题。

### Python3 代码

【评论区 - 递归】:
```py
class Solution:
    def reverse(self,head, k):

        prev = None
        curr = head
        next = None
        cnt = 0

        while curr is not None and cnt < k:
            next = curr.next
            curr.next = prev
            prev = curr
            curr = next
            cnt += 1

        if next is not None:
            head.next = self.reverse(next, k)

        return prev
```

【我的 - 不借助额外空间 - 代码结构优化】：
```py
class Solution:
    def reverse(self,head, k):

        ki = 0
        curr = head
        prev = None
        group1_tail = head
        head = None

        while curr is not None: # k <= len(linked List)
            ki += 1
            curr_next = curr.next
            curr.next = prev
            prev = curr

            if ki == k:
                #    -------------------------------------------------------
                #    ↑                                                     ↓
                # [group1_tail <-- .. <-- | group2_head <-- .. <-- prev, curr ]

                if head is None:
                    head = curr
                else:
                    group1_tail.next = curr
                    group1_tail = group2_head

                group2_head = curr_next
                ki = 0
                prev = None


            curr = curr_next


        if prev is not None:
            group1_tail.next = prev

        return head
```

【我的 - 不借助额外空间】:
```py
class Solution:
    def reverse(self,head, k):
        ki = 0
        curr = head
        prev = None
        group1_tail = head

        while ki < k:
            ki += 1
            curr_next = curr.next

            curr.next = prev

            prev = curr
            curr = curr_next

        head = prev
        group2_head = curr
        prev = None
        ki = 0

        while curr is not None:
            ki += 1
            curr_next = curr.next
            curr.next = prev
            prev = curr

            if ki == k:
                ki = 0
                prev = None

                # [group1_tail, ...|, group2_head, .... curr] 为两组
                group1_tail.next = curr
                group1_tail = group2_head
                group2_head = curr_next


            curr = curr_next



        if prev is not None:
            group1_tail.next = prev

        return head
```

【我的 - 借助数组反转】:
```py
class Solution:
    def reverseArr(self, arr, i, j):
        while i < j:
            arr[i], arr[j] = arr[j], arr[i]
            i += 1
            j -= 1

    def reverse(self,head, k):
        linkedList = []
        while head is not None:
            linkedList.append(head)
            head = head.next
        i = 0
        while True:
            j = min(len(linkedList)-1, i+k-1)
            self.reverseArr(linkedList, i, j)
            if j == len(linkedList)-1:
                break
            i += k
        head = linkedList[0]
        p = head
        for item in linkedList[1:]:
            p.next = item
            p = item
        p.next = None
        return head
```