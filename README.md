![gradient5](https://github.com/Jammersplit/Randy.js/assets/16501077/e8fe35d0-c6c7-4f8b-8424-4a023f6dc963)
> Cover image uses `coinToss()` to control color and size of circles with a varying probability depending on x/y coordinates.


# Randy.js
A collection of primitive javascript functions for generating versatile random results.

The default random function in JavaScript generates values from 0 to 1. To make these values useful in your code, you often need to modify them. Mapping random results to another range is straightforward. But it can be less trivial to do more interesting things, like toggling events randomly, generating very specific random values, or using dynamic probabilities for random results. This collection contains a few fairly simple but handy random generator functions that might be a helpful starting point for creating more useful and interesting kinds of randomness. These could be useful for applications of generative or parametric design, to randomize decisions and options, or for when exceptions and outliers should be introduced more intentionally in a process.

The functions are written in JavaScript and use the native `Math.random()` method, but should be easy to adapt to other languages. The functions work independently from each other and can be included individually. The functions don't do intensive checks of the input parameters, so might fail if unexpected values are passed.

The functions are not bundled in a class. You can include the functions directly in your code or extend the native JavaScript `Math` class yourself.

# Reference

* [coinToss(*trueProbability*)](#cointosstrueprobability)
* [coinTossWith(headsValue, tailsValue, *headsProbability*)](#cointosswithheadsvalue-tailsvalue-headsprobability)

## coinToss(*trueProbability*)
```javascript
function coinToss(trueProbability = 0.5) { }
```

Return either `true` or `false` randomly.

Optional parameter `trueProbability` to set likelihood of returning `true`. Expects a value from `0` to `1`. `0` never returns `true`, `1` always returns `true`. Defaults to `0.5`, meaning equal probability.

```javascript
//EXAMPLE

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

## coinTossWith(headsValue, tailsValue, *headsProbability*)
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

## plusMinusOne(*plusProbability*)
```javascript
function plusMinusOne(plusProbability = 0.5) { }
```

Returns either `1` or `-1` randomly. Identical to `coinTossWith(1, -1)`. 

Optional parameter `plusProbability` to set likelihood of returning positive `1`, analog to `coinToss()` above.

Particularly helpful as a shorthand function for geometric operations, e.g. to flip or alternate orientations of some shape, axis, model etc.

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

Returns a random float number between `minNum` and `maxNum`. Results can be equal to `minNum` but are always lower than `maxNum`. This is a basic function to map `Math.random()` to other ranges than 0–1.

```javascript
//EXAMPLE

//generate a random angle
let rotation = randomBetween(0, 360);
```

## randomStepBetween(minNum, maxNum, stepSize, *includeMax*)
```javascript
function randomStepBetween(minNum, maxNum, stepSize = 0, includeMax = false) { }
```

Returns a random float number between `minNum` and `maxNum`, but with the values snapping to an interval given by `stepSize`.

For instance, `randomStepBetween(0, 1, 0.2)` would only return the values `0`, `0.2`, `0.4`, `0.6` or `0.8`. The interval steps are always counting from `minNum` up to `maxNum`.

The optional fourth parameter controls if `maxNum` should be included in the results, if it fits the interval (`false` by default). Adding `true` to the above, `randomStepBetween(0, 1, 0.2, true)` thus would additionally return `1.0`. 

The default value for `stepSize` is `0`, meaning the function behaves exactly like `randomBetween()`.

> Due to floating point tolerance issues in javascript, the actual return values can be minimally off the exact interval.

```javascript
//EXAMPLE

//generate an odd random number only
let odd = randomBetween(1, 100, 2);
```
---
## randomInt(maxNum)
```javascript
function randomInt(maxNum) { }
```

Returns a random integer from `0` to, but not including, `maxNum`.

```javascript
//EXAMPLE

//get a random array item
let item = myArray[randomInt(myArray.length)];
```

## randomIntBetween(minNum, maxNum, *includeMax*)
```javascript
function randomIntBetween(minNum, maxNum, includeMax = false) { }
```

Returns a random integer from `minNum` to `maxNum`.

Optional third parameter to include `maxNum` in the results (`false` by default).

```javascript
//EXAMPLE

//get an integer angle in a range
let angle = randomIntBetween(-30, 30, true);
```

## diceRoll(*sides*)
```javascript
function function diceRoll(sides = 6) { }
```

Returns a random integer from `1` to the passed number of `sides`, including this number (`6` by default). Identical to `randomIntBetween(1, sides, true)`.

```javascript
//EXAMPLE

//repeat something up to 10 times
let repetitions = diceRoll(10);

for(var i = 0; i < repetitions; i++) {
  //…
}
```

---
## randomPick(values, *weights*)
```javascript
function randomPick(values, weights = []) { }
```

Returns one random value from a given array of `values`.

Optional second parameter `weights` to pass an array of relative weights that are mapped as probabilities to the input array. These should be non-negative numbers of any value. Their relation defines the likelihood of the matching `values` to be returned.

For instance, `randomPick(["a", "b", "c"], [2, 1, 0.2])` would return `"a"` two times more likely than `"b"` and ten times more likely than `"c"`. Similarly, `"b"` is returned five times more likely than `"c"`. `0` in the second array would mean that the corresponding value in the first array will never be returned.

The `weights` array can be shorter in length than `values`. If that's the case, the `weights` sequence is cycled through repeatedly and the numbers are matched to the `values` from left to right until all `values` have a probability value assigned. If `weights` is longer than the first array, excess values are just ignored.

> If `values` or `weights` are not arrays, `values` will be returned directly.

```javascript
//EXAMPLE

//get one of the angles from the list with multiples of 90° to be two times as likely
let angle = randomPick([0, 45, 90, 135, 180, 225, 270, 315], [2, 1]);
```

---
## randomSlices(numberOfSlices, *sumOfSlices*, *maxSpread*)
```javascript
function randomSlices(numberOfSlices, sumOfSlices = 1, maxSpread = 1.0) { }
```

Returns an array of length `numberOfSlices`, filled with positive random numbers that add up to `sumOfSlices`. Think getting sections of a line.

`sumOfSlices` can be any positive number. Default value of `sumOfSlices` is 1, meaning the sum of all values in the returned array will be 1.

The optional third parameter `maxSpread` controls how much difference is allowed among the generated array values. Expects a value from `0` to `1`, with `0` meaning all array values will be identical and `1` meaning the largest possible variance is allowed. Default value is `1`.

> `numberOfSlices` should be any positive integer. Float numbers are rounded to the next smallest integer.

> The function will never return 0 as one of the values in the array.

> Due to rounding issues, the actual sum of the returned array values can be minimally higher or lower than the target sum.

```javascript
//EXAMPLE

//get a list of diameters to stack 100 circles together that fill a space of width
let diameters = randomSlices(100, width);
```

## randomSequence(numberOfValues, *startValue*, *endValue*, *maxSpread*)
```javascript
function randomSequence(numberOfValues = 1, startValue = 0.0, endValue = 1.0, maxSpread = 1.0) { }
```

Returns an array of length `numberOfValues`, filled with an ordered sequence of values between `startValue` and `endValue`. Think getting points on a line.

`startValue` and `endValue` can be any number, also negative numbers, and `startValue` doesn't have to be larger than `endValue`. Default range is `0` to `1`.

The optional fourth parameter `maxSpread` controls how much difference is allowed among the generated array values. Expects a value from `0` to `1`, with `0` meaning all array values will be evenly apart and `1` meaning the largest possible variance is allowed. Default value is `1`.

> `numberOfValues` should be any positive integer. Float numbers are rounded to the next smallest integer.

> The function will not return `startValue` or `endValue` as one of the values in the array.

```javascript
//EXAMPLE

//get angles of a circle to draw a random pie chart
let pieAngles = randomSequence(5, 360);
```
---
## More Examples and Use Patterns
### Combining random functions
```javascript
//Return either exactly 0 or a random value between -1 and 1
let result = randomSelect([0, randomBetween(-1, 1)]);
```
### Pick options to assign
```javascript
let color = coinToss() ? "black" : "white";
let color = coinTossWith("black", "white");

let color = randomPick(["red", "green", "blue"]);
```
### Switch cases
```javascript
switch(randomInt(4)) {
  case 0:
    //do something
  case 1:
    //do something else
  case 2:
    //or do this
  case 3:
    //or this
```
### Align to a grid
```javascript
let gridSize = 5;
let xPos = randomStepBetween(0, 100, gridSize);
let yPos = randomStepBetween(0, 100, gridSize);
```
### Dynamic probabilities
```javascript
//change color probability based on the pixel's x coordinate to create a noisy gradient
for(var x = 0; x < width; x++) {
  for(var y = 0; y < height; y++) {
    pixels[x][y] = coinTossWith("black", "white", x / width);
  }
}
```
