import path from 'path';
import { cwd } from 'process';
import fsx from 'fs-extra';
import { ConsumerProject } from '../project/consumer';
import { EProjectType } from '../project/project';
import { ProviderProject } from '../project/provider';
import type { Project } from '../project/project';

export namespace ProjectFactory {
  export function create(type?: EProjectType, projectDir = cwd()): Project {
    switch (type) {
      case EProjectType.Consumer:
        return new ConsumerProject(projectDir);

      case EProjectType.Provider:
        return new ProviderProject(projectDir);

      default: {
        const { name } = fsx.readJSONSync(path.resolve('package.json'));
        const type = name === '@micro/modules' ? EProjectType.Provider : EProjectType.Consumer;
        return ProjectFactory.create(type, projectDir);
      }
    }
  }
}
