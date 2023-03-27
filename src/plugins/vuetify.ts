// https://vuetifyjs.com/en/getting-started/installation/#manual-steps
import 'vuetify/styles';
import '@fortawesome/fontawesome-free/css/all.css';
import { createVuetify, ThemeDefinition } from 'vuetify';
import { aliases, fa } from 'vuetify/iconsets/fa';

const customTheme: ThemeDefinition = {
  dark: false,
  colors: {
    'c-black-300': '#333333',
    'c-black-200': '#5E5D5D',
    'c-black-100': '#8B8B8B',
    'c-gray-200': '#BBBBBB',
    'c-gray-100': '#F4F4F4',
    'c-brown-200': '#BC9C73',
    'c-brown-100': '#F4EDE5',
    'c-red-100': '#A1001A',
    'c-pink-100': '#FFC0CA',
  },
};

export default createVuetify({
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme,
    },
  },
});
