import { createI18n } from 'vue-i18n';
import enUS from './en-US';
import zhTW from './zh-TW';

const locale = 'zh-TW';

export default createI18n({
  locale,
  messages: {
    en: enUS,
    'zh-TW': zhTW,
  },
});
