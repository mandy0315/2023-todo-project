// https://vuetifyjs.com/en/getting-started/installation/#manual-steps
import 'vuetify/styles';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import { createVuetify } from 'vuetify';
import { aliases, md } from 'vuetify/iconsets/md';

export default createVuetify({
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md,
    },
  },
});
