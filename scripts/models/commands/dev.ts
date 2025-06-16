import { cwd } from 'process';
import { Command } from './command';
import { pathUtils } from '../../utils/paths';
import { ProjectFactory } from '../factories/project';
import { EProjectType } from '../project/project';
// import { startProxy } from "../vite/runner/startProxy";

export class DevCommand extends Command {
  async execute() {
    if (cwd() === pathUtils.workspaceRoot) {
      await this.devRoot();
    } else {
      await this.devProject();
    }
  }

  async devRoot() {
    // startProxy();
    const modules = ProjectFactory.create(EProjectType.Provider, pathUtils.getAppProjectDir('@micro/modules'));
    await modules.microModulePreview();
    const mainApp = ProjectFactory.create(EProjectType.Consumer, pathUtils.getAppProjectDir('@apps/main'));
    mainApp.serve();
  }

  async devProject() {
    const project = ProjectFactory.create();
    project.serve();
  }
}
