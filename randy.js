/*–––––––––––––––––––––––––––––––––––––––
RANDY.JS
A collection of primitive JavaScript functions for generating versatile random results.

Version 1.0, 12/2023

https://github.com/Jammersplit/Randy.js

Author: Moritz Greiner-Petter
Website: http://www.jammersplit.de

License: MIT License
–––––––––––––––––––––––––––––––––––––––*/

/*•••••••••••••••••••••••••••••••••••••••
Returns either true or false randomly, with option to set probability of results.

trueProbability – The likelihood to return true (default 0.5).
    • Expects a value between 0–1.
    • 1 would always return true, 0 would always return false.
•••••••••••••••••••••••••••••••••••••••*/
function coinToss(trueProbability = 0.5) {
	trueProbability = Math.min(Math.max(trueProbability, 0), 1);
	
	if(Math.random() < trueProbability) {
		return(true);
	}
	else {
		return(false);
	}
}

/*•••••••••••••••••••••••••••••••••••••••
Returns one of the passed values randomly, with option to set probability of results.

headsValue / tailsValue (default true / false)
    • Can be values of any type.
headsProbability – The likelihood to return headsValue (default 0.5).
    • Expects a value between 0–1.
    • 1 would always return headsValue, 0 would always return tailsValue.
•••••••••••••••••••••••••••••••••••••••*/
function coinTossWith(headsValue = true, tailsValue = false, headsProbability = 0.5) {
	headsProbability = Math.min(Math.max(headsProbability, 0), 1);
	
	if(Math.random() < headsProbability) {
		return(headsValue);
	}
	else {
		return(tailsValue);
	}
}

/*•••••••••••••••••••••••••••••••••••••••
Returns either 1 or -1 randomly, with option to set probability of results.

plusProbability – The likelihood to return positive 1 (default 0.5).
    • Expects a value between 0–1.
    • 1 would always return 1, 0 would always return -1.
•••••••••••••••••••••••••••••••••••••••*/
function plusMinusOne(plusProbability = 0.5) {
	plusProbability = Math.min(Math.max(plusProbability, 0), 1);
	
	if(Math.random() < 0.5) {
		return(1);
	}
	else {
		return(-1);
	}
}

/*•••••••••••••••••••••••••••••••••••••••
Returns a random float number between minNum (inclusive) and maxNum.

minNum / maxNum
    • Can be negative.
    • maxNum can be smaller than minNum.
•••••••••••••••••••••••••••••••••••••••*/
function randomBetween(minNum, maxNum) {
	return Math.random() * (maxNum - minNum) + minNum;
}

/*•••••••••••••••••••••••••••••••••••••••
Returns a random float number between minNum (inclusive) and maxNum that is snapped to fixed steps, with option to include maxNum.

minNum / maxNum
    • Can be negative.
    • maxNum can be smaller than minNum.
stepSize – The step interval the result should snap to (default 0).
    • Should be a positive value. Negative values will be inverted.
    • The steps are calculated starting from minNum.
    • If it is larger than the difference between the numbers, minNum is returned.
includeMax – Whether maxNum is allowed as a possible result, if it matches the interval (default false).
•••••••••••••••••••••••••••••••••••••••*/
function randomStepBetween(minNum, maxNum, stepSize = 0, includeMax = false) {	
	stepSize = Math.abs(stepSize);
    if(stepSize > 0) {
        let valueDiff = maxNum - minNum;
        var stepsBetween = Math.ceil(valueDiff / stepSize);
        
        if(stepsBetween == 0) {
            return minNum;
        }
		
		if(includeMax && stepsBetween * stepSize == valueDiff) {
            stepsBetween += 1 * Math.abs(stepsBetween)/stepsBetween;
        }
		
        var randomStep;
        if(stepsBetween < 0) {
            randomStep = Math.ceil(Math.random() * stepsBetween);
        }
        else {
            randomStep = Math.floor(Math.random() * stepsBetween);
        }
                
		return minNum + randomStep * stepSize;
	}
	return Math.random() * (maxNum - minNum) + minNum;
}

/*•••••••••••••••••••••••••••••••••••••••
Returns a random integer between 0 (inclusive) and maxNum, with option to include maxNum.

maxNum
    • Can be a float value.
    • Can be negative.
includeMax – Whether maxNum is allowed as a possible result if it is an integer (default false).
•••••••••••••••••••••••••••••••••••••••*/
function randomInt(maxNum, includeMax = false) {
    let maxSign = maxNum / Math.abs(maxNum);
    let maxInt = Math.floor(Math.abs(maxNum)) * maxSign;
    
    if(includeMax || Math.abs(maxNum) > Math.abs(maxInt)) {
        return Math.floor(Math.random() * (Math.abs(maxInt)+1)) * maxSign;
    }
    return Math.floor(Math.random() * Math.abs(maxInt)) * maxSign;
}

