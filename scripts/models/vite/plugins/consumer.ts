import fsx from 'fs-extra';
import { pathUtils } from '../../../utils/paths';
import federation from '@originjs/vite-plugin-federation';

export const ModuleFederationConsumerPlugin = () => {
  const ports = fsx.readJSONSync(pathUtils.getPortsJsonPath());
  const external = process.env.NODE_ENV === 'dev' ? `new Promise(resolve=>resolve('http://localhost:${ports['@micro/modules' as keyof typeof ports]}/assets/remoteEntry.js'))` : `new Promise(resolve=>resolve('/v2/micro/modules/assets/remoteEntry.js'))`;
  return federation({
    name: 'layout',
    filename: 'remoteEntry.js',
    remotes: {
      modules: {
        external,
        externalType: "promise"
      }
    }
  });
};
