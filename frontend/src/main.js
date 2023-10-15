import { createApp } from 'vue';
import App from './App.vue';
import i18n from '@/i18n';
import { router } from '@/routes';
import { store } from '@/store';

const vm = createApp(App);
vm.use(i18n);
vm.use(router);
vm.use(store);

vm.mount('#app');
