<template>
  <div class="wrapper" :model="form">

    <!-- header部分 -->
    <header>
      <div class="location-text"><i class="iconfont icon-angle-left" @click="toback"></i>门店信息</div>
    </header>
    <!-- 商家logo部分 -->
    <div class="shop-logo">
      <img :src="form.shop.shopLogo">
    </div>
    <!-- 商家信息部分 -->
    <div class="shop-info">
      <h1>{{form.shop.shopName}}</h1>
      <p>&#165;{{form.shop.startPrice}}起送 &#165;{{form.shop.deliveryPrice}}配送</p>
      <p>{{form.shop.shopDescription}}</p>
    </div>
    <div style="display: flex; justify-content: center;"  v-if="form.user.role == 2 && form.user.userId == form.shop.businessId">
      <el-button type="primary" @click="toAddItem">添加上架商品</el-button>
      <el-button type="primary" @click="toShopOrders">查看门店订单</el-button>
    </div>

    <!-- 食品列表部分 -->
    <ul class="item">
      <li v-for="(item,index) in form.itemArr">
        <div class="item-left">
          <img :src="item.shopItem.shopItemImg">
          <div class="item-left-info">
            <h3>{{item.shopItem.shopItemName}}</h3>
            <p>{{item.shopItem.shopItemDescription}}</p>
            <p>&#165;{{item.shopItem.shopItemPrice}}</p>
          </div>
        </div>
        <div class="item-right">
          <div>
            <i class="iconfont icon-minus-circle" @click="minus(index)" v-show="item.quantity!=0"></i>
          </div>
          <p><span v-show="item.quantity!=0">{{item.quantity}}</span></p>
          <div>
            <i class="iconfont icon-plus-circle" @click="add(index)"></i>
          </div>
        </div>
      </li>
    </ul>



    <!-- 购物车部分 -->
    <div class="cart">
      <div class="cart-left">
        <div class="cart-left-icon" :style="totalQuantity==0?'background-color:#505051;':'background-color:#3190E8;'">
          <i class="iconfont icon-shoppingcart"></i>
          <div class="cart-left-icon-quantity" v-show="totalQuantity!=0">
            {{totalQuantity}}</div>
        </div>
        <div class="cart-left-info">
          <p>&#165;{{totalPrice}}</p>
          <p>另需配送费{{form.shop.deliveryPrice}}元</p>
        </div>
      </div>
      <div class="cart-right">
        <!-- 不够起送费 -->
        <div class="cart-right-item" v-show="totalSettle<form.shop.startPrice"
             style="background-color: #535356;cursor: default;">
          &#165;{{form.shop.startPrice}}起送
        </div>
        <!-- 达到起送费 -->
        <div class="cart-right-item" @click="toOrder" v-show="totalSettle>=form.shop.startPrice">
          去结算
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref,onMounted,computed,onBeforeMount} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import { useCommon } from '@/hooks/common';
const {router,shopStore,route, itemStore,cartStore,globalProperties,Footer} = useCommon();

const form=ref({
  shopId:route.query.shopId,
  shop: {},
  itemArr: [],
  user: {}
})

form.value.user=JSON.parse(sessionStorage.getItem('userInfo'));
if (form.value.user==null){
  open();
}
const getShopById = async () => {
  await shopStore.getShopById(form.value.shopId)
  form.value.shop=shopStore.shopById
}

const getItemList = async () => {
  await itemStore.getItemListByShopId(form.value.shopId)
  form.value.itemArr=itemStore.itemListByShopId

  for (let i = 0; i < form.value.itemArr.length; i++) {
    form.value.itemArr[i].quantity = 0;
  }
  //如果已登录，那么需要去查询购物车中是否已经选购了某个食品
  if (form.value.user!= null) {
    listCart();
  }
}

const listCart = async () => {
  await cartStore.getCartList(form.value.user.userId,form.value.shopId)
  let cartArr =cartStore.cartList;
  //遍历所有食品列表
  for (let itemItem of form.value.itemArr) {
    itemItem.quantity = 0;
    for (let cartItem of cartArr) {
      if (cartItem.itemId == itemItem.itemId) {
        itemItem.quantity = cartItem.quantity;
      }
    }
  }
  form.value.itemArr.sort();
}

