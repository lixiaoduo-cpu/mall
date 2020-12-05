import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home/Home';
import Category from '../views/category/Category';
import Profile from '../views/profile/Profile';
import Shopcart from '../views/shopcart/Shopcart';

//1.安装插件
Vue.use(VueRouter)

//3. 创建Router
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/shopcart',
    component: Shopcart
  },
]
const router = new VueRouter({
    routes,
    mode: 'history'


})

//3. 导出Router
export default router
