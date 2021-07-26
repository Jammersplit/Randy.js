# Randy
A collection of primitive javascript functions for generating more versatile random results.

To make the bare random function in javascript more interesting and useful, you often need to modify and map the values it gives you. 

The bare random function in javascript gives you randomly generated values from 0 to 1. To make it useful in your code you often need to modify the values it gives you. Mapping the random values to another range is straightforward. But to do more interesting things like toggling some events randomly, generating specific values, or having more conrol over the probabilities of random results needs a few more steps. This collection consists of a handful of fairly simple but handy functions written in javascript. They are a convenient starting point to help modify the random function for creating a bit more useful and interesting kinds of randomness.

This can be helpful for generative or parametric design, for situations where decisions and options should be chosen randomly, or for when exceptions and outliers should be introduced more intentionally in a process.

All functions use the native `Math.random()` method in javascript, but should be easily adaptable to other languages. The functions work independently from each other and can be included individually. The functions won't do intensive checks of input parameters, so might fail if unexpected values are passed.

The functions are not bundled in a class. You could include the functions directly in your code or even extend the native `Math` class yourself.

# Reference

## coinToss()
```javascript
function coinToss(trueProbability = 0.5) { }
```

Return either `true` or `false` randomly.

Optional parameter `trueProbability` to set likelihood of returning `true`. Expects a value from `0` to `1`. `0` returns never `true`, `1` returns always `true`. Defaults to `0.5`, meaning equal probability.

```javascript
//EXAMPLES

if(coinToss()) {
  //do something randomly…
}

if(coinToss(0.9)) {
  //do mostly that…
}
else {
  //but rarely that…
}
```

## coinTossWith(headsValue, tailsValue)
```javascript
function coinTossWith(headsValue = true, tailsValue = false, headsProbability = 0.5) { }
```

Returns either `headsValue` or `tailsValue` randomly. Identical to `coinToss()`, but with two custom return values. 

Optional parameter `headsProbability` to set likelihood of returning `headsValue`, analog to `coinToss()` above.

With no parameters passed it behaves exactly like `coinToss()`.

```javascript
//EXAMPLE
let state = coinTossWith("on", "off");
```

## plusMinusOne()
```javascript
function plusMinusOne(plusProbability = 0.5) { }
```

Returns either `1` or `-1` randomly. Identical to `coinTossWith(1, -1)`. 

Optional parameter `plusProbability` to set likelihood of returning positive `1`, analog to `coinToss()` above.

Particularly helpful for geometric operations, e.g. to flip or alternate orientations of some shape, axis, model etc. That's why it is a dedicated shorthand function here.

```javascript
//EXAMPLE
//set an angle to either 45 or -45
let rotation = plusMinusOne() * 45;
```
---
## randomBetween(minNum, maxNum)
```javascript
function randomBetween(minNum, maxNum) { }
```

Returns a random float number between `minNum` and `maxNum`. Results can be equal to `minNum` but are always lower than `maxNum`. This is a basic function to map `Math.random()` (which returns values from 0 to 1) to other ranges.

```javascript
//EXAMPLE
//generate a random rotation angle
let rotation = randomBetween(0, 360);
```

## randomStepBetween(minNum, maxNum, stepSize)
```javascript
function randomStepBetween(minNum, maxNum, stepSize = 0, includeMax = false) { }
```

Returns a random float number between `minNum` and `maxNum`, but with the values snapping to an interval given by `stepSize`.

For instance, `randomStepBetween(0, 1, 0.2)` would only return the values `0`, `0.2`, `0.4`, `0.6` or `0.8`. The interval steps are always counting from the `minNum` up to the `maxNum`.

The optional fourth parameter controls if `maxNum` should be included in the results, if it fits the interval (`false` by default). Adding `true` to the above, `randomStepBetween(0, 1, 0.2, true)` thus would also return `1.0`. 

