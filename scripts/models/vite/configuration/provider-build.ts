import { defineConfig } from 'vite';
import { ModuleFederationProviderPlugin } from '../plugins/provider';
import ViteBase from './base';
import topLevelAwait from 'vite-plugin-top-level-await';
import terser from '@rollup/plugin-terser';

export const ProviderBuildConfiguration = () => {
  return defineConfig({
    plugins: ViteBase.plugins?.concat([
      ModuleFederationProviderPlugin(),
      topLevelAwait({
        promiseExportName: "__tla",
        promiseImportName: i => `__tla_${i}`
      })
    ]),
    css: ViteBase.css,
    resolve: ViteBase.resolve,
    build: {
      minify: 'terser',
      terserOptions: {
        mangle: true,
        compress: {
          drop_console: true
        },
        output: {
          beautify: false
        }
      },
      rollupOptions: {
        plugins: [
          // @ts-ignore
          terser()
        ]
      }
    },
    mode: 'production'
  });
};
