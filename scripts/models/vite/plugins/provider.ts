import { moduleFederationUtils } from '../../../utils/module-federation';
import federation from '@originjs/vite-plugin-federation';
export const ModuleFederationProviderPlugin = () => {
  const exposes = moduleFederationUtils.getExposes();

  return federation({
    name: 'modules',
    filename: 'remoteEntry.js',
    exposes,
    shared: ['vue', 'lodash-es']
  });
};
