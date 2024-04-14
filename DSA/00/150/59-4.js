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
    let tmpArr = []
    while (list1) {
        tmpArr.push(list1.val)
        list1 = list1.next
    }
    while (list2) {
        tmpArr.push(list2.val)
        list2 = list2.next
    }
    if (tmpArr.length < 1) return null

    tmpArr.sort((a, b) => Number(a) - Number(b))
    console.log(tmpArr)
    let ans
    let head
    tmpArr.forEach(v => {
        if (!ans) {
            ans = new ListNode(v)
            head = ans
            return
        }
        head.next = new ListNode(v)
        head = head.next
    })
    return ans
}
