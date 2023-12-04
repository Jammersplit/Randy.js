![gradient5](https://github.com/Jammersplit/Randy.js/assets/16501077/e8fe35d0-c6c7-4f8b-8424-4a023f6dc963)
> Cover image uses `coinToss()` to control color and size of dots with varying probability depending on their x/y coordinates.


# Randy.js
A collection of primitive JavaScript functions for generating versatile random results.

The default random function in JavaScript generates values from 0 to 1. To make these values useful for coding, you often need to modify them. Mapping random results to another range is straightforward. But it can be less trivial to do more interesting things, like generating very specific random values or using dynamic probabilities for random results.

This collection contains a few fairly simple but handy random generator functions that might be a helpful starting point for creating more useful and interesting kinds of randomness. They might be used in generative or parametric design projects, for game mechanics, to randomize decisions and options, or to intentionally introduce exceptions and outliers to a process.

The functions are written in JavaScript and use the native `Math.random()` method, but should be easy to adapt to other languages. The functions work independently from each other and can be included individually.

The functions are not bundled in a class. You can include the functions directly in your code or extend the native JavaScript `Math` class yourself.

# Reference

* [coinToss()](#cointosstrueprobability) – Returns true or false, with option to adjust probabilities.
* [coinTossWith()](#cointosswithheadsvalue-tailsvalue-headsprobability) – Returns one of two values, with option to adjust probabilities.
* [plusMinusOne()](#plusminusoneplusprobability) – Returns 1 or -1, with option to adjust probabilities.
* [randomBetween()](#randombetweenminnum-maxnum) – Returns random value between two numbers.
* [randomStepBetween()](#randomstepbetweenminnum-maxnum-stepsize-includemax) – Returns random value between two numbers, snapped to a fixed interval.
* [randomInt()](#randomintmaxnum-includemax) – Returns random integer between 0 and a number.
* [randomIntBetween()](#randomintbetweenminnum-maxnum-includemax) – Returns random integer between two numbers.
* [diceRoll()](#dicerollsides) – Returns random positive integer from 1 up to a number.
* [randomPick()](#randompickvalues-weights) – Returns random value from an array, with option to set relative probabilities of values.
* [randomSlices()](#randomslicesnumberofslices-sumofslices-maxspread-minslice-maxslice) – Returns a list of random numbers that add up to a given sum, with options to limit variance and size of values.
* [randomSequence()](#randomsequencenumberofvalues-startvalue-endvalue-maxspread-mindist-maxdist) – Returns an ordered list of numbers between two numbers, with options to limit variance and distance of values.

[More Examples](#more-examples)

---

## coinToss(*trueProbability*)
```javascript
function coinToss(trueProbability = 0.5) { }
```

Returns either `true` or `false` randomly.

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

Particularly helpful as a shorthand function for geometric operations, e.g. to flip or alternate orientations or directions etc.

```javascript
//set rotation angle to either 45° or -45°
let rotation = plusMinusOne() * 45;
```
---
## randomBetween(minNum, maxNum)
```javascript
function randomBetween(minNum, maxNum) { }
```

Returns a random float number between `minNum` (inclusive) and `maxNum` (exclusive).

`minNum` and `maxNum` can be negative. `maxNum` can be smaller than `minNum`.

This is a basic function to map `Math.random()` to other ranges than `0–1`.

```javascript
//generate a random rotation angle
let rotation = randomBetween(0, 360);
```

## randomStepBetween(minNum, maxNum, stepSize, *includeMax*)
```javascript
function randomStepBetween(minNum, maxNum, stepSize = 0, includeMax = false) { }
```

Returns a random float number between `minNum` (inclusive) and `maxNum` that is snapped to a fixed interval given by `stepSize`. The interval steps are always counted starting from `minNum` to `maxNum`.
```javascript
randomStepBetween(0, 1, 0.2) //output: 0, 0.2, 0.4, 0.6, 0.8
```

`minNum` and `maxNum` can be negative. `maxNum` can be smaller than `minNum`.

Parameter `stepSize` should be non-negative. Negative values will be inverted. The default is `0`, which would make the function behave like `randomBetween()`. A `stepSize` larger than the difference between the input numbers will always return `minNum`.

The optional parameter `includeMax` controls whether `maxNum` is allowed as a result, if it matches the interval (`false` by default).
```javascript
randomStepBetween(0, 1, 0.2, true) //output: 0, 0.2, 0.4, 0.6, 0.8, 1
```

> Due to floating point tolerance issues in JavaScript, the actual return values can be minimally off the exact interval.

```javascript
//generate only odd random numbers (1, 3, 5, …, 99)
let odd = randomBetween(1, 100, 2);
```
---
## randomInt(maxNum, *includeMax*)
```javascript
function randomInt(maxNum, includeMax = false) { }
```

Returns a random integer between `0` (inclusive) and `maxNum`.

`maxNum` can be a float value and can be negative.

Optional parameter `includeMax` controls whether `maxNum` is allowed as a result if it is an integer (`false` by default).

> As `maxNum` can be a float value, `includeMax` will include the closest integer not smaller or larger than `maxNum` in the results. Effectively, this means `includeMax` only makes a difference if `maxNum` is exactly an integer:
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

Returns a random integer between `minNum` and `maxNum`.

Compared to other common implementations for such a function that I found, this one is the most flexible I could come up with:
* `minNum` and `maxNum` can be float values. They will be rounded correctly to the closest integer within the interval between the values (not only the closest integer).
* `minNum` and `maxNum` can be negative. Some other implementations incorrectly round float values in negative ranges.
* `maxNum` can be smaller than `minNum`.

`minNum` is included in the possible results if it is an integer.

Optional parameter `includeMax` controls whether `maxNum` is allowed as a result if it is an integer (`false` by default). This parameter always applies to `maxNum`, not the higher of the two input parameters.

Returns `null` if no integer can be found in the given range.

> As `maxNum` can be a float value, `includeMax` will include the closest integer not smaller or larger than `maxNum` in the results. Effectively, this means `includeMax` only makes a difference if `maxNum` is exactly an integer. Analog to `randomInt()` above.
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

> If `minNum` or `maxNum` are float values, they are rounded correctly to the closest integer within the range between the input values:
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

Returns a random integer from `1` (inclusive) up to the passed number of `sides` (inclusive, `6` by default). Similar to `randomIntBetween(1, sides, true)`.

Parameter `sides` should be a positive integer. Negative values will be inverted. Float values will be rounded down. When `sides` is `0` or rounded to `0`, the result will always be `1`.

> To do the same but include `0`, use `randomInt(sides, true)`. To make custom dice, use `randomPick([side1, side2, …])`.

```javascript
//repeat something up to 10 times
let numReps = diceRoll(10);

for(var i = 0; i < numReps; i++) {
  //…
}
```

---
## randomPick(values, *weights*)
```javascript
function randomPick(values, weights = []) { }
```

Returns a random value from an array of possible `values`, with option to assign probabilities for each value.

Parameter `values` should be an array with values of any type.

Optional parameter `weights` allows to pass an array of relative weights that are mapped as probabilities to the array of `values`. These should be non-negative numbers. Their relation defines the likelihood of the matching `values` to be returned.

For instance, `randomPick(["a", "b", "c"], [2, 1, 0.2])` would return `"a"` two times more likely than `"b"` (2:1) and ten times more likely than `"c"` (2:0.2). Similarly, `"b"` is returned five times more likely than `"c"` (1:0.2).

A value of `0` in the second array would result in the corresponding value in the first array to never be returned.

The `weights` array can be shorter in length than `values`. If that's the case, the `weights` sequence is cycled through repeatedly and matched to the `values` from left to right until all values in the first array have a weight assigned. If `weights` is longer than the first array, excess values are ignored.

If the `weights` array is empty (default) or has only one value, each of the `values` are picked with the same probability.

> If `values` or `weights` are not arrays, `values` will be returned directly.

> The `weights` array is not checked for negative values. Having negative values might result in errors.

```javascript
//return -1 or 1 equally, and rarely 0
let direction = randomPick([-1, 1, 0], [1, 1, 0.01]);

//get one of the angles from the list, but make multiples of 90° two times more likely
let angle = randomPick([0, 45, 90, 135, 180, 225, 270, 315], [2, 1]);
```

---
## randomSlices(*numberOfSlices*, *sumOfSlices*, *maxSpread*, *minSlice*, *maxSlice*)
```javascript
function randomSlices(numberOfSlices = 1, sumOfSlices = 1, maxSpread = 1.0, minSlice = 0, maxSlice = Number.MAX_VALUE) { }
```

Returns an array with length `numberOfSlices`, filled with positive random numbers that add up to `sumOfSlices`. Think of dividing a line with a fixed length into a number of random sections.
```
                    sumOfSlices

       ├───────────────────────────────────┤

       ╰─┬─╯╰──┬──╯╰┬╯ ... ╰───────┬───────╯
Array
Index    0     1    2       numberOfSlices-1
```

`numberOfSlices` should be a positive integer. Float values will be rounded down. If `numberOfSlices` is `1` (default), the function will return an array with a single value of `sumOfSlices`. If `numberOfSlices` is anything below `1`, the function will return an empty array.

`sumOfSlices` should be a non-negative number. Negative values will be inverted. Default value is `1`. A sum of `0` will lead to all values in the returned array being `0`.

Optional parameter `maxSpread` controls how much variance is allowed among the generated array values. That means how much they can deviate from the *mean value*. The *mean value* is `sumOfSlices / numberOfSlices`, or the size of the slices if they would be all identical. 

`maxSpread` expects a value from `0` to `1`, with `0` meaning all slices in the returned array will be identical, and `1` meaning the largest possible variance is allowed. Default value is `1`.

Optional parameters `minSlice` and `maxSlice` allow to set lower/upper limits for the generated values, meaning the min/max size of the slices.

`minSlice` should be lower or equal to the *mean value* and will be clipped if it's higher. Negative values will be interpreted as `0`.

`maxSlice` should be larger or equal to the *mean value* and will be clipped if it's lower.

None of the values in the returned array will be `0` (except if `sumOfSlices` is `0`). All values will be positive.

> Due to rounding issues, the actual sum of the returned array values can be minimally higher or lower than the target sum.

> Notes on the algorithm:
> * The function fills the output array with random values one by one, each time removing the generated value from the target sum. For each value it makes sure to stay within the `minSlice` & `maxSlice` limits and that the leftover amount could be filled with the number of items left.
> * The parameter `maxSpread` basically moves `minSlice` & `maxSlice` closer to the mean value.
> * The function shuffles the generated array at the end with the *Fisher-Yates algorithm*. The unshuffled array would have a bias towards larger values for the array items that are generated first.

```javascript
//get a list of 5 random angles to create a pie chart
//the angles should be between 3 and 60 degrees
let pieSlices = randomSlices(5, 360, 1, 3, 60);
```

## randomSequence(*numberOfValues*, *startValue*, *endValue*, *maxSpread*, *minDist*, *maxDist*)
```javascript
function randomSequence(numberOfValues = 1, startValue = 0.0, endValue = 1.0, maxSpread = 1.0, minDist = 0, maxDist = Number.MAX_VALUE) { }
```

Returns an array with length `numberOfValues`, filled with an ordered sequence of random values between `startValue` and `endValue`. Think of getting random points on a line between two points.

```
    startValue                         endValue
          
       ├─╳─────╳────╳───────────────╳──────┤

         ┊     ┊    ┊      ...      ┊
Array
Index    0     1    2        numberOfValues-1
```


`numberOfValues` should be a positive integer. Float values will be rounded down. If `numberOfValues` is anything lower than `1`, the function returns an empty array. Default is `1`.

`startValue` and `endValue` can be any number, also negative numbers. `startValue` doesn't have to be smaller than `endValue`. Default range is `0` to `1`.

Note that `startValue` and `endValue` will not be part of the returned array (except if they are identical).

Optional parameter `maxSpread` controls how much variance is allowed for the distances between the generated array values.

`maxSpread` expects a value from `0` to `1`, with `0` meaning all values in the returned array will be evenly apart, and `1` meaning the largest possible variance of distances between values is allowed. Default value is `1`.

Optional parameters `minDist` and `maxDist` allow to set lower/upper limits for the distances between generated values. The values in the sequence will be at least `minDist` apart, the maximum distance between values will be `maxDist`.

`minDist` should be lower or equal to the *mean value* and will be clipped if it's higher. Negative values will be interpreted as `0`.

`maxDist` should be higher or equal to the *mean value* and will be clipped if it's lower.

> The *mean value* is the distance between the points in the sequence if they would be evenly apart. It's the absolute (positive) difference between `startVal` and `endVal` divided by `numberOfValues + 1`. `randomSequence(4, 0, 10)` would have a *mean value* of `2`, for instance, as `4` points evenly spread between `0` and `10` would be `2` apart from each other and the boundaries.

> Notes on the algorithm:
> * The function uses the same algorithm as `randomSlices()` above. This time the difference between `startValue` and `endValue` is divided into `numberOfValues+1` slices (because 3 points on a line create 4 sections, for instance). The size of the slices is then just added to `startValue` to create the sequence.
> * Like `randomSlices()` it also shuffles the array values befor creating the ordered sequence.

```javascript
//get a list of random x-coordinates for drawing individual letters of a word across the screen
//let the distances between the coordinates be at least 10 pixels and at max a third of the screen width
let text = "RANDOM";
let xPos = randomSequence(text.length, screenWidth, 1, 10, screenWidth / 3);
//…
```
---
## More Examples
### Combine random functions
```javascript
//return either exactly 0 or a random value between -1 and 0 or 1 and 0
let result = randomPick([0, randomBetween(-1, 0), randomBetween(1, 0)]);

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
### Random choices
```javascript
if(coinToss()) {
  //do this
}
else {
  //do that
}

switch(randomInt(4)) {
  case 0:
    //do this
  case 1:
    //or do that
  case 2:
    //or do this
  case 3:
    //or that
```
### Align to grid
```javascript
//get a random position in a grid
let gridSize = 5;
let xPos = randomStepBetween(0, 100, gridSize);
let yPos = randomStepBetween(0, 100, gridSize);
//…

//create a wobbly grid of items with random deviations from the regular grid positions
let gridSize = 5;
let deviation = 0.3;
for(var x = 0; x < 10; x++) {
  for(var y = 0; y < 10; y++) {
    let xPos = x * gridSize + plusMinusOne() * randomBetween(0, deviation) * gridSize;
    let yPos = y * gridSize + plusMinusOne() * randomBetween(0, deviation) * gridSize;
    //…
  }
}
```
### Dynamic probabilities
```javascript
//reduce probability of something every time it is called
var probability = 0.5;
//…
if(coinToss(probability)) {
  //do something
  probability *= 0.95;
}

//change probability of color selection based on pixel's x-coordinate
//creates a noisy two-color gradient
for(var x = 0; x < width; x++) {
  for(var y = 0; y < height; y++) {
    pixels[x][y] = coinTossWith("black", "white", x / width);
  }
}
```
