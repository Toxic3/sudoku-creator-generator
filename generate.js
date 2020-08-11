// A function to check each column in a 2d array for numbers 1 to n
function singleColCheck(arr, col) {
	// First it loops n times
	for (var i = 1; i <= arr.length; i++) {
		// Creates a count variables
		var count = 0;
		// Searches every column for each i
		for (var j = 0; j < arr.length; j++) {
			// If i appears add 1 to count
			if (arr[j][col] == i) {
				count++;
			}
			// If the count is more than one then return false
			if (count > 1) {
				return false;
			}
		}
		// If i did not appear then also return false
		if (count === 0) {
			return false;
		}
	}
	// so if it has gone through all of the checks and passed we return true;
	return true;
}
// Checks each block of a 2d array with x1, y1 being top left and x2, y2 being bottom right
function singleBlockCheck(arr, x1, y1, x2, y2) {
	// This generates the square array
	var square = [];
	for (var i = y1; i <= y2; i++) {
		for (var j = x1; j <= x2; j++) {
			square.push(arr[i][j]);
		}
	}
	// This checks the square in the same way singleColCheck does
	for (var k = 1; k <= square.length; k++) {
		var count = 0;
		for (var l = 0; l < square.length; l++) {
			if (square[l] == k) {
				count++;
			}
			if (count > 1) {
				return false;
			}
		}
		if (count === 0) {
			return false;
		}
	}
	return true;
}
// a function to randomly select n (row,column) entries of a 2d array with size columns and size rows, where size is assumed to be an integer and n is also assumed to be an integer
function entriesToDel(size, n) {
	if (n <= Math.pow(size, 2)) {
		// this creates an array of all the rows and column indices
		var array = [];
		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				array[j + (size * i)] = [i, j];
			}
		}
		// this creates a new array, called array2 to store randomly chose elements of the array that will be removed, and then removes those elements from array
		var array2 = [];
		for (var k = 0; k < n; k++) {
			var x = Math.round((Math.pow(size, 2) - k - 1) * Math.random());
			array2[k] = array[x];
			array.splice(x, 1);
		}
		return array2;
	}
	return "Number of elements exceeds size of array!";
}
// WRITE YOUR CODE INTO THE BODY OF THESE FUNCTIONS TO GET THEM WORKING
function genArray(row) {
	var arr = [];
	for (var i = 0; i < row.length; i++) {
		arr[i] = row;
	}
	return arr;
}

function colCheck(arr) {
	for (var i = 0; i < arr.length; i++) {
		if (singleColCheck(arr, i) === false) {
			return false;
		}
	}
	return true;
}

function squCheck(arr) {
	var x = arr.length;
	var y = Math.pow(arr.length, 0.5);
	for (var i = 0; i < x / y; i++) {
		for (var j = 0; j < x / y; j++) {
			if (singleBlockCheck(arr, i * (x / y), j * (x / y), (i * (x / y) + 1), (j * (x / y)) + 1) === false) {
				return false;
			}
		}
	}
	return true;
}

function cyclicPerm(arr, row, n) {
	var finalArr = arr[row];
	var tempArr;
	for (n; n > 0; n--) {
		tempArr = new Array(finalArr.length);
		for (var j = 0; j < finalArr.length - 1; j++) {
			tempArr[j + 1] = finalArr[j];
		}
		tempArr[0] = finalArr[finalArr.length - 1];
		finalArr = tempArr;
	}
	return finalArr;
}

function perm(arr, a, b, c) {
	arr[1] = cyclicPerm(arr, 1, a);
	arr[2] = cyclicPerm(arr, 2, b);
	arr[3] = cyclicPerm(arr, 3, c);
	return arr;
}

function permArray(arr) {
	var newArr;
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr.length; j++) {
			for (var k = 0; k < arr.length; k++) {
				newArr = perm(arr, i, j, k);
				if (squCheck(newArr) && colCheck(newArr)) {
					return newArr;
				}
			}
		}
	}
	return "There is no solution!";
}

function delEntries(arr, n) {
	var remove = entriesToDel(arr.length, n);
	if (remove === "Number of elements exceeds size of array!") {
		return "Number of elements exceeds size of array!";
	} else {
		for (var i = 0; i < n; i++) {
			arr[remove[i][0]][remove[i][1]] = " ";
		}
		return arr;
	}
}

function genPseudoku(row, n) {
	var finalArray = permArray(genArray(row));
	if (finalArray === "There is no solution!") {
		return "There is no solution!";
	} else {
		return delEntries(finalArray, n);
	}
}

function visPseudoku(arr) {
	if (arr === "There is no solution!") {
		return "There is no solution!";
	} else if (arr === "Number of elements exceeds size of array!") {
		return "Number of elements exceeds size of array!";
	} else {
		var pseudokuString = "";
		for (var i = 0; i < (arr.length * 4) + 1; i++) {
			pseudokuString += "-";
		}
		for (var j = 0; j < arr.length; j++) {
			pseudokuString += "\n|";
			for (var k = 0; k < arr.length; k++) {
				pseudokuString += " " + arr[j][k] + " |";
			}
			pseudokuString += "\n";
			for (var l = 0; l < (arr.length * 4) + 1; l++) {
				pseudokuString += "-";
			}
		}
		return pseudokuString;
	}
}

// List of module exports
module.exports.genArray = genArray;
module.exports.colCheck = colCheck;
module.exports.squCheck = squCheck;
module.exports.genPseudoku = genPseudoku;
module.exports.visPseudoku = visPseudoku;