# randoms
A collection of simple helper functions for generating random results. Written in Javascript, but easily adaptable to other languages. These all use the native Math.random() function in Javascript.

Working with the bare random function in programming rarely leads to much interesting results. Often you need to randomly generate quite specific values, toggle some events randomly, or want to have more control over the probability of certain random results.

This collection consists of a handful of fairly simple helper functions, that make it a bit easier to handle such cases and to create more interesting and nuanced randomness. It's helpful in parametric visual or 3D design in creating generative forms with controlled random parameters, other situations where decision trees and options should be chosen randomly, or where exceptions and outliers should be introduced in a process.

## Reference

### coinToss()
```javascript
function coinToss(trueProbability = 0.5) { }
```

Return `true` or `false` randomly. Optional parameter `trueProbability` to set likelihood of `true` result (defaults to `0.5`, meaning equal probability).

Use
```javascript
//do or don't, equally likely
if(coinToss()) {
  //…
}

//very likely true, but rarely false
let choice = coinToss(0.9);
```
