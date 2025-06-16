import { Project } from './project';

import { ConsumerBuildConfiguration } from '../vite/configuration/consumer-build';
import { ConsumerDevConfiguration } from '../vite/configuration/consumer-dev';

export interface IProviderProjectOptions { }

export class ConsumerProject extends Project {
  constructor(projectDir: string) {
    super(projectDir, ConsumerDevConfiguration(), ConsumerBuildConfiguration());
  }
}
