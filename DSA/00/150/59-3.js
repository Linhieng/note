/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
    if (!list1) return list2
    if (!list2) return list1

    let ans
    let head

    while (list1 && list2) {
        // 初始化头结点
        if (!ans) {
            if (list1.val < list2.val) {
                ans = list1
                head = list1
                list1 = list1.next
            } else {
                ans = list2
                head = list2
                list2 = list2.next
            }
            continue
        }

        if (list1.val < list2.val) {
            head.next = list1
            list1 = list1.next
            head = head.next
        } else {
            head.next = list2
            list2 = list2.next
            head = head.next
        }
    }
    if (list1) {
        head.next = list1
    } else if (list2) {
        head.next = list2
    }
    return ans
}