const open = () => {
  ElMessageBox.confirm(
      '请先登录，才能显示数据',
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


getShopById()
getItemList()

const add = (index) => {

  //首先做登录验证
  if (form.value.user == null) {
    open()
  }
  if (form.value.itemArr[index].quantity == 0) {
    //做insert
    saveCart(index);
  } else {
    //做update
    updateCart(index, 1);
  }
}
const minus = (index) => {
  //首先做登录验证
  if (form.value.user == null) {
    router.push({
      path: '/login'
    });
    return;
  }
  if (form.value.itemArr[index].quantity > 1) {
    //做update
    updateCart(index, -1);
  } else {
    //做delete
    removeCart(index);
  }
}

const saveCart = async (index) => {
  //有没有更好的方式传参呢？
  const itemId=form.value.itemArr[index].itemId
  const shopId=form.value.shopId
  const userId=form.value.user.userId
  const quantity=1
  const res= await cartStore.saveCart({itemId,shopId,userId,quantity})

  if (res.code==globalProperties.$code_success){
    form.value.itemArr[index].quantity=1
    form.value.itemArr.sort();
  }else {
    ElMessage({type:'warning',message:"向购物车中增加食品失败"})
  }

}

const updateCart = async (index, num) => {

  //有没有更好的方式传参呢？
  const itemId=form.value.itemArr[index].itemId
  const shopId=form.value.shopId
  const userId=form.value.user.userId
  const quantity=form.value.itemArr[index].quantity+num


  const res=await cartStore.updateCart({itemId,shopId,userId,quantity})


  if(res.code==globalProperties.$code_success){
    form.value.itemArr[index].quantity += num;
    form.value.itemArr.sort();
  }else {
    ElMessage({type:'warning',message:"向购物车中更新食品失败"})
  }
}

const removeCart = async (index) => {
  const res=await cartStore.removeCart(form.value.shopId,form.value.user.userId,form.value.itemArr[index].itemId)
  if(res.code==globalProperties.$code_success){
    form.value.itemArr[index].quantity = 0;
    form.value.itemArr.sort();
  }else {
    ElMessage({type:'warning',message:"从购物车中删除食品失败"})
  }
}

//
const toOrder = () => {
  router.push({
    path: '/orders',
    query: {
      shopId: form.value.shop.shopId
    }
  });
}

const toback = () => {
  // router.push({path:'/shopList',query:{orderTypeId:form.value.shop.orderTypeId}});
  router.back()
}

//食品总价格
const totalPrice = computed(() => {
  let total = 0;
  for (let item of form.value.itemArr) {
    total += item.shopItem.shopItemPrice * item.quantity;
  }
  return total;
});

//计算食品总量
const totalQuantity = computed(() => {
  let quantity = 0;
  for (let item of form.value.itemArr) {
    quantity += item.quantity;
  }
  return quantity;
});

const totalSettle = computed(() => {
  return totalPrice.value + form.value.shop.deliveryPrice;
});


const toAddItem = () => {
  router.push({path:'/addItem',query:{shopId:form.value.shopId}})
}

const toShopOrders = () => {
  router.push({path:'/shopOrderList',query:{shopId:form.value.shopId}})
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
/****************** 商家logo部分 ******************/
.wrapper .shop-logo {
  width: 100%;
  height: 35vw;
  /*使用上外边距避开header部分*/
  margin-top: 12vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper .shop-logo img {
  width: 40vw;
  height: 30vw;
  border-radius: 5px;
}
/****************** 商家信息部分 ******************/
.wrapper .shop-info {
  width: 100%;
  height: 20vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.wrapper .shop-info h1 {
  font-size: 5vw;
}
.wrapper .shop-info p {
  font-size: 3vw;
  color: #666;
  margin-top: 1vw;
}
/****************** 食品列表部分 ******************/
.wrapper .item {
  width: 100%;
  /*使用下外边距避开footer部分*/
  margin-bottom: 14vw;
}
.wrapper .item li {
  width: 100%;
  box-sizing: border-box;
  padding: 2.5vw;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wrapper .item li .item-left {
  display: flex;
  align-items: center;
}
.wrapper .item li .item-left img {
  width: 20vw;
  height: 20vw;
}
.wrapper .item li .item-left .item-left-info {
  margin-left: 3vw;
}
.wrapper .item li .item-left .item-left-info h3 {
  font-size: 3.8vw;
  color: #555;
}
.wrapper .item li .item-left .item-left-info p {
  font-size: 3vw;
  color: #888;
  margin-top: 2vw;
}
.wrapper .item li .item-right {
  width: 16vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wrapper .item li .item-right .icon-minus-circle {
  font-size: 5.5vw;
  color: #999;
  cursor: pointer;
}
.wrapper .item li .item-right p {
  font-size: 3.6vw;
  color: #333;
}
.wrapper .item li .item-right .icon-plus-circle {
  font-size: 5.5vw;
  color: #0097EF;
  cursor: pointer;
}
/****************** 购物车部分 ******************/
.wrapper .cart {
  width: 100%;
  height: 14vw;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
}
.wrapper .cart .cart-left {
  flex: 2;
  background-color: #505051;
  display: flex;
}
.wrapper .cart .cart-left .cart-left-icon {
  width: 16vw;
  height: 16vw;
  box-sizing: border-box;
  border: solid 1.6vw #444;
  border-radius: 8vw;
  background-color: #3190E8;
  font-size: 7vw;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -4vw;
  margin-left: 3vw;
  position: relative;
}
.wrapper .cart .cart-left .icon-shoppingcart {
  font-size: 30px;
}

.wrapper .cart .cart-left .cart-left-icon-quantity {
  width: 5vw;
  height: 5vw;
  border-radius: 2.5vw;
  background-color: red;
  color: #fff;
  font-size: 3.6vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -1.5vw;
  top: -1.5vw;
}
.wrapper .cart .cart-left .cart-left-info p:first-child {
  font-size: 4.5vw;
  color: #fff;
  margin-top: 1vw;
}
.wrapper .cart .cart-left .cart-left-info p:last-child {
  font-size: 2.8vw;
  color: #AAA;
}
.wrapper .cart .cart-right {
  flex: 1;
}
/*达到起送费时的样式*/
.wrapper .cart .cart-right .cart-right-item {
  width: 100%;
  height: 100%;
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

/*不够起送费时的样式（只有背景色和鼠标样式的区别）*/
/*
.wrapper .cart .cart-right .cart-right-item{
width: 100%;
height: 100%;
background-color: #535356;
color: #fff;
font-size: 4.5vw;
font-weight: 700;
user-select: none;

display: flex;
justify-content: center;
align-items: center;
}
*/

</style>
