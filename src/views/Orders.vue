<template>
  <div class="wrapper" :model="form">
    <!-- header部分 -->
    <header>
      <div class="location-text"><i class="iconfont icon-angle-left" @click="toback"></i>确认订单</div>
    </header>
    <!-- 订单信息部分 -->
    <div class="order-info">
      <h5>订单配送至：</h5>
      <div class="order-info-address" @click="toUserAddress">
        <p>{{form.deliveryAddress!=null? form.deliveryAddress.address:'请选择送货地址'}}</p>
        <i class="iconfont icon-angle-right"></i>
      </div>
      <p>{{form.user.userName}}{{sexFilter}} {{form.user.userId}}</p>
    </div>
    <h3>{{form.shop.shopName}}</h3>
    <!-- 订单明细部分 -->
    <ul class="order-detailed">
      <li v-for="item in form.cartArr">
        <div class="order-detailed-left">
          <img :src="item.item.shopItem.shopItemImg">
          <p>{{item.item.shopItem.shopItemName}} x {{item.quantity}}</p>
        </div>
        <p>&#165;{{item.item.shopItem.shopItemPrice*item.quantity}}</p>
      </li>
    </ul>
    <div class="order-deliveryfee">
      <p>配送费</p>
      <p>&#165;{{form.shop.deliveryPrice}}</p>
    </div>
    <!-- 合计部分 -->
    <div class="total">
      <div class="total-left">
        &#165;{{totalPrice}}
      </div>
      <div class="total-right" @click="toPayment">
        去支付
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref,computed,onMounted} from "vue";
import {ElMessage} from "element-plus";
import { useCommon } from '@/hooks/common';
const {router,route, userStore,deliveryAddressStore,shopStore,ordersStore, cartStore,globalProperties} = useCommon();



const form=ref({
  shopId:route.query.shopId,
  shop:{},
  user:{},
  cartArr:[],
  deliveryAddress:{},
})

const getUserInfo = async () => {
  form.value.user=JSON.parse(sessionStorage.getItem('userInfo'))
  form.value.deliveryAddress =JSON.parse(localStorage.getItem(form.value.user.userId))

}

//查询当前商家
const getShopById = async () => {
  await shopStore.getShopById(route.query.shopId)
  form.value.shop=shopStore.shopById
}
//查询当前用户在购物车中的当前商家食品列表

const getCartList = async () => {
  await cartStore.getCartList(form.value.user.userId,form.value.shopId)
  form.value.cartArr=cartStore.cartList

}


const totalPrice=computed(()=>{
        let totalPrice = 0;
        for(let cartItem of form.value.cartArr){
          totalPrice += cartItem.item.shopItem.shopItemPrice*cartItem.quantity;
        }
        totalPrice += form.value.shop.deliveryPrice;
        return totalPrice
});

const sexFilter = computed(() => {
  const value=form.value.user.userSex
  return value==1?'先生':'女士';
});


const toUserAddress = () => {
  router.push({path:'/userAddress',query:{shopId:form.value.shopId}});
}

const createOrders = async () => {
  const userId=form.value.user.userId
  const shopId=form.value.shopId
  const daId=form.value.deliveryAddress.daId
  const orderTotal=totalPrice.value

  const res=await ordersStore.createOrders({userId,shopId,daId,orderTotal})

  if (res.code==globalProperties.$code_success){
    let orderId = res.data.orderId;
    if(orderId>0){
      router.push({path:'/payment',query:{orderId:orderId}});
    }else {
      ElMessage({type:'warning',message:"创建订单失败"})
    }
}}

const toPayment = async () => {
  if(form.value.deliveryAddress==null){
    ElMessage({type:"warning",message:"请选择送货地址"})
    return;
  }
  createOrders()
}
const toback = () => {
  router.push({path:'/shopInfo',query: {shopId: form.value.shopId}})
}
onMounted(()=>{getUserInfo(),getShopById(),getCartList()})


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
.wrapper .order-info {
  /*注意这里，不设置高，靠内容撑开。因为地址有可能折行*/
  width: 100%;
  margin-top: 12vw;
  background-color: #0097EF;
  box-sizing: border-box;
  padding: 2vw;
  color: #fff;
}
.wrapper .order-info h5 {
  font-size: 3vw;
  font-weight: 300;
}
.wrapper .order-info .order-info-address {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  user-select: none;
  cursor: pointer;
  margin: 1vw 0;
}
.wrapper .order-info .order-info-address p {
  width: 90%;
  font-size: 5vw;
}
.wrapper .order-info .order-info-address i {
  font-size: 6vw;
}
.wrapper .order-info p {
  font-size: 3vw;
}
.wrapper h3 {
  box-sizing: border-box;
  padding: 3vw;
  font-size: 4vw;
  color: #666;
  border-bottom: solid 1px #DDD;
}
/****************** 订单明细部分 ******************/
.wrapper .order-detailed {
  width: 100%;
}
.wrapper .order-detailed li {
  width: 100%;
  height: 16vw;
  box-sizing: border-box;
  padding: 3vw;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wrapper .order-detailed li .order-detailed-left {
  display: flex;
  align-items: center;
}
.wrapper .order-detailed li .order-detailed-left img {
  width: 10vw;
  height: 10vw;
}
.wrapper .order-detailed li .order-detailed-left p {
  font-size: 3.5vw;
  margin-left: 3vw;
}
.wrapper .order-detailed li p {
  font-size: 3.5vw;
}
.wrapper .order-deliveryfee {
  width: 100%;
  height: 16vw;
  box-sizing: border-box;
  padding: 3vw;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 3.5vw;
}
/****************** 订单合计部分 ******************/
.wrapper .total {
  width: 100%;
  height: 14vw;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
}
.wrapper .total .total-left {
  flex: 2;
  background-color: #505051;
  color: #fff;
  font-size: 4.5vw;
  font-weight: 700;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper .total .total-right {
  flex: 1;
  background-color: #38CA73;
  color: #fff;
  font-size: 4.5vw;
  font-weight: 700;
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
