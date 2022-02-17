import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils'
import { ESLintUtils } from '@typescript-eslint/utils'

import { getPropertyName } from 'eslint-ast-utils'
import { createRule } from '../utils';

export = createRule({
  name: __filename,
  meta: {
    type: "suggestion",
    docs: {
      description: "Prevent using Array.prototype.concat() for Array concatenation",
      recommended: false,
    },
    schema: [], // Add a schema if the rule has options
    fixable: 'code',
    messages: {
      noArrayConcat: "Do not use Array.prototype.concat(...)",
    }
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices?.program?.getTypeChecker() as any;

    if (!checker || !parserServices) {
      throw Error(
        "Types not available, maybe you need set the parser to @typescript-eslint/parser"
      )
    }

    function disallowedConcat(node: TSESTree.CallExpression) {
      if (node.callee.type !== AST_NODE_TYPES.MemberExpression) {
        return;
      }

      const callee = node.callee as TSESTree.MemberExpression

      const propertyName = getPropertyName(callee)

      if (!propertyName || propertyName !== 'concat') {
        return;
      }

      const tsNodeMap = parserServices.esTreeNodeToTSNodeMap.get(node.callee.object)
      const type = checker!.getTypeAtLocation(tsNodeMap)
      if (!checker.isArrayType(type)) {
        return;
      }

      context.report({
        messageId: "noArrayConcat",
        loc: callee.property.loc,
        node
      })
    }

    return {
      CallExpression: disallowedConcat
    }
  }
});
