<script setup>
import {useUserStore} from "../stores/user.js";
import {useRouter} from "vue-router";
const userStore=useUserStore();
const router=useRouter()
const toIndex=()=>{
  router.push({path: '/index'})
}
const toBusinessList=(shopType)=>{
  // 这里主义加{}，否则不会出现参数传递
  router.push({path: '/shopList',query: { shopType }})
}

const toOrderList=()=>{
  router.push({path: '/orderList'})
}

const toUser=()=>{
  router.push({path: '/user'})
}

</script>


<template>
  <ul class="footer">
    <li @click="toIndex">
      <i class="iconfont icon-shouye"></i>
      <p>首页</p>
    </li>
    <li @click="toBusinessList(1)">
      <i class="iconfont icon-faxian"></i>
      <p>发现</p>
    </li>
    <li @click="toOrderList">
      <i class="iconfont icon-dingdan-quanbudingdan"></i>
      <p>订单</p>
    </li>
    <li @click="toUser">
      <i class="iconfont icon-wodexiao"></i>
      <p>我的</p>
    </li>
  </ul>
</template>


<style>
.wrapper .footer {
  width: 100%;
  height: 14vw;
  border-top: solid 1px #DDD;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.wrapper .footer li {
  /*li本身的尺寸完全由内容撑起*/
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
  user-select: none;
  cursor: pointer;
}
.wrapper .footer li p {
  font-size: 2.8vw;
}
.wrapper .footer li i {
  font-size: 5vw;
}
</style>
