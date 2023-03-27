import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import vuetify from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/todo_ts-project' : '/',
  plugins: [
    Components({
      /* options */
    }),
    vue(),
    // vite-plugin-vuetify https://next.vuetifyjs.com/en/features/treeshaking/
    // sass-variables https://vuetifyjs.com/en/features/sass-variables/
    vuetify({
      styles: { configFile: 'src/styles/settings.scss' },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: `assets/[name].js`, // 入口文件
        chunkFileNames: `assets/[name].js`, // 非入口文件
        assetFileNames: ({ name }) => {
          const ext = name.slice(name.lastIndexOf('.'));

          if (['.ttf', '.woff2'].includes(ext)) {
            return `assets/font/${name}`;
          }
          return `assets/${name}`;
        }, // 靜態檔案
      },
    },
  },
});
