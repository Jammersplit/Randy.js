# Randy
A collection of primitive javascript functions for generating handy and versatile random results.

Working with the bare random function in programming rarely leads to much interesting results. Often you need to randomly generate quite specific values, toggle some events randomly, or want to have more control over the probability of certain random results. This is helpful for instance in creating generative forms with controlled random parameters in parametric visual or 3D design, generally in situations where decisions and options should be chosen randomly, or where exceptions and outliers should be introduced more intentionally in a process.

This collection consists of a handful of fairly simple functions written in javascript. They help to make it more convenient to modify standard random function results for creating a bit more useful and interesting randomness.

All functions use the native `Math.random()` method in javascript. The functions work independently from each other and can be included individually. The current code doesn't check input parameters much, so might fail if unexpected values are passed. All methods should be easily adaptable to other languages.

You could load the script to use the functions directly or manually extend the native `Math` class in your own code.

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
---
## coinToss(headsValue, tailsValue)
```javascript
function coinToss(headsValue, tailsValue, headsProbability = 0.5) { }
```

Identical to `coinToss()`, but with two custom return values. Returns either `headsValue` or `tailsValue` randomly.

Optional parameter `headsProbability` to set likelihood of returning `headsValue`, analog to `coinToss()` above.

```javascript
//EXAMPLE
```
---
## plusMinusOne()
```javascript
function plusMinusOne(plusProbability = 0.5) { }
```

Identical to `coinToss(1, -1)`. Returns either `1` or `-1` randomly.

Optional parameter `plusProbability` to set likelihood of returning positive `1`, analog to `coinToss()` above.

Particularly helpful for geometric operations, e.g. to flip orientations of some shape, axis, model etc. That's why it is a dedicated function with a more descriptive name.

```javascript
//EXAMPLE
//set rotation angle to either 45 or -45
let rotation = plusMinusOne() * 45;
```
---
## randomBetween(minValue, maxValue)
```javascript
function randomBetween(minValue, maxValue, stepSize = 0) { }
```

Returns a random float number between `minValue` and `maxValue`. Results can be equal to `minValue` but are always lower than `maxValue`. This is a basic function to map `Math.random()` (which returns values from 0 to 1) to other ranges.

The optional parameter `stepSize` allows to limit or *round* the returned results to fixed intervals. For instance, `randomBetween(0, 1, 0.2)` would only return the values `0, 0.2, 0.4, 0.6 and 0.8` (again, results always below `maxValue`). The interval is always starting from the `minValue` up to the `maxValue`. The parameter should be non-negative. The default value is `0`, meaning all float values between the limits can be returned. 

```javascript
//EXAMPLE
//generate a random rotation angle between 0 and 360 degrees
let rotation = randomBetween(0, 360);

//generate a proper price amount from 5 to 10 dollars, in cent steps
let price = randomBetween(5, 10, 0.01) + "$";
```
---
## randomIntBetween(minValue, maxValue)
```javascript
function randomIntBetween(minValue, maxValue, stepSize = 0) { }
```
---
## randomInt(maxValue)
```javascript
function randomInt(minValue, maxValue, stepSize = 0) { }
```
---
## randomSelect(values)
```javascript
function randomSelect(values, probabilityPattern = [1]) { }
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

The function should not return 0 as one of the values. Due to rounding issues, the actual sum of the returned array values can be minimally higher or lower than the target sum.

```javascript
//EXAMPLE
```
---
## randomLerp(numberOfValues)
```javascript
function randomLerp(numberOfValues, startValue = 0.0, endValue = 1.0, maxSpread = 1.0) { }
```

Returns an array of length `numberOfValues`, filled with an ordered sequence of values between `startValue` and `endValue`. Think getting a number of points on a graph.

`numberOfValues` should be any positive integer. Float numbers are rounded to the next smallest integer.

`startValue` and `endValue` can be any number, also negative numbers, and `startValue` doesn't have to be larger than `endValue`. Default range is `0` to `1`.

The optional fourth parameter `maxSpread` controls how much difference is allowed among the generated array values. Expects a value from `0` to `1`, with `0` meaning all array values will be evenly apart and `1` meaning the largest possible variance is allowed. Default value is `1`.

The function should not return `startValue` or `endValue` as one of the values.

```javascript
//EXAMPLE
```
---
## Advanced Examples
```javascript
//Return either exactly 0 or a random value between -1 and 1
let result = randomSelect([0, randomBetween(-1,1)]);
```
