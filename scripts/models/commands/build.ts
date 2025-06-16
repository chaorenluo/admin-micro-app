import fs from 'fs/promises';
import path from 'path';
import { cwd } from 'process';

import cpy from 'cpy';
import execa from 'execa';
import fsx from 'fs-extra'

import { log } from '../../utils/log';
import { pathUtils } from '../../utils/paths';
import { ProjectFactory } from '../factories/project';

import { Command } from './command';

export class BuildCommand extends Command { 
  async execute() {
    if (cwd() === pathUtils.workspaceRoot) {
      await this.buildRoot();
    } else {
      await this.buildProject();
    }
  }

  async buildRoot() {
    await execa.command('pnpm nx run-many -t build', { stdio: 'inherit' });
  }

  async buildProject() {
    const project = ProjectFactory.create();
    await project.productionBuild();
    const packageJson = fsx.readJSONSync(path.resolve(cwd(), 'package.json'));
    const microName = packageJson.name.replace('@', '');
    if (packageJson.name === '@apps/main') { 
      const apps = (await fs.readdir(pathUtils.resolveWorkspaceRoot('./apps'))).filter((x) => !(x.startsWith('.') || x.startsWith('_')));
      await Promise.all(
        apps.map(async (x) => {
          await cpy(path.join(pathUtils.workspaceRoot, `./apps/${x}/dist/index.html`), pathUtils.resolveWorkspaceRoot(`./dist/${x}/`));
          await cpy(path.join(pathUtils.workspaceRoot, `./apps/${x}/dist/assets/**`), pathUtils.resolveWorkspaceRoot(`./dist/${x}/assets`));
        })
      );
    } else {
      const goalDir = microName.replace('micro/','')
      await cpy(path.join(pathUtils.workspaceRoot, `./${microName}/dist/index.html`), pathUtils.resolveWorkspaceRoot(`./dist/${microName}/`));
      await cpy(path.join(pathUtils.workspaceRoot, `./${microName}/dist/assets/**`), pathUtils.resolveWorkspaceRoot(`./dist/${microName}/assets`));
    }
    log.info(`create ${pathUtils.resolveWorkspaceRoot('dist')}`);
  }

}