The default value for `stepSize` is `0`, meaning it behaves exactly like `randomBetween()`.

> Due to floating point tolerance issues in javascript, the actual return values can be minimally off the exact interval.

```javascript
//EXAMPLE
//generate an odd number
let odd = randomBetween(1, 100, 2);
```
---
## randomInt(maxNum)
```javascript
function randomInt(maxNum) { }
```

## randomIntBetween(minNum, maxNum)
```javascript
function randomIntBetween(minNum, maxNum, includeMax = false) { }
```

## diceRoll(sides)
```javascript
function function diceRoll(sides = 6) { }
```
---
## randomPick(values)
```javascript
function randomPick(values, weights = []) { }
```

Returns a random value from a given set of distinct values. Parameter `values` is expected to be an array of arbitrary length and content. One of the array elements is returned randomly. If `values` is not an array, it will be returned.

The optional parameter `probabilityPattern` allows to pass a second array that serves as a map of probability ratios for the input values. It's expected to be an array of non-negative numbers. But it's length can be different from the first array. The numbers are mapped to the input values in the first parameter from left to right, repeatedly until all input values have a probability value assigned. If it's longer than the first array, excess values are ignored. The numbers are taken as probability proportions to each other, so `[1,2,1,4,10]` is read as 1:2:1:4:10 for instance (so the 2nd value is two times as likely as the 1st and 3rd, the 5th is 10 times as likely as the 1st and 5 times as likely as the 2nd and so on).

---
## randomSlices(numberOfSlices)
```javascript
function randomSlices(numberOfSlices, sumOfSlices = 1, maxSpread = 1.0) { }
```

Returns an array of length `numberOfSlices`, filled with positive random numbers that add up to `sumOfSlices`. Think a random pie chart.

`numberOfSlices` should be any positive integer. Float numbers are rounded to the next smallest integer.

`sumOfSlices` can be any positive number. Default value of `sumOfSlices` is 1, meaning the sum of all values in the array will be 1.

The optional third parameter `maxSpread` controls how much difference is allowed among the generated array values. Expects a value from `0` to `1`, with `0` meaning all array values will be identical and `1` meaning the largest possible variance is allowed. Default value is `1`.

> The function will not return 0 as one of the values. Due to rounding issues, the actual sum of the returned array values can be minimally higher or lower than the target sum.

```javascript
//EXAMPLE
```

## randomSequence(numberOfValues)
```javascript
function randomSequence(numberOfValues, startValue = 0.0, endValue = 1.0, maxSpread = 1.0) { }
```

Returns an array of length `numberOfValues`, filled with an ordered sequence of values between `startValue` and `endValue`. Think getting a number of points on a graph.

`numberOfValues` should be any positive integer. Float numbers are rounded to the next smallest integer.

`startValue` and `endValue` can be any number, also negative numbers, and `startValue` doesn't have to be larger than `endValue`. Default range is `0` to `1`.

The optional fourth parameter `maxSpread` controls how much difference is allowed among the generated array values. Expects a value from `0` to `1`, with `0` meaning all array values will be evenly apart and `1` meaning the largest possible variance is allowed. Default value is `1`.

> The function will not return `startValue` or `endValue` as one of the values.

```javascript
//EXAMPLE
```
---
## More Examples and Use Patterns
### Combine picking distinct values and a random range
```javascript
//Return either exactly 0 or a random value between -1 and 1
let result = randomSelect([0, randomBetween(-1,1)]);
```
### Pick values to assign
```javascript
let color = coinToss() ? "black" : "white";
let color = coinTossWith("black", "white");

let color = randomPick(["red", "green", "blue"]);
```
### Switch cases
```javascript
//
```
### Align to a grid
```javascript
let gridSize = 0.5;
let xPos = ;
let yPos = ;
```
### Divide into sections
```javascript
//
```
### Flip
```javascript
//angle flipping
```
### Dynamically change probability
```javascript
//change probability with cursor
```
