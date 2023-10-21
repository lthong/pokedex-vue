import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [vue()],

    // https://cn.vitejs.dev/config/shared-options.html#base
    // base 設定 static 資源的 public url
    base: '/pokedex-vue',

    // https://cn.vitejs.dev/config/shared-options.html#envdir
    // envDir 設定 .env 目錄位置
    envDir: path.resolve(__dirname, 'envConfig'),

    // https://cn.vitejs.dev/guide/env-and-mode.html#env-files
    // https://cn.vitejs.dev/config/shared-options.html#envprefix
    // envPrefix 設定哪些開頭的環境變數可以用 import.meta.env 來存取（可在client端的js中使用），vite設定預設是'VITE'前綴的環境變數才能在client使用
    envPrefix: ['VUE_APP', 'VITE'],

    // https://cn.vitejs.dev/config/shared-options.html#resolve-alias
    // resolve.alias 設定 webpack alias
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
});
