<template>
  <div class="wrapper">
    <!-- header部分 -->
    <header>
      <div class="location-text"><i class="iconfont icon-angle-left" @click="toback"></i>门店列表</div>
    </header>

    <!-- 门店列表部分 -->
    <ul class="shop" :model="shopForm">
<!--      <p>{{shopForm.shopList }}</p>-->
      <li v-for="item in shopForm.shopList" @click="toShopInfo(item.shopId)">
        <div class="shop-img">
          <img :src="item.shopLogo">
          <div class="shop-img-quantity" v-show="item.quantity>0">
            {{item.quantity}}</div>
        </div>
        <div class="shop-info">
          <h3>{{item.shopName}}</h3>
          <p>&#165;{{item.startPrice}}起送 | &#165;{{item.deliveryPrice}}配送</p>
          <p>{{item.shopDescription}}</p>
        </div>
      </li>
    </ul>
    <el-button @click="toMyShopList" v-if="shopForm.user.role == 2" type="primary" size="large" style="display: block;margin: auto;text-align: center">查看我的门店</el-button>
    <!-- 底部菜单部分 -->
    <Footer></Footer>
  </div>
</template>
<script setup>
import { ref,onMounted,watch} from 'vue';

import { useCommon } from '@/hooks/common';
import {ElMessage, ElMessageBox} from "element-plus";
const {router, cartStore,shopStore,route, globalProperties,Footer} = useCommon();

const shopForm=ref({
  shopType:'',
  shopList:[],
  user:{}
})

const cartForm=ref({
  shopId:'',
  userId:'',
  cartList:[],
})

const toMyShopList = () => {
  router.push({path:'/myShopList',query:{businessId:shopForm.value.user.userId}});
}

const getShopList = async () => {

  //把对象变成数组
  //根据shopType查询商家信息
  shopForm.value.shopType=route.query.shopType

  await shopStore.listShopByShopTypeId(shopForm.value.shopType)
    shopForm.value.shopList=shopStore.shopListByShopTypeId
  shopForm.value.user =JSON.parse(sessionStorage.getItem('userInfo'));
  if (shopForm.value.user!=null){
    await listCart();
  }
}

const listCart = () => {

  cartForm.value.userId=shopForm.value.user.userId
  cartStore.getCartList(cartForm.value.userId,cartForm.value.shopId)
  cartForm.value.cartList=cartStore.cartList
  //遍历所有食品列表
  for(let shopItem of shopForm.value.shopList){
    // 直接将其赋值为0，那么该属性将被添加到 shopItem 对象中。
    shopItem.quantity = 0;
    for(let cartItem of cartForm.value.cartList){
      if(cartItem.shopId==shopItem.shopId){
        shopItem.quantity += cartItem.quantity;
      }
    }
  }
  shopForm.value.shopList.sort();
}

const open = () => {
  ElMessageBox.confirm(
      '请先登录',
      'Warning',
      {
        confirmButtonText: '点击去往登录页面',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        ElMessage({
          type: 'success',
          message: '去往登录页面成功',
        })
        router.push({path:'/login'})
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消去往登录页面',
        })
      })
}
const toShopInfo = (shopId) => {

  if (shopForm.value.user==null){
    open();
  }else {
    // 如果shopId的值为123，则执行该代码后，页面的URL将变为/shopInfo?query=123。
    //注意query: {shopId} 这里需要大括号括号起来
    router.push({path:'/shopInfo',query: {shopId}})
  }

}

const toback = () => {
  router.back()
}

onMounted(()=>{getShopList()})


</script>

<style scoped>
/****************** 总容器 ******************/
.wrapper {
  width: 100%;
  height: 100%;
}
/****************** header部分 ******************/
.wrapper header {
  width: 100%;
  height: 12vw;
  background-color: #0097FF;
  color: #fff;
  font-size: 4.8vw;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper header .location-text {
  font-size: 4.5vw;
  font-weight: 700;
  color: #fff;
}
.wrapper header .location-text .icon-angle-left{
  position: relative;
  right: 122px;
}
/****************** 商家列表部分 ******************/
.wrapper .shop {
  width: 100%;
  margin-top: 12vw;
  margin-bottom: 14vw;
}
.wrapper .shop li {
  width: 100%;
  box-sizing: border-box;
  padding: 2.5vw;
  border-bottom: solid 1px #DDD;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.wrapper .shop li .shop-img {
  /*这里设置为相当定位，成为shop-img-quantity元素的父元素*/
  position: relative;
}
.wrapper .shop li .shop-img img {
  width: 20vw;
  height: 20vw;
}
.wrapper .shop li .shop-img .shop-img-quantity {
  width: 5vw;
  height: 5vw;
  background-color: red;
  color: #fff;
  font-size: 3.6vw;
  border-radius: 2.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /*设置成绝对定位，不占文档流空间*/
  position: absolute;
  right: -1.5vw;
  top: -1.5vw;
}
.wrapper .shop li .shop-info {
  margin-left: 3vw;
}
.wrapper .shop li .shop-info h3 {
  font-size: 3.8vw;
  color: #555;
}
.wrapper .shop li .shop-info p {
  font-size: 3vw;
  color: #888;
  margin-top: 2vw;
}

</style>
