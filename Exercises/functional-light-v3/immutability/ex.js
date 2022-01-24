"use strict";

function lotteryNum() {
	return (Math.round(Math.random() * 100) % 58) + 1;
}

function pickNumber() {
	const newArr = [...luckyLotteryNumbers];
	const rand = lotteryNum();

	if(!newArr.includes(rand)){
		newArr.push(rand);
		newArr.sort();
		luckyLotteryNumbers.push(...newArr);
	}

	
}

var luckyLotteryNumbers = [];

while (luckyLotteryNumbers.length < 6) {
	pickNumber();
}

console.log(luckyLotteryNumbers);
