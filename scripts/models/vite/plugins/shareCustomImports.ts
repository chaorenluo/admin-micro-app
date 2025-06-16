import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';
import { Plugin } from 'vite';
import fs from 'fs';

const mergeCustomImports = (code:string) => {
  const ast = parse(code, {
    sourceType: "module",
    plugins: ["jsx"]
  });
  traverse(ast, {
    ImportDeclaration(path) {
      const source = path.node.source.value;
      // 只替换以 "modules/@shared" 开头的路径
      if (source.startsWith("modules/@shared")) {
        path.node.source.value = source.replace("modules/", "");
      }
    }
  });
  return generate(ast, {
    retainLines: true,
    retainFunctionParens: true,
    comments: true,
    compact: false,
    concise: true,
    jsescOption: { quotes: 'single', minimal: true }
  }, code).code;
};

export const RedirectShareImports = ():Plugin => {
  return {
    name: 'redirect-share-imports',
    enforce: "post",
    transform(code, id) {
      code = mergeCustomImports(
        code
      );
      return code;
    }
  };
};
