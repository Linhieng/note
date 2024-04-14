/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    return (
        s
        .split(' ')
        .filter(v => v.trim() !== '')
        .slice(-1)[0]
        .length)
};
