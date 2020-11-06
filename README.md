# Randy
A collection of simple javascript functions for generating more versatile and useful random results.

Working with the bare random function in programming rarely leads to much interesting results. Often you need to randomly generate quite specific values, toggle some events randomly, or want to have more control over the probability of certain random results. This is helpful for instance in creating generative forms with controlled random parameters in parametric visual or 3D design, generally in situations where decisions and options should be chosen randomly, or where exceptions and outliers should be introduced intentionally in a process.

This collection consists of a handful of fairly simple helper functions written in javascript, that make it a bit easier to handle such cases for creating more useful and interesting randomness. The examples all use the native Math.random() function in javascript, but the code is easily adaptable to other languages.

## Reference

### coinToss()
```javascript
function coinToss(trueProbability = 0.5) { }
```

Return `true` or `false` randomly. Optional parameter `trueProbability` to set likelihood of `true` result (defaults to `0.5`, meaning equal probability).

#### Use
```javascript
//do or don't, equally likely
if(coinToss()) {
  //…
}

//mostly true, but rarely false
let choice = coinToss(0.9);
```

### coinToss(headsValue, tailsValue)
```javascript
function coinToss(headsValue, tailsValue, headsProbability = 0.5) { }
```

Like `coinToss()`, but with custom return values. Returns `headsValue` or `tailsValue` randomly. Optional parameter `headsProbability` to set likelihood of first output value (defaults to `0.5`, meaning equal probability).

#### Use
```javascript
//
```

### plusMinusOne()
```javascript
function plusMinusOne(plusProbability = 0.5) { }
```

Same as `coinToss(1, -1)`, meaning it returns `+1` or `-1` randomly. Optional parameter `plusProbability` to set likelihood of returning `+1` (defaults to `0.5`, meaning equal probability). I found it particularly helpful for geometric operations, e.g. to flip orientations of some shape, axis, model. That's why I made it into a dedicated function.

#### Use
```javascript
//set rotation angle to either 45 or -45
let rotation = plusMinusOne() * 45;
```

### randomBetween(minValue, maxValue)
```javascript
function randomBetween(minValue, maxValue, stepSize = 0) { }
```

Returns a random float number between `minValue` and `maxValue`. Results can be equal to `minValue` but are always lower than `maxValue`. This is a basic function to map `Math.random()` (which returns values from 0 to 1) to other ranges.

The optional parameter `stepSize` allows to limit or *round* the returned results to fixed intervals. For instance, `randomBetween(0, 1, 0.2)` would only return the values `0, 0.2, 0.4, 0.6 and 0.8` (again, results always below `maxValue`). The interval is always starting from the `minValue` up to the `maxValue`. The parameter should be non-negative. The default value is `0`, meaning all float values between the limits can be returned. 

#### Use
```javascript
//
```

## Advanced Examples
```javascript
//Return either exactly 0 or a random value between -1 and 1
let result = randomSelect([0, randomBetween(-1,1)]);
```
