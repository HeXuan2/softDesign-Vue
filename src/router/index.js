import { createRouter, createWebHistory } from 'vue-router'
import Index from "@/views/Index.vue";
import ShopInfo from "@/views/shopInfo.vue";
import ShopList from "@/views/ShopList.vue";
import Login from "@/views/login/index.vue";
import Orders from "@/views/Orders.vue";
import UserAddress from "@/views/UserAddress.vue";
import Payment from "@/views/Payment.vue";
import OrderList from "@/views/OrderList.vue";
import AddUserAddress from "@/views/AddUserAddress.vue";
import EditUserAddress from "@/views/EditUserAddress.vue";
import Register from "@/views/register/index.vue";
import User from "@/views/User.vue";
import UserInfo from "@/views/userInfo.vue";
import MapContainer from "@/views/MapContainer.vue";
import myShopList from "@/views/MyShopList.vue";
import addItem from "@/views/AddItem.vue";
import shopOrderList from "@/views/ShopOrderList.vue";
import addShop from "@/views/AddShop.vue";
import addShopItem from "@/views/AddShopItem.vue";
import updateShop from "@/views/UpdateShop.vue";
import TestVue from "@/views/testVue.vue";
import updateShopItem from "@/views/updateShopItem.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Index
    }, {
      path: '/index',
      name: 'Index',
      component: Index
    }, {
      path: '/shopList',
      name: 'ShopList',
      component: ShopList
    }, {
      path: '/shopInfo',
      name: 'ShopInfo',
      component: ShopInfo
    }, {
      path: '/myShopList',
      name: 'MyShopList',
      component: myShopList
    },{
      path: '/addItem',
      name: 'addItem',
      component: addItem
    },{
      path: '/addShopItem',
      name: 'addShopItem',
      component: addShopItem
    },{
      path: '/updateShopItem',
      name: 'updateShopItem',
      component: updateShopItem
    },{
      path: '/updateShop',
      name: 'updateShop',
      component: updateShop
    },
    {
      path: '/shopOrderList',
      name: 'shopOrderList',
      component: shopOrderList
    },{
      path: '/addShop',
      name: 'addShop',
      component: addShop
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/orders',
      name: 'Orders',
      component: Orders
    }, {
      path: '/userAddress',
      name: 'UserAddress',
      component: UserAddress
    }, {
      path: '/payment',
      name: 'Payment',
      component: Payment
    }, {
      path: '/orderList',
      name: 'OrderList',
      component: OrderList
    }, {
      path: '/addUserAddress',
      name: 'AddUserAddress',
      component: AddUserAddress
    }, {
      path: '/editUserAddress',
      name: 'EditUserAddress',
      component: EditUserAddress
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path:'/user',
      name:'User',
      component:User
    },
    {
      path:'/userInfo',
      name:'UserInfo',
      component:UserInfo
    },
    {
      path:'/MapContainer',
      name:'MapContainer',
      component:MapContainer
    },{
      path:'/test',
      name:'test',
      component:TestVue
    },
  ]
})

export default router
