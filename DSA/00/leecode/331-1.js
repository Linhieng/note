/**
 * 一颗合法的树，其空节点数量永远等于有效节点数量+1
 * 所以，在遍历过程中，一旦发现空节点数量大于有效节点数量，则说明
 * 遍历结束了，如果此时发现并未结束，则说明序列字符串不是合法的。
 *
 * @param {string} preorder
 * @return {boolean}
 */
var isValidSerialization = function (preorder) {
    const nodes = preorder.split(',')
    const len = nodes.length
    let normalNode = 0
    let nullNode = 0
    for (const [i, node] of nodes.entries()) {
        if (node === '#') {
            nullNode++
        } else {
            normalNode++
        }
        if (nullNode > normalNode) {
            return i + 1 === len
        }
    }
    return false

}
