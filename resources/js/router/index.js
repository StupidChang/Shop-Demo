import { createRouter, createWebHistory } from 'vue-router';
import Main from '../Main.vue';
import Page1 from '../Page1.vue';
import Men1 from '../Men-Page1.vue';
import Men2 from '../Men-Page2.vue';
import Women1 from '../Women-Page1.vue';
import Women2 from '../Women-Page2.vue';
import ShopCart from '../shopcart.vue';

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      { path: 'Home', name: 'Home', component: Page1 },
      { path: 'Men1', name: 'Men1', component: Men1 },
      { path: 'Men2', name: 'Men2', component: Men2 },
      { path: 'Women1', name: 'Women1', component: Women1 },
      { path: 'Women2', name: 'Women2', component: Women2 },
      { path: 'ShopCart', name: 'ShopCart', component: ShopCart },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;  // 此处导出路由配置
