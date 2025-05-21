import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/login/Login'
import User from "@/views/User.vue";
import store from "@/store";
import {ElMessage} from "element-plus";

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/user',
    name: 'User',
    redirect: to => {
      if (parseJwt(store.state.accessToken).role === 'EMPLOYEE' || parseJwt(store.state.accessToken).role === 'ROLE_EMPLOYEE') {
        return '/user/board'
      } else { return '/user/projects' }
    },
    component: User,
    children: [
      {
        path: 'projects',
        name: 'Projects',
        component: () => import('../views/projects/Projects'),
      },
      {
        path: 'employees',
        name: 'Employees',
        component: () => import('../views/employees/Employees'),
      },
      {
        path: 'tasks',
        name: 'Tasks',
        component: () => import('../views/tasks/Tasks'),
      },
      {
        path: 'documents',
        name: 'Documents',
        component: () => import('../views/documents/Documents'),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/profile/Profile'),
      },
      {
        path: 'board',
        name: 'Board',
        component: () => import('../views/board/Board'),
      },
    ]
  },
  {
    path: '/403',
    name: 'NoPermission',
    component: () => import('../NotPermission'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/RegistrationPage'),
  },
];

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));
    return JSON.parse(base64);
  } catch (e) {
    console.error('Token decode error:', e);
    return null;
  }
}

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (store.state.accessToken && to.path !== '/' && to.path !== '/register') {
    store.commit("setUserData", parseJwt(store.state.accessToken));
  }


  if (!store.state.accessToken && to.path !== '/') {
    if (to.path === '/register') {
      next()
      return
    }
    next('/')
    ElMessage.error('Tizimga kirishni amalga oshiring')
  } else {
    next()
  }
})


export default router
