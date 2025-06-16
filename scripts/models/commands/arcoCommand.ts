import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import fs from 'fs';
import path from 'path';
import { pathUtils } from '../../utils/paths';

const getComponentMainDir = (modulePath:string) => {
  const parts = modulePath.split('/');
  const esIndex = parts.findIndex(part => part === 'es');
  if (esIndex === -1) return modulePath; // 或者处理错误
  // 取es之后的第一个目录
  if (parts.length < esIndex + 2) return modulePath; // 如果路径不够长，可能返回原路径？
  const mainDir = parts.slice(0, esIndex + 2).join('/');
  return mainDir;
};

function transformExports(outputPath:string, prefix:string, sourcePath:string) {
  const sourceCode = fs.readFileSync(sourcePath, 'utf-8');
  const ast = parse(sourceCode, {
    sourceType: 'module',
    plugins: ['typescript']
  });

  // 确保输出目录存在
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  traverse(ast, {
    ExportNamedDeclaration({ node }) {
      if (!node.source) return;

      const originalPath = node.source.value;
      // 路径自动补全逻辑
      let adjustedOriginal = originalPath;
      const ext = path.extname(adjustedOriginal);
      if (!ext && !adjustedOriginal.endsWith('/')) {
        adjustedOriginal += '/index.js';
      }

      // 构建新路径
      const newPath = `${prefix}${
        adjustedOriginal.startsWith('.')
          ? adjustedOriginal.slice(1)
          : adjustedOriginal
      }`.replace(/\\/g, '/');

      node.specifiers.forEach((specifier) => {
        let exportedName, localName;

        // 解析导出标识符
        if (specifier.type === 'ExportDefaultSpecifier') {
          exportedName = specifier.exported.name;
          localName = 'default';
        } else if (specifier.type === 'ExportSpecifier') {
          exportedName = specifier.exported.name;
          localName = specifier.local.name;
        } else {
          return;
        }

        // 判断是否需要CSS导入
        const needsCSSImport = specifier.type === 'ExportDefaultSpecifier' ||
                             exportedName !== localName;

        // 构建导出语句
        const exportStatement = specifier.type === 'ExportDefaultSpecifier'
          ? `export { default as ${exportedName} } from '${newPath}';`
          : exportedName === localName
            ? `export { ${localName} } from '${newPath}';`
            : `export { ${localName} as ${exportedName} } from '${newPath}';`;

        // 生成文件内容
        let fileContent = '';
        if (needsCSSImport) {
          // const componentDir = path.posix.dirname(newPath);
          // const cssImportPath = path.posix.join(componentDir, 'style/index.css');
          const componentMainDir = getComponentMainDir(newPath);
          const cssImportPath = path.posix.join(componentMainDir, 'style/index.js');
          // css文件存在则导入
          if (fs.existsSync(pathUtils.resolveWorkspaceRoot(`node_modules/${cssImportPath}`))) {
            fileContent = `import '${cssImportPath}';\n${exportStatement}\n`;
          } else {
            fileContent = `${exportStatement}\n`;
          }
        } else {
          fileContent = `${exportStatement}\n`;
        }
        // fileContent;
        // 创建组件目录
        const componentDirPath = path.join(outputPath, exportedName);

        // 清理并重建目录
        if (fs.existsSync(componentDirPath)) {
          fs.rmSync(componentDirPath, {
            recursive: true,
            force: true
          });
        }
        fs.mkdirSync(componentDirPath, { recursive: true });

        // 写入文件
        const indexPath = path.join(componentDirPath, 'index.ts');
        fs.writeFileSync(indexPath, fileContent);
      });
    }
  });
}

export const ArcoCommand = () => {
  transformExports(pathUtils.resolveWorkspaceRoot('micro/modules/src/arco-design'), '@arco-design/web-vue/es', pathUtils.resolveWorkspaceRoot('node_modules/@arco-design/web-vue/es/index.js'));
  transformExports(pathUtils.resolveWorkspaceRoot('micro/modules/src/arco-design/arco-icon'), '@arco-design/web-vue/es/icon', pathUtils.resolveWorkspaceRoot('node_modules/@arco-design/web-vue/es/icon/index.js'));
};
