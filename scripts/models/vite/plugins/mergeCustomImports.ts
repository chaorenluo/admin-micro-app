import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';
import { Plugin } from 'vite';

function mergeCustomImports(code: string, targetSources: Array<string>, mergedSource: string): string {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['typescript']
  });

  const targetImports: Array<any> = [];
  const otherImports: Array<any> = [];

  traverse(ast, {
    ImportDeclaration(path) {
      if (targetSources.includes(path.node.source.value)) {
        const hasNamespaceSpecifier = path.node.specifiers.some(
          specifier => specifier.type === 'ImportNamespaceSpecifier'
        );

        if (!hasNamespaceSpecifier) {
          targetImports.push(path.node);
          path.remove();
        } else {
          otherImports.push(path.node);
        }
      } else {
        otherImports.push(path.node);
      }
    }
  });

  if (targetImports.length === 0) return code;

  const mergedSpecifiers: Array<any> = [];
  targetImports.forEach(importNode => {
    importNode.specifiers.forEach(specifier => {
      const exists = mergedSpecifiers.some(s =>
        s.local.name === specifier.local.name
      );
      if (!exists) mergedSpecifiers.push(specifier);
    });
  });

  const mergedImport = t.importDeclaration(
    mergedSpecifiers,
    t.stringLiteral(mergedSource)
  );

  const newAst = parse('');
  const newOtherImports: Array<any> = [];
  otherImports.forEach(node => {
    newOtherImports.push(t.emptyStatement());
    newOtherImports.push(t.importDeclaration(
      node.specifiers,
      node.source
    ));
    newOtherImports.push(t.emptyStatement());
  });
  newAst.program.body = [
    mergedImport,
    t.emptyStatement(),
    ...newOtherImports,
    ...ast.program.body.filter(node => node.type !== 'ImportDeclaration')
  ];

  // @ts-ignore
  return generate(newAst, {
    retainLines: true,
    retainFunctionParens: true,
    comments: true,
    compact: false,
    concise: true,
    jsescOption: { quotes: 'single', minimal: true }
  }, code).code;
}

export const RedirectVueImports = ():Plugin => {
  return {
    name: 'redirect-vue-imports',
    enforce: "post",
    transform(code, id) {
      // 处理vue相关的导入
      code = mergeCustomImports(
        code,
        ['vue', 'modules/vue'], // 要合并的源列表
        'modules/vue' // 合并后的目标源
      );
      // 处理vue-router相关的导入
      code = mergeCustomImports(
        code,
        ['vue-router', 'modules/vue-router'], // 要合并的源列表
        'modules/vue-router' // 合并后的目标源
      );
      return code;
    }
  };
};