/*•••••••••••••••••••••••••••••••••••••••
Returns a random integer between minNum and maxNum, with option to include maxNum.
    • Returns null if no integer can be found in the given range.

minNum / maxNum
    • Can be float values.
    • Can be negative.
    • maxNum can be smaller than minNum.
    • If minNum is an integer, it is a possible result.
includeMax – Whether maxNum is allowed as a possible result if it is an integer (default false).
•••••••••••••••••••••••••••••••••••••••*/
function randomIntBetween(minNum, maxNum, includeMax = false) {
    var minInt, maxInt;
    
    if(minNum <= maxNum) {
        minInt = Math.ceil(minNum);
        maxInt = Math.floor(maxNum);
    }
    else {
        minInt = Math.floor(minNum);
        maxInt = Math.ceil(maxNum);
    }
    
    if(Math.abs(maxNum - minNum) < 1 && minNum != minInt) {
        if(maxNum == maxInt && includeMax) {
            return maxInt;
        }
        return null;
    }
    
    if(includeMax || maxNum != maxInt) {
        if(minNum <= maxNum) {
            return Math.floor(Math.random() * (maxInt + 1 - minInt) + minInt);
        }
        return Math.ceil(Math.random() * (maxInt - 1 - minInt) + minInt);
    }
    
    if(minNum <= maxNum) {
        return Math.floor(Math.random() * (maxInt - minInt) + minInt);
    }
    return Math.ceil(Math.random() * (maxInt - minInt) + minInt);
}

/*•••••••••••••••••••••••••••••••••••••••
Returns a random integer from 1 up to and including the passed number of sides.

sides – Max value to return.
    • Should be a positive integer.
    • Negative values are inverted.
    • Float values are rounded down.
    • If it is 0 or rounded to 0, the result will be 1.
•••••••••••••••••••••••••••••••••••••••*/
function diceRoll(sides = 6) {
	sides = Math.floor(Math.abs(sides));
	return 1 + Math.floor(Math.random() * sides);
}

/*•••••••••••••••••••••••••••••••••••••••
Returns a random value from a passed array, with option to assign relative probabilities for each value.

values – Array with values to pick from.
    • Values can be of any type.
    • If it is not an array, it will be returned directly.
weights – Array with relative probabilities that are mapped to the first array (default []).
    • Should be non-negative values (are not checked).
    • Can be shorter than the values array to map as a repeating pattern to values.
    • If it is not an array, values will be returned directly.
•••••••••••••••••••••••••••••••••••••••*/
function randomPick(values, weights = []) {
	if(!Array.isArray(values) || !Array.isArray(weights)) {
		return values;
	}
	
	if(weights.length > 0) {
		let pattern = [];
		var index = 0;
		while(pattern.length < values.length) {
			pattern.push(weights[index]);
			index += 1;
			index = index % weights.length;
		}
		var sum = 0;
		for(var i = 0; i < pattern.length; i++) {
			sum += pattern[i];
		}
		let factor = 1.0 / sum;
		for(i = 0; i < pattern.length; i++) {
			pattern[i] *= factor;
			if(i > 0) {
				pattern[i] += pattern[i-1];
			}
		}
		let randomValue = Math.random();
		for(i = 0; i < pattern.length; i++) {
			if(randomValue < pattern[i]) {
				return values[i];
			}
		}
	}
	
	return values[Math.floor(Math.random() * values.length)];
}

