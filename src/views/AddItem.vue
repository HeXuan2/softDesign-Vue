<template>
  <div class="wrapper">
    <!-- header部分 -->
    <header>
      <div class="location-text"><i class="iconfont icon-angle-left" @click="toback"  style="padding-left: 20px"></i>我的商品列表</div>
        <i class="iconfont icon-plus-circle" style="color:white;font-size: 20px;margin-left: 10px"  @click="toAddShopItem" ></i>
    </header>
    <!-- 商品列表部分 -->
    <ul class="shop" :model="itemForm">

      <li v-for="item in itemForm.shopItemList" >

        <div class="shopDiv"  style="width: 70%;display: flex;">

          <div class="shop-img">
          <img :src="item.shopItemImg">
        </div>

        <div class="shop-info" style="display: flex; flex-direction: column; justify-content: center;">
          <h3>{{item.shopItemName}}</h3>
          <p>&#165;{{item.shopItemPrice}}</p>
          <p>{{item.shopItemDescription}}</p>
        </div>

        </div>

        <div class="button" style="width: 30% ;display: flex; flex-direction: column;">
          <el-button type="primary" round style="width: 65px; height: 30px;font-size: 12px;margin-bottom: 10px"  @click="updateItem(item.shopItemId)">更新商品</el-button>
          <el-button type="success" round style="width: 65px; height: 30px;font-size: 12px ;margin-bottom: 10px"  @click="addItem(item.shopItemId)">上架商品</el-button>

          <el-popconfirm @confirm="deleteItem(item.shopItemId)" title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消" >
            <template #reference>
              <el-button type="danger" round style="width: 65px; height: 30px; font-size: 12px">删除商品</el-button>
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

import { ref,onMounted} from 'vue';
import { useCommon } from '@/hooks/common';
import {ElMessage} from "element-plus";
const {router, route,shopItemStore,itemStore, globalProperties,Footer} = useCommon();

const itemForm=ref({
  user:{},
  businessId:'',
  item:{
    shopId:route.query.shopId,
    shopItemId:''
  },
  shopItemList:[],
})

const getShopItemListByBusinessId = async () => {
  itemForm.value.user=JSON.parse(sessionStorage.getItem("userInfo"));
  itemForm.value.businessId=itemForm.value.user.userId
  await shopItemStore.getShopItemListByBusinessId(itemForm.value.businessId)
  itemForm.value.shopItemList=shopItemStore.shopItemListByBusinessId
}

const addItem = async (itemId) => {
  itemForm.value.item.shopItemId=itemId
  const res=await itemStore.createItem(itemForm.value.item)
  if(res.code==globalProperties.$code_success){
    ElMessage({type:'success',message:res.message})
  }else if(res.data==-1){
    ElMessage({type:'warning',message:res.message})
  }else {
    ElMessage({type:'warning',message:res.message})
  }
}

const updateItem = (shopItemId) => {
  router.push({path:'/updateShopItem',query:{shopItemId:shopItemId}})
}

const deleteItem = async (shopItemId) => {
  const res=await shopItemStore.deleteShopItem(shopItemId)
  if(res.code==globalProperties.$code_success){
    await getShopItemListByBusinessId()
    ElMessage({type:'success',message:res.message})
  }else{
    ElMessage({type:'warning',message:res.message})
  }
}

onMounted(getShopItemListByBusinessId)

const toback = () => {
  router.back()
}

const toAddShopItem = () => {
  router.push({path:"/addShopItem",query:{businessId:itemForm.value.businessId}})
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
