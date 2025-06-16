import { ViteRunner } from '../vite/runner';

import { UserConfig } from 'vite';

export enum EProjectType {
  Consumer = 'Consumer',
  Provider = 'Provider'
}

export abstract class Project extends ViteRunner {
  constructor(projectDir: string, devConfiguration: UserConfig, buildConfiguration: UserConfig, port?: number | string) {
    // console.log(devConfiguration, buildConfiguration, port, '----------------');
    super(projectDir, devConfiguration, buildConfiguration, port);
  }
}
