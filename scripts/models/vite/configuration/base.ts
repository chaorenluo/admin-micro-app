import vue from "@vitejs/plugin-vue";
import { defineConfig } from 'vite';
import AutoImport from "unplugin-auto-import/vite";

import path from 'path';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['micro-app'].includes(tag)
        }
      }
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/,
        /\.md$/
      ],
      imports: ["vue", 'vue-router'],
      dts: './auto-imports.d.ts'
    })
  ],
  build: {
    modulePreload: false,
    target: "ES2022"
  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../../../../shared'),
      '@modules': path.resolve(__dirname, '../../../../micro/modules/src'),
      '@components': path.resolve(__dirname, '../../../../apps/main/src/components')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@shared/scss/common/baseVal.scss" as *;`
      }
    }
  }
});
