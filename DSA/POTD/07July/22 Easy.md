## [230721 - Remove duplicates from an unsorted linked list](https://practice.geeksforgeeks.org/problems/remove-duplicates-from-an-unsorted-linked-list/1)

- 【题意】 删除链表重复节点
- 【要求】
    - Time Complexity O(N)
    - Auxiliary Space O(N)
- 【Constraints】
    - 1 <= size of linked lists <= $10^6$
    - 0 <= numbers in list <= $10^4$

做题过程中需要注意的点：
- 使用哈希表而不是数组
- 当遇到重复节点时，注意是只更新当前指针， `prev` 指针不需要更新。

### Python3 代码

【我的】:
```py
class Solution:
    #Function to remove duplicates from unsorted linked list.
    def removeDuplicates(self, head):
        had = set()
        p = head
        prev = None
        while p is not None:
            # ｐ　每次都会更新，重点在于 prev 走不走
            if p.data not in had:
                had.add(p.data)
                prev = p
            else:
                prev.next = p.next

            p = p.next

        return head
```