/*•••••••••••••••••••••••••••••••••••••••
Returns an array with the given number of positive random values that add up to a given sum, with options to limit the size and variance of the generated values.
    • All values in the returned array will be above 0.
    • The mean value of the result is sumOfSlices / numberOfSlices, or equal size of slices, see relevance below.
    • Uses Fisher-Yates algorithm to shuffle generated values to avoid bias.

numberOfSlices - Number of array items to generate (default 1).
    • Should be a positive integer.
    • Float values will be rounded down.
    • Values below 1 will return an empty array.
sumOfSlices – The sum the array items should add up to (default 1).
    • Should be a positive number.
    • Negative values will be inverted.
maxSpread – Allowed variance of generated values (default 1.0).
    • Expects a float value from 0–1.
    • 0 would result in all slices being of equal size (the mean value).
minSlice – Minimum slice size (default 0).
    • Should be lower than or equal to the mean value (will be clipped).
    • Negative values will be treated as 0.
maxSlice – Maximum slice size (default Number.MAX_VALUE).
    • Should be higher than or equal to the mean size (will be clipped).
•••••••••••••••••••••••••••••••••••••••*/
function randomSlices(numberOfSlices = 1, sumOfSlices = 1, maxSpread = 1.0, minSlice = 0, maxSlice = Number.MAX_VALUE) {
    numberOfSlices = Math.floor(numberOfSlices);
    if(numberOfSlices < 1) { return []; }
    
    sumOfSlices = Math.abs(sumOfSlices);
    
    let mean = sumOfSlices / numberOfSlices;
    
    minSlice = Math.min(mean, Math.max(0, minSlice));
    maxSlice = Math.max(mean, Math.min(sumOfSlices, Math.max(0, maxSlice)));
    
    maxSpread = Math.min(Math.max(maxSpread, 0), 1);
    
    minSlice = mean - (mean - minSlice) * maxSpread;
    maxSlice = mean + (maxSlice - mean) * maxSpread;
    
    var sumLeft = sumOfSlices - numberOfSlices * minSlice;
    let maxRange = maxSlice - minSlice;
    
    let slices = new Array(numberOfSlices);
    
    for(let i = numberOfSlices - 1; i > 0; i--) {
        let maxSumLeft = i * maxRange;
        let minLimit = Math.max(sumLeft - maxSumLeft, 0);
        let range = Math.min(sumLeft, maxRange) - minLimit;
        
        slices[i] = minLimit + (1 - Math.random()) * range;
        sumLeft -= slices[i];
        slices[i] += minSlice; 
	}
    slices[0] = sumLeft + minSlice;

    for(let i = slices.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [slices[i], slices[j]] = [slices[j], slices[i]];
    }
    return slices;
}

/*•••••••••••••••••••••••••••••••••••••••
Returns an ordered array with the given number of random values between start and end value, with options to limit the distance and variance of the generated values.
    • startValue and endValue will not be part of the returned array (except they are identical).
    • The mean value of the result is the absolute difference between startVal and endVal divided by (numberOfValues+1), or equal distance between generated numbers, see relevance below.
    • Uses Fisher-Yates algorithm to shuffle generated values to avoid bias.

numberOfValues – Number of array items to generate (default 1).
    • Should be a positive integer.
    • Float values will be rounded down.
    • Values below 1 will return an empty array.
startValue / endValue – Give the limits and direction of the sequence.
    • Can be negative.
    • endValue can be smaller than startValue.
    • The returned sequence is always ordered from startValue to endValue.
maxSpread Allowed variance of generated values (default 1.0).
    • Expects a float value from 0–1.
    • 0 would result in all numbers being evenly apart (with a distance of mean value).
minDist – Minimum distance between values in the series (default 0).
    • Should be lower than or equal to the mean value (will be clipped).
    • Negative values will be treated as 0.
maxDist – Maximum distance between values in the sequence (default Number.MAX_VALUE).
    • Should be higher than or equal to the mean size (will be clipped).
•••••••••••••••••••••••••••••••••••••••*/
function randomSequence(numberOfValues = 1, startValue = 0, endValue = 1, maxSpread = 1.0, minDist = 0, maxDist = Number.MAX_VALUE) {
    numberOfValues = Math.floor(numberOfValues);
    if(numberOfValues < 1) { return []; }
    
    let numberOfSlices = numberOfValues + 1;
    let sumOfSlices = Math.abs(endValue - startValue);
    
    let mean = sumOfSlices / numberOfSlices;
    
    var minSlice = Math.min(mean, Math.max(0, minDist));
    var maxSlice = Math.max(mean, Math.min(sumOfSlices, Math.max(0, maxDist)));
    
    maxSpread = Math.min(Math.max(maxSpread, 0), 1);
    
    minSlice = mean - (mean - minSlice) * maxSpread;
    maxSlice = mean + (maxSlice - mean) * maxSpread;
    
    var sumLeft = sumOfSlices - numberOfSlices * minSlice;
    let maxRange = maxSlice - minSlice;
    
    let slices = new Array(numberOfSlices);
    
    for(let i = numberOfSlices - 1; i > 0; i--) {
        let maxSumLeft = i * maxRange;
        let minLimit = Math.max(sumLeft - maxSumLeft, 0);
        let range = Math.min(sumLeft, maxRange) - minLimit;
        
        slices[i] = minLimit + (1 - Math.random()) * range;
        sumLeft -= slices[i];
        slices[i] += minSlice; 
	}
    slices[0] = sumLeft + minSlice;

    for(let i = slices.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [slices[i], slices[j]] = [slices[j], slices[i]];
    }
    
    let sequence = new Array(numberOfValues);
    
    var sign = 1;
    if(startValue > endValue) {
        sign = -1;
    }
    sequence[0] = startValue + slices[0] * sign;
    for(let i = 1; i < numberOfValues; i++) {
        sequence[i] = sequence[i-1] + slices[i] * sign;
    }
    
    return sequence;
}