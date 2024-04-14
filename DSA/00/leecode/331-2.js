/**
 * @param {string} preorder
 * @return {boolean}
 */
var isValidSerialization = function (preorder) {
    const nodes = preorder.split(',')

    // 初始时为根节点提供一个虚拟的边
    let edge = 1
    for (const node of nodes) {
        // 2. 如果发现边的数量无法被消耗，说明序列字符串是不合法的
        if (edge < 1) return false
        // 1. 每一个节点都会消耗一条边
        edge -= 1

        // 而一个有效节点，提供两条边
        if (node !== '#') {
            // 注意加 2 操作不能在判断 edge<0 之前执行
            edge += 2
        }
    }

    // 最后，所有的边应该刚好耗完！
    return edge === 0
}
