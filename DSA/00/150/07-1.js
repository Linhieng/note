/*
刚开始看到题解时，我困惑的点就在于为什么只需要考虑最低点，
按理来说，只在最低点时买入并不代表能得到最大利润。

其实，我困惑的点本身就有问题。因为题解得出的并不是指最低点买入时，所能得到的
最大利润。题解中的最低点，指的是在第 i 天时卖出，所能得到的最大利润，那肯定
是在前面天数中的最低点买入呀！

也就是说，在遍历过程中，最低点一直都有多个！

/**
 * @param {number[]} prices
 * @return {number}
 */
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
	let minPriceBeforeCurrent = Infinity
	let max_profit = 0
	prices.forEach(todayPrice => {
		max_profit = Math.max(max_profit, todayPrice - minPriceBeforeCurrent)
		minPriceBeforeCurrent = Math.min(minPriceBeforeCurrent, todayPrice)
	})
	return max_profit
}
