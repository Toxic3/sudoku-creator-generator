var generate = require("./generate.js");
var colCheck = generate.colCheck;
var squCheck = generate.squCheck;
var genPseudoku = generate.genPseudoku;
var visPseudoku = generate.visPseudoku;
//a function to check if all integers from 1 to n appear in a single row of a 2d array where n is the number of columns of the 2d array
function singleRowCheck(arr, row) {
	// first we have a loop to check for all integers from 1 to the length of the row
	for (var i = 1; i <= arr[row].length; i++) {
		// this variable is going to count the number of times the integer i is in the row; if it is ever greater than 1 then we will return false, if it equal to zero after checking all columns then we return false
		var count = 0;
		// this loop is going to SEARCH every column for the integer i
		for (var j = 0; j < arr[row].length; j++) {
			if (arr[row][j] == i) {
				count++;
			}
			if (count > 1) {
				return false;
			}
		}
		// this is to check if the integer is in the row at all; if it is not, then count == 0 and we will return false
		if (count === 0) {
			return false;
		}
	}
	// so if it has gone through all of the checks and passed we return true;
	return true;
}
// this takes two numbers n and len and returns an array of length len which is the representation of number n in base 4 with as many zeroes at the beginning as necessary
// be careful that len is as big as it needs to be to print n in full
function conversion(n, len) {
	var con = [];
	while (Math.floor(n / 4) !== 0) {
		con.push(n % 4);
		n = Math.floor(n / 4);
	}
	con.push(n % 4);
	// the array con is in the wrong order, so we will create a new array which gives us what we want in the right order
	var out = [];
	for (var i = con.length - 1; i >= 0; i--) {
		out.push(con[i]);
		con.pop();
	}
	// this will add extra zeroes at the beginning of the array so that conversion is at length len
	while (out.length < len) {
		out.splice(0, 0, 0);
	}
	return out;
}
// WRITE YOUR CODE INTO THE BODY OF THESE FUNCTIONS TO GET THEM WORKING
function rowCheck(arr) {
	for (var i = 0; i < arr.length; i++) {
		if (singleRowCheck(arr, i) === false) {
			return false;
		}
	}
	return true;
}

function blankEntries(arr) {
	var blank = [];
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr.length; j++) {
			if (arr[i][j] === " ") {
				blank.push([i, j]);
			}
		}
	}
	return blank;
}

function makeCandidate(n, len) {
	var candidate = conversion(n, len);
	for (var i = 0; i < candidate.length; i++) {
		candidate[i] += 1;
	}
	return candidate;
}

function checkCandidate(arr, cand) {
	var blank = blankEntries(arr);
	for (var i = 0; i < blank.length; i++) {
		arr[blank[i][0]][blank[i][1]] = cand[i];
	}
	if (squCheck(arr) && colCheck(arr) && rowCheck(arr)) {
		return true;
	}
	for (var j = 0; j < blank.length; j++) {
		arr[blank[j][0]][blank[j][1]] = " ";
	}
	return false;
}

function solvePseudoku(arr) {
	var blank = blankEntries(arr);
	for (var i = 0; i < Math.pow(4, blank.length); i++) {
		if (checkCandidate(arr, makeCandidate(i, blank.length))) {
			return arr;
		}
	}
	return "There is no solution!";
}
// Test Code
var arr1 = genPseudoku([2, 3, 4, 1], 8);
console.log(visPseudoku(arr1));
var arr2 = genPseudoku([4, 2, 3, 1], 10);
console.log(visPseudoku(arr2));
console.log(visPseudoku(solvePseudoku(arr1)));
console.log(visPseudoku(solvePseudoku(arr2)));