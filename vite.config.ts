import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import vuetify from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig({
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
});
