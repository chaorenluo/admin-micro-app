

import * as fg from 'fast-glob';
import path from 'path'
import { pathUtils } from './paths';

export namespace moduleFederationUtils {
  export function resolveCodeFiles(projectDir: string) {
    return fg.sync(['./src/**/*'], {
      cwd: projectDir,
      onlyFiles: true
    });
  }

  export function filePathsToExposes(filePaths: string[]) {
    return filePaths.reduce(
      (acc, cur) => {
        if (!isExcludeKindFile(cur)) {
          acc[srcFilePathToExposeKey(cur)] = cur;
        }
        return acc;
      },
      {} as Record<string, string>
    );
  }

  export function isExcludeKindFile(filePath: string) {
    return /\.d\.ts$/.test(filePath);
  }
  
  export function createAbsolutePath(exposes: any, projectDir: string) {
    Object.keys(exposes).forEach((key) => {
      const val = exposes[key];
      exposes[key] = path.resolve(projectDir, val);
    });
  }

  export const getExposes = () => { 
    const dir = pathUtils.getMicroModulesDir();
    let exposes = moduleFederationUtils.filePathsToExposes(moduleFederationUtils.resolveCodeFiles(pathUtils.getMicroModulesDir()));
    moduleFederationUtils.createAbsolutePath(exposes, dir);
    return exposes;
  }

  export function srcFilePathToExposeKey(filePath: string) {
    return filePath
      .replace('./src/', './')
      .replace('src/', './')
      .replace(/\.tsx?$/, '')
      .replace(/\/index$/, '');
  }

  export const areArraysEqual = (arr1: any[], arr2: any[]) => { 
      if (arr1.length !== arr2.length) {
        return false;
      }
      const sortedArr1 = arr1.slice().sort();
      const sortedArr2 = arr2.slice().sort();
      return sortedArr1.every((value, index) => value === sortedArr2[index]);
  }

}
