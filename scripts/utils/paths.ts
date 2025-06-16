import path, { resolve } from 'path';
export namespace pathUtils {
  export const workspaceRoot = resolve(__dirname, '..', '..');

  export function getAppProjectDir(name: IAppName) {
    return resolveWorkspaceRoot(name.replace('@', ''));
  }

  export function getMicroModulesDir() {
    return resolveWorkspaceRoot('micro/modules');
  }

  export function resolveWorkspaceRoot(...paths: string[]) {
    return path.resolve(workspaceRoot, ...paths);
  }

  export function getPortsJsonPath() {
    return resolveWorkspaceRoot('shared/tsconfig/ports.json');
  }

  export function getMicroBaseUrl(ports: any) {
    const data:any = {};
    Object.keys(ports).forEach((key) => {
      data[key] = key == '@apps/main' ? '/v2' : '/v2/' + key.replace('@apps/', '').replace('@', '');
    });
    return data;
  }

  export function getSassBaseValPath() {
    return resolveWorkspaceRoot('shared/scss/common/baseVal.scss');
  }
}
