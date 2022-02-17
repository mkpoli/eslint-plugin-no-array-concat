# Prevent using Array.prototype.concat() for Array concatenation. (no-array-concat)

It's difficult to see Array.prototype.concat() if it's in a long chain of function-style map(), filter(), forEach() etc (See the following example). 
```javascript
someVeryLongVariable
    .filter((a) => someCheckFunction(a))
    .concat(someVeryLongVariableB)
    .forEach((a, i) => {
        doSomething(a, i)
    })
```

In addition, Even if it's not in the chains, since array concatenation is adding up two arrays, it should be a symmetrical operation, such as 1 + 2 or plus(1, 2), rather than 1.plus(2).

The alternative way is to concat using Array destructuring:

```javascript
[
    ...someVeryLongVariable.filter((a) => someCheckFunction(a)),
    ...someVeryLongVariableB
].forEach((a, i) => {
    doSomething(a, i)
})
```

or

```javascript
const concatenatedVariable = [
    ...someVeryLongVariable.filter((a) => someCheckFunction(a)),
    ...someVeryLongVariableB
]
for (const [i, a] of concatenatedVariable.entries()) {
    doSometing(i, a)
}
```

## Rule Details

This rule aims to reduce human error where people may miss the Array.prototype.concat() call. 

Examples of **incorrect** code for this rule:

```js
a.concat(b)
```

Examples of **correct** code for this rule:
```js
[...a, ...b]
```

## When Not To Use It

If your environment does not support ES6+ syntax and you are not using any transpilers.

## Resources

- [Rule Source](../../lib/rules/no-array-concat.js)
- [Test Source](../../tests/lib/rules/no-array-concat.js)
