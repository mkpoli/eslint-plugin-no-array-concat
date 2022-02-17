import rule from '../../src/rules/no-array-concat';
import { TSESLint } from '@typescript-eslint/utils'

export const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.test.json"
  }
})

ruleTester.run("no-array-concat", rule, {
  valid: [
    {
      code: "[...a, ...b]", parserOptions: { ecmaVersion: 6 }
    },
    "Array.concat()",
    {
      code: "foo.concat(bar)",
    },
    "new CustomClass().concat()",
  ],

  invalid: [
    {
      code: "[1, 2, 3].concat([4, 5, 6])",
      errors: [{ messageId: "noArrayConcat" }],
    },
    {
      code: "var foo = [1, 2, 3]; foo.concat([4, 5, 6])",
      errors: [{ messageId: "noArrayConcat" }],
    },
    {
      code: "var foo = new Array(3); foo.concat([4, 5, 6])",
      errors: [{ messageId: "noArrayConcat" }],
    },
    {
      code: "var foo = [0, 1, 2].map(x => x + 1); foo.concat([4, 5, 6])",
      errors: [{ messageId: "noArrayConcat" }],
    }
  ],
});
