![gradient5](https://github.com/Jammersplit/Randy.js/assets/16501077/e8fe35d0-c6c7-4f8b-8424-4a023f6dc963)
> Cover image uses `coinToss()` to control color and size of circles with a varying probability depending on their x/y coordinates.


# Randy.js
A collection of primitive javascript functions for generating versatile random results.

The default random function in JavaScript generates values from 0 to 1. To make these values useful in your code, you often need to modify them. Mapping random results to another range is straightforward. But it can be less trivial to do more interesting things, like generating very specific random values or using dynamic probabilities for random results.

This collection contains a few fairly simple but handy random generator functions that might be a helpful starting point for creating more useful and interesting kinds of randomness. They might be used in generative or parametric design projects, to randomize decisions and options, or to intentionally introduce exceptions and outliers to a process.

The functions are written in JavaScript and use the native `Math.random()` method, but should be easy to adapt to other languages. The functions work independently from each other and can be included individually.

The functions are not bundled in a class. You can include the functions directly in your code or extend the native JavaScript `Math` class yourself.

# Reference

* [coinToss(*trueProbability*)](#cointosstrueprobability)
* [coinTossWith(headsValue, tailsValue, *headsProbability*)](#cointosswithheadsvalue-tailsvalue-headsprobability)
* [plusMinusOne(*plusProbability*)](#plusminusoneplusprobability)
* [randomBetween(minNum, maxNum)](#randombetweenminnum-maxnum)
* [randomStepBetween(minNum, maxNum, *stepSize*, *includeMax*)](#randomstepbetweenminnum-maxnum-stepsize-includemax)
* [randomInt(maxNum, *includeMax*)](#randomintmaxnum-includemax)
* [randomIntBetween(minNum, maxNum, *includeMax*)](#randomintbetweenminnum-maxnum-includemax)
* [diceRoll(*sides*)](#dicerollsides)
* [randomPick(values, *weights*)](#randompickvalues-weights)
* [randomSlices(*numberOfSlices*, *sumOfSlices*, *maxSpread*)](#randomslicesnumberofslices-sumofslices-maxspread)
* [randomSequence(*numberOfValues*, *startValue*, *endValue*, *maxSpread*)](#randomsequencenumberofvalues-startvalue-endvalue-maxspread)
* [More Examples](#more-examples)

## coinToss(*trueProbability*)
```javascript
function coinToss(trueProbability = 0.5) { }
```

Return either `true` or `false` randomly.

Optional parameter `trueProbability` to set likelihood of returning `true`. Expects a value from `0` to `1`. `0` never returns `true`, `1` always returns `true`. Defaults to `0.5`, meaning equal probability.

```javascript
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
//set one of two defined states randomly
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
//set rotation angle to either 45° or -45°
let rotation = plusMinusOne() * 45;
```
---
## randomBetween(minNum, maxNum)
```javascript
function randomBetween(minNum, maxNum) { }
```

Returns a random float number between `minNum` and `maxNum`. Results can be equal to `minNum` but are always lower than `maxNum`. This is a basic function to map `Math.random()` to other ranges than 0–1.

```javascript
//generate a random rotation angle
let rotation = randomBetween(0, 360);
```

## randomStepBetween(minNum, maxNum, stepSize, *includeMax*)
```javascript
function randomStepBetween(minNum, maxNum, stepSize = 0, includeMax = false) { }
```

Returns a random float number between `minNum` and `maxNum`, but with the return values snapping to a fixed interval given by `stepSize`. The interval steps are always counted starting from `minNum` to `maxNum`.
```javascript
randomStepBetween(0, 1, 0.2) //output: 0, 0.2, 0.4, 0.6, 0.8
```

`minNum` and/or `maxNum` can be negative. `maxNum` can be smaller than `minNum`.

Optional parameter `stepSize` should be non-negative. Negative values will be inverted. The default is `0`, which would make the function behave like `randomBetween()`. A `stepSize` larger than the difference between the input numbers will always return `minNum`.

The optional fourth parameter `includeMax` controls if `maxNum` should be included in the results, if it fits the interval (`false` by default).
```javascript
randomStepBetween(0, 1, 0.2, true) //output: 0, 0.2, 0.4, 0.6, 0.8, 1
```

> Due to floating point tolerance issues in javascript, the actual return values can be minimally off the exact interval.

```javascript
//generate only odd random numbers (1, 3, 5, …, 99)
let odd = randomBetween(1, 100, 2);
```
---
## randomInt(maxNum, *includeMax*)
```javascript
function randomInt(maxNum, includeMax = false) { }
```

Returns a random integer between `0` and `maxNum`, with `maxNum` not included by default.

Note that `maxNum` can be a float value and can also be negative.

Optional second parameter `includeMax` to include `maxNum` in the results (`false` by default).

> To be precise: As `maxNum` can be a float, `includeMax` will include the closest integer not smaller or larger than `maxNum` in the results. Effectively, this means `includeMax` only makes a difference if `maxNum` is exactly an integer:
```javascript
randomInt(2.4)       //output: 0, 1, 2
randomInt(2.4, true) //output: 0, 1, 2

randomInt(3)         //output: 0, 1, 2
randomInt(3, true)   //output: 0, 1, 2, 3
```

```javascript
//get a random array item
let item = myArray[randomInt(myArray.length)];
```

## randomIntBetween(minNum, maxNum, *includeMax*)
```javascript
function randomIntBetween(minNum, maxNum, includeMax = false) { }
```

Returns a random integer between `minNum` and `maxNum`, with `maxNum` not included by default.

Compared to other common implementations for such a function that I found, this one is the most flexible I could come up with:
* `minNum` and/or `maxNum` can be float values. They will be rounded to the closest integer within the interval between the values.
* `minNum` and/or `maxNum` can be negative. Some other implementations incorrectly round float values in negative ranges.
* `maxNum` can be smaller than `minNum`.

Optional third parameter `includeMax` to include `maxNum` in the results (`false` by default). This parameter always applies to `maxNum`, not the higher of the two input parameters.

> To be precise again: As `maxNum` can be a float, `includeMax` will include the closest integer not smaller or larger than `maxNum` in the results. Effectively, this means `includeMax` only makes a difference if `maxNum` is exactly an integer. Analog to `randomInt()` above.
```javascript
randomIntBetween(-1.2, 2.6)       //output: -1, 0, 1, 2
randomIntBetween(-1.2, 2.6, true) //output: -1, 0, 1, 2

randomIntBetween(-1.2, 3)         //output: -1, 0, 1, 2
randomIntBetween(-1.2, 3, true)   //output: -1, 0, 1, 2, 3
```

> The order of `minNum` and `maxNum` implies the 'direction' from which the values are created, and which end is effected by `includeMax`:
```javascript
randomIntBetween(1, 4) //output: 1, 2, 3
randomIntBetween(4, 1) //output: 4, 3, 2

randomIntBetween(1, 4, true) //output: 1, 2, 3, 4
randomIntBetween(4, 1, true) //output: 4, 3, 2, 1
```

> If `minNum` is a float value, it will not just be rounded to the closest integer, but the closest integer within the range between the input values:
```javascript
randomIntBetween(-1.5, 2.5)  //output: -1, 0, 1, 2
randomIntBetween(-1.5, -4.3) //output: -2, -3, -4
```

```javascript
//get an integer angle in a range
let angle = randomIntBetween(-30, 30, true);
```

## diceRoll(*sides*)
```javascript
function function diceRoll(sides = 6) { }
```

Returns a random integer from `1` up to the passed number of `sides`, including this number (`6` by default). Similar to `randomIntBetween(1, sides, true)`.

`sides` should be a positive integer. Negative values will be inverted. Float values will then be rounded to the next lowest integer. When `sides` is `0` or rounded to `0`, the result will always be `1`.

> To do the same but include `0`, use `randomInt(sides, true)`. To make custom dice, use `randomPick([side1, side2, …])`.

```javascript
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

Returns a random value from a given array of possible `values`.

Optional second parameter `weights` allows to pass an array of relative weights that are mapped as probabilities to the array of `values`. These should be non-negative numbers. Their relation defines the likelihood of the matching `values` to be returned.

For instance, `randomPick(["a", "b", "c"], [2, 1, 0.2])` would return `"a"` two times more likely than `"b"` (2:1) and ten times more likely than `"c"` (2:0.2). Similarly, `"b"` is returned five times more likely than `"c"` (1:0.2). A value of `0` in the second array would result in the corresponding value in the first array to never be returned.

The `weights` array can be shorter in length than `values`. If that's the case, the `weights` sequence is cycled through repeatedly and matched to the `values` from left to right until all `values` have a weight value assigned. If `weights` is longer than the first array, excess values are ignored.

If the `weights` array is empty (default) or has only one value, each of the `values` are picked with the same propability.

> If `values` or `weights` are not arrays, `values` will be returned directly.

> The `weights` array is not checked for negative values. Having negative values might create errors.

```javascript
//return -1 or 1 equally, and rarely 0
let direction = randomPick([-1, 1, 0], [1, 1, 0.01]);

//get one of the angles from the list, but make multiples of 90° two times more likely
let angle = randomPick([0, 45, 90, 135, 180, 225, 270, 315], [2, 1]);
```

---
## randomSlices(*numberOfSlices*, *sumOfSlices*, *maxSpread*)
```javascript
function randomSlices(numberOfSlices = 1, sumOfSlices = 1, maxSpread = 1.0) { }
```

Returns an array with length `numberOfSlices`, filled with positive random numbers that add up to `sumOfSlices`. Think getting random sections of a line with a length of sum.

`numberOfSlices` should be a positive integer. Float values will be rounded to the next lowest integer. If `numberOfSlices` is `1` (default), the function will return an array with a single value of `sumOfSlices`. If `numberOfSlices` is anything below `1`, the function will return an empty array.

`sumOfSlices` should be any positive number. Default value is `1`, meaning the sum of all values in the returned array will be `1`. Negative values will be inverted. A sum of `0` will lead to `0` for all values in the returned array.

The optional third parameter `maxSpread` controls how much difference is allowed among the generated array values. Expects a value from `0` to `1`, with `0` meaning all slices in the returned array will be identical, and `1` meaning the largest possible variance between slices is allowed. Default value is `1`.

None of the values in the returned array will be `0` (except if `sumOfSlices` is `0`).

> Due to rounding issues, the actual sum of the returned array values can be minimally higher or lower than the target sum.

```javascript
//BETTER EXAMPLE
//get a list of 100 random sections of the screen width
let sections = randomSlices(100, width);
```

## randomSequence(*numberOfValues*, *startValue*, *endValue*, *maxSpread*)
```javascript
function randomSequence(numberOfValues = 1, startValue = 0.0, endValue = 1.0, maxSpread = 1.0) { }
```

Returns an array with length `numberOfValues`, filled with an ordered sequence of values between `startValue` and `endValue`. Think getting random points on a line from start to end.

`numberOfValues` should be a positive integer. Float values will be rounded to the next lowest integer. If `numberOfValues` is anything lower than `1`, the function returns an empty array. Default is `1`.

`startValue` and `endValue` can be any number, also negative numbers. `startValue` doesn't have to be smaller than `endValue`. Default range is `0` to `1`.

Note that `startValue` and `endValue` will not be part of the returned array (except if they are identical).

The optional fourth parameter `maxSpread` controls how much difference is allowed among the generated array values. Expects a value from `0` to `1`, with `0` meaning all values in the returned array will be evenly apart, and `1` meaning the largest possible variance between values is allowed. Default value is `1`.

```javascript
//get a list of random angles of a circle to draw a pie chart
let pieAngles = randomSequence(5, 360);
```
---
## More Examples
### Combine random functions
```javascript
//return either exactly 0 or a random value between -1 and 1
let result = randomPick([0, randomBetween(-1, 1)]);

//return either a random low (0-0.1) or high value (0.9-1)
let edgeVal = randomPick(randomBetween(0, 0.1), randomBetween(0.9, 1));

//get a random number of randomly sized sections for a pie chart
let pieSections = randomSlices(randomIntBetween(2, 10), 360);
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
### Align to grid
```javascript
let gridSize = 5;
let xPos = randomStepBetween(0, 100, gridSize);
let yPos = randomStepBetween(0, 100, gridSize);
```
### Dynamic probabilities
```javascript
//change probability color selection based on the pixel's x coordinate to create a noisy two-color gradient
for(var x = 0; x < width; x++) {
  for(var y = 0; y < height; y++) {
    pixels[x][y] = coinTossWith("black", "white", x / width);
  }
}
```
