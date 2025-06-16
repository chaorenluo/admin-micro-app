import { defineConfig } from 'vite';
import ViteBase from './base';
import { ModuleFederationConsumerPlugin } from '../plugins/consumer';
import { RedirectVueImports } from '../plugins/mergeCustomImports';
import { SetupMiddlewares } from '../plugins/setupMiddlewares';
import { RedirectShareImports } from '../plugins/shareCustomImports';

export const ConsumerDevConfiguration = () => {
  return defineConfig({
    plugins: ViteBase.plugins?.concat([
      RedirectVueImports(),
      RedirectShareImports(),
      ModuleFederationConsumerPlugin(),
      SetupMiddlewares()
    ]),
    build: ViteBase.build,
    mode: 'development',
    optimizeDeps: {
      exclude: ['vue'] // 排除 'vue' 使其不被转换
    },
    css: ViteBase.css,
    resolve: ViteBase.resolve,
    server: {
      allowedHosts: true,
      fs: {
        // 允许为项目根目录的上一级提供服务
        allow: ['..']
      },
      proxy: {
        '/api': {
          target: 'http://admin.debug.8591.com.tw/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/web': {
          target: 'http://admin.debug.8591.com.tw/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/web/, '')
        },
        '/include': {
          target: 'http://admin.debug.8591.com.tw/',
          changeOrigin: true
          // rewrite: (path) => path.replace(/^\/web/, '')
        },
        '/css': {
          target: 'http://statics.debug.8591.com.tw/',
          changeOrigin: true
          // rewrite: (path) => path.replace(/^\/web/, '')
        },
        '/js': {
          target: 'http://statics.debug.8591.com.tw/',
          changeOrigin: true
          // rewrite: (path) => path.replace(/^\/web/, '')
        }
      }
    }
  });
};
