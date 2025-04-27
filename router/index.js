import { createRouter, createWebHashHistory } from 'vue-router';

import LoginPage from '../views/LoginPage.vue';
import SignUpPage from '../views/SignUpPage.vue';
import HomePage from '../views/HomePage.vue';

// Vue.use(VueRouter);

const routes = [
  {
    path: '/loginpage',
    name: 'loginpage',
    component: LoginPage,
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUpPage,
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
