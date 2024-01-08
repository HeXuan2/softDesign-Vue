<template>
  <div class="wrapper">
    <!-- header部分 -->
    <header>
      <div class="location-text"><i class="iconfont icon-angle-left" @click="toback" style="padding-left: 20px"></i>我的门店列表
        <i class="iconfont icon-plus-circle" style="color:white;font-size: 20px;"  @click="toAddShop" ></i>
      </div>

    </header>

    <!-- 我的门店列表部分 -->
    <ul class="shop" :model="myShopForm">
      <li v-for="item in myShopForm.myShopList" >
        <div class="shopDiv" @click="toShopInfo(item.shopId)" style="width: 50%">
        <div class="shop-img" style="display: flex;align-items: center; justify-content: center;">
          <img :src="item.shopLogo">
        </div>

        <div class="shop-info" >
          <h3 style="display: flex;align-items: center; justify-content: center;">{{item.shopName}}</h3>
          <p>&#165;{{item.startPrice}}起送 | &#165;{{item.deliveryPrice}}配送</p>
          <p>{{item.shopDescription}}</p>
        </div>
        </div>

        <div class="button" style="width: 50%">
        <el-button type="success" round style="width: 65px; height: 35px;font-size: 12px" @click="updateShop(item.shopId)" >更新门店</el-button>
          <el-popconfirm @confirm="deleteShop(item.shopId)" title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消" >
            <template #reference>
              <el-button type="danger" round style="width: 65px; height: 35px; font-size: 12px">删除门店</el-button>
            </template>
          </el-popconfirm>


        </div>
      </li>
    </ul>




    <!-- 底部菜单部分 -->
    <Footer></Footer>
  </div>
</template>
<script setup>
import { ref,onMounted,reactive} from 'vue';
import { useCommon } from '@/hooks/common';
import {ElMessage} from "element-plus";
const {router,shopStore,route, globalProperties,Footer} = useCommon();

const myShopForm=ref({
  businessId:route.query.businessId,
  myShopList:[],
  user:{}
})

const getShopListByBusinessId = async () => {
  await shopStore.listShopByBusinessId(myShopForm.value.businessId)
  myShopForm.value.myShopList=shopStore.shopListByBusinessId
}

const updateShop = (shopId) => {
  router.push({path:"/updateShop",query:{shopId: shopId}})
}

const deleteShop = async (shopId) => {
  const res=await shopStore.deleteShop(shopId)
  if(res.code==globalProperties.$code_success) {
    await getShopListByBusinessId()
    ElMessage({type:'success',message:res.message})

  }else {
    ElMessage({type:'warning',message:res.message})
  }

}

const confirm = () => {

}

const toShopInfo = (shopId) => {
    router.push({path:'/shopInfo',query: {shopId}})
}

const toAddShop = () => {
  router.push({path:'/addShop',query: {businessId:myShopForm.value.businessId}})
}

const toback = () => {
  router.back()
}

onMounted(()=>{getShopListByBusinessId()})


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
