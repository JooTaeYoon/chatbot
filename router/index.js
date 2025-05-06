import { createRouter, createWebHashHistory } from 'vue-router';

import LoginPage from '../views/LoginPage.vue';
import SignUpPage from '../views/SignUpPage.vue';
import HomePage from '../views/HomePage.vue';
import RoomList from '../views/RoomList.vue';
import OmokGame from '../views/OmokGame.vue';
import axios from 'axios';

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
  {
    path: '/room',
    name: 'RoomList',
    component: RoomList,
  },
  {
    path: '/room/:sessionId',
    name: 'GameRoom',
    component: OmokGame,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, _from, next) => {
  console.log(to.name);
  if (to.name === 'GameRoom') {
    const sessionId = to.params.sessionId;
    try {
      console.log('payload: ', sessionId);
      const res = await axios.post(
        'http://localhost:8080/api/omok/room/check',
        {
          sessionId,
        }
      );
      if (res.data) {
        console.log('res: ', res);
        next();
      } else {
        next('/room');
      }
    } catch (err) {
      console.error('err : ', err);
      next('/home');
    }
  } else {
    console.log('df');
    next();
  }
});

export default router;
