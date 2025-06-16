import path from 'path';

import { invariantUtils } from '../../../utils/invariant';
import chalk from 'chalk';
import fsx from 'fs-extra';
import { createServer, build, preview, createLogger, UserConfig, ViteDevServer, PreviewServer } from 'vite';
import type { PackageManifest } from '@pnpm/types';
import { pathUtils } from '../../../utils/paths';
import ports from '@shared/tsconfig/ports.json';
import { moduleFederationUtils } from '../../../utils/module-federation';

type Port = string | number;

export class ViteRunner {
  private server?: ViteDevServer | PreviewServer;
  isServing = false;
  packageJson: PackageManifest;
  logger = createLogger('info');
  baseUrlJson: any;
  baseName: string;

  constructor(
    private projectDir: string,
    private devConfiguration: UserConfig,
    private buildConfiguration: UserConfig,
    private port?: Port
  ) {
    this.packageJson = fsx.readJSONSync(path.resolve(projectDir, 'package.json'));
    this.baseUrlJson = pathUtils.getMicroBaseUrl(ports);
    this.baseName = this.baseUrlJson[this.packageJson.name];
    // 注入环境变量
    this.devConfiguration.define = {
      'import.meta.env.MicroBaseUrl': JSON.stringify(this.baseUrlJson)
    };
    // 注入环境变量
    this.buildConfiguration.define = {
      'import.meta.env.MicroBaseUrl': JSON.stringify(this.baseUrlJson)
    };
  }

  async serve() {
    this.isServing = true;
    // @ts-ignore
    this.port = (this.port || ports[this.packageJson.name] || 3000) as number;
    const createServer_config: any = {
      ...this.devConfiguration,
      root: this.projectDir,
      base: this.baseName,
      server: {
        host: '0.0.0.0',
        port: this.port,
        hmr: true
      }
    };

    if (this.devConfiguration.server) {
      createServer_config.server = {
        ...createServer_config.server,
        ...this.devConfiguration.server
      };
    }
    // console.log(createServer_config, '-----------------createServer_config----------');

    this.server = await createServer(createServer_config);
    await this.server.listen();
    this.startServerCallback();
    return this.server;
  }

  async stopServe() {
    invariantUtils.define(this.server);
    await this.server.close();
    this.stopServerCallback();
  }

  async moduleDevBuild() {
    await build({
      ...this.devConfiguration,
      root: this.projectDir
    });
    this.logger.info(`${chalk.green('共享模块构建成功')}`);
  }

  async microModulePreview() {
    await fsx.ensureFile(pathUtils.resolveWorkspaceRoot('remoteEntry.json'));
    let remoteEntry = {};
    try {
      remoteEntry = await fsx.readJSON(pathUtils.resolveWorkspaceRoot('remoteEntry.json'));
    } catch (e) {
      remoteEntry = {};
    }
    const exposes = moduleFederationUtils.getExposes();
    const dirPath = this.projectDir + '/dist/';
    const exists = await fsx.pathExists(dirPath);
    // @ts-ignore
    this.port = (this.port || ports[this.packageJson.name] || 3000) as number;
    if (!moduleFederationUtils.areArraysEqual(Object.keys(exposes), Object.keys(remoteEntry)) || !exists) {
      await this.moduleDevBuild();
      await fsx.writeJSON(pathUtils.resolveWorkspaceRoot('remoteEntry.json'), exposes);
    }
    this.server = await preview({
      root: this.projectDir,

      preview: {
        port: this.port
      }
    });
    this.startServerCallback();
    this.logger.info(`${chalk.green('共享模块服务启动')}`);

    console.log(`${chalk.green('=================💐💐共享依赖创建成功💐💐==========================')}`);
    console.log(moduleFederationUtils.getExposes());
    console.log(`${chalk.green('=================💐💐共享依赖💐💐==========================')}`);
  }

  async build() {
    await build({
      ...this.devConfiguration,
      root: this.projectDir
    });
  }

  async productionBuild() {
    if (this.baseName.indexOf('modules') > -1) {
      const base = this.baseName;
      await build({
        ...this.buildConfiguration,
        root: this.projectDir,
        experimental: {
          renderBuiltUrl(filename, { hostId, hostType, type }) {
            if (type === 'asset') {
              return `${base}/${filename}`;
            }
            return { relative: true };
          }
        }
      });
      return;
    }
    await build({
      ...this.buildConfiguration,
      root: this.projectDir,
      base: this.baseName
    });
  }

  private stopServerCallback = () => {
    this.isServing = false;

    this.logger.info(`${chalk.green(this.packageJson.name)} stopped.`);
  };

  private async startServerCallback() {
    const { server, packageJson, port } = this;
    invariantUtils.define(server);
    invariantUtils.define(port);
    const host = 'localhost';
    const localAddress = `http://${host}:${port}/`;

    this.logger.info(`${chalk.green('🎉 本地地址：')}${chalk.cyanBright(localAddress)}`);
    this.logger.info(`${chalk.green(packageJson.name)} started successfully.`);
  }
}
