import { ProviderBuildConfiguration } from '../vite/configuration/provider-build';
import { ProviderDevConfiguration } from '../vite/configuration/provider-dev';

import { Project } from './project';

export interface IProviderProjectOptions { }

export class ProviderProject extends Project {
  constructor(projectDir: string) {
    super(projectDir,  ProviderDevConfiguration(),  ProviderBuildConfiguration());
  }
}