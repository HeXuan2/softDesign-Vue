<template>
  <div class="wrapper" :model="form">
    <!-- header部分 -->
    <header>
      <div class="location-text"><i class="iconfont icon-angle-left" @click="toback"></i>在线支付</div>
    </header>
    <!-- 订单信息部分 -->
    <h3>订单信息：</h3>
    <div class="order-info">
      <p>
        {{form.orders.shop.shopName}}
        <i class="iconfont icon-caretdown" @click="detailetShow"></i>
      </p>
      <p>&#165;{{form.orders.orderTotal}}</p>
    </div>
    <!-- 订单明细部分 -->
    <ul class="order-detailet" v-show="form.isShowDetailet">
      <li v-for="item in form.orders.lineitemList">
        <p>{{item.item.shopItem.shopItemName}} x {{item.quantity}}</p>
        <p>&#165;{{item.item.shopItem.shopItemPrice*item.quantity}}</p>
      </li>
      <li>
        <p>配送费</p>
        <p>&#165;{{form.orders.shop.deliveryPrice}}</p>
      </li>
    </ul>
    <!-- 支付方式部分 -->
    <ul class="payment-type">
      <li>
        <img class="alipayImg" src="../assets/alipay.png">
        <i class="iconfont icon-check-circle"></i>
      </li>
      <li>
        <img class="wechatImg" src="../assets/wechat.png">
      </li>
    </ul>
    <div class="payment-button">
      <button @click="payOrder">确认支付</button>
    </div>
    <!-- 底部菜单部分 -->
    <Footer></Footer>

  </div>
</template>
<script setup>
import {ref,onMounted,onUnmounted} from "vue";
import { useCommon } from '@/hooks/common';
import {ElMessage} from "element-plus";
const {router, userStore,ordersStore,route, globalProperties,Footer} = useCommon();

const toback = () => {
  router.back()
}

const form=ref({
  orderId:route.query.orderId,
  orders:{
    shop:{}
  },
  isShowDetailet:false
})

const getOrdersById = async () => {
  await ordersStore.getOrdersListById(form.value.orderId)
  form.value.orders=ordersStore.ordersList

}

const payOrder = async () => {
  const res=await ordersStore.payOrder(form.value.orderId)
  ElMessage({type:'success',message:res.message})
  router.push({path:'/orderList'})
}

getOrdersById();

onMounted(()=>{
  //这里的代码是实现：一旦路由到在线支付组件，就不能回到订单确认组件。
  //先将当前url添加到history对象中
  history.pushState(null,null,document.URL);
  //popstate事件能够监听history对象的变化
  window.onpopstate = () => {
    router.push({path:'/index'});
  }
})

onUnmounted(()=>{
  window.onpopstate = null;
})

const detailetShow = () => {
  form.value.isShowDetailet = !form.value.isShowDetailet;
}

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
/****************** 订单信息部分 ******************/
.wrapper h3 {
  margin-top: 12vw;
  box-sizing: border-box;
  padding: 4vw 4vw 0;
  font-size: 4vw;
  font-weight: 300;
  color: #999;
}
.wrapper .order-info {
  box-sizing: border-box;
  padding: 4vw;
  font-size: 4vw;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wrapper .order-info p:last-child {
  color: orangered;
}
/****************** 订单明细部分 ******************/
.wrapper .order-detailet {
  width: 100%;
}
.wrapper .order-detailet li {
  width: 100%;
  box-sizing: border-box;
  padding: 1vw 4vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wrapper .order-detailet li p {
  font-size: 3vw;
  color: #666;
}
/****************** 支付方式部分 ******************/
.wrapper .payment-type {
  width: 100%;
  height: 100%;
}
.wrapper .payment-type li {
  width: 100%;
  box-sizing: border-box;
  padding: 4vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wrapper .payment-type li .alipayImg {
  width: 12vw;
  height: 12vw;
}
.wrapper .payment-type li .wechatImg {
  margin-left: -9px;
  width: 18vw;
  height: 16vw;
}

.wrapper .payment-type li .icon-check-circle {
  font-size: 5vw;
  color: #38CA73;
}
.wrapper .payment-button {
  width: 100%;
  box-sizing: border-box;
  padding: 4vw;
}
.wrapper .payment-button button {
  width: 100%;
  height: 10vw;
  border: none;
  /*去掉外轮廓线*/
  outline: none;
  border-radius: 4px;
  background-color: #38CA73;
  color: #fff;
}

</style>
