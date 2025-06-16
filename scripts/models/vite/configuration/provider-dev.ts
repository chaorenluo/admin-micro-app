import { defineConfig } from 'vite';
import { ModuleFederationProviderPlugin } from '../plugins/provider';
import ViteBase from './base';
import topLevelAwait from 'vite-plugin-top-level-await';
import { RedirectVueImports } from '../plugins/mergeCustomImports';

export const ProviderDevConfiguration = () => {
  return defineConfig({
    plugins: ViteBase.plugins?.concat([
      ModuleFederationProviderPlugin(),
      RedirectVueImports(),
      topLevelAwait({
        promiseExportName: "__tla",
        promiseImportName: i => `__tla_${i}`
      })
    ]),

    build: {
      modulePreload: false,
      minify: false,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          minifyInternalExports: false
        }
      }
    },
    mode: 'development',
    css: ViteBase.css,
    resolve: ViteBase.resolve

  });
};
