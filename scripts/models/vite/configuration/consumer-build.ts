import { defineConfig } from 'vite';
import ViteBase from './base';
import { ModuleFederationConsumerPlugin } from '../plugins/consumer';
import { RedirectVueImports } from '../plugins/mergeCustomImports';

export const ConsumerBuildConfiguration = () => {
  return defineConfig({
    plugins: ViteBase.plugins?.concat([
      RedirectVueImports(),
      ModuleFederationConsumerPlugin()
    ]),
    optimizeDeps: {
      exclude: ['vue'] // 排除 'vue' 使其不被转换
    },
    build: ViteBase.build,
    mode: 'production',
    css: ViteBase.css,
    resolve: ViteBase.resolve
  });
};
