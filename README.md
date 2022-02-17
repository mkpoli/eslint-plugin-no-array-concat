# eslint-plugin-no-array-concat

[![npm version](https://img.shields.io/npm/v/eslint-plugin-no-array-concat.svg)](https://www.npmjs.com/package/eslint-plugin-no-array-concat)

## Installation

### npm
```shell
npm install --save-dev eslint-plugin-no-array-concat
```

### yarn
```shell
yarn add -D eslint-plugin-no-array-concat
```

### pnpm
```shell
pnpm i -D eslint-plugin-no-array-concat
```

### Requirements
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser)

## Rules
- [no-array-concat](./docs/rules/no-array-concat.md): Prevent using Array.prototype.concat() for Array concatenation.

## Usage
In ``.eslintrc.js``:
```javascript
module.exports = {
    plugins: ['no-array-concat'],
    rules: {
        'no-array-concat/no-array-concat': 'error',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname
    }
}
```

## Reasoning

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

## License

MIT © 2022 mkpoli
