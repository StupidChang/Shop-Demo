import { createApp } from 'vue'
import Main from './Main.vue'
import router from './router'
import store from '../store';

import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 Bootstrap 5 的 CSS 文件
import 'bootstrap'; // 引入 Bootstrap 5 的 JavaScript 文件
import 'bootstrap/dist/js/bootstrap.bundle.min'; // 引入包含 Popper 的 Bootstrap JS
import "bootstrap/dist/js/bootstrap.esm.min.js"

createApp(Main).use(router).use(store).mount('#app')
