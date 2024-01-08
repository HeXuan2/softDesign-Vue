<template>
  <div class="wrapper" :model="form">
    <!-- header部分 -->
    <header>
      <p>我的订单</p>
    </header>
    <!-- 订单列表部分 -->
    <h3>未支付订单信息：</h3>
    <ul class="order">
      <li v-for="item in form.orderArr" v-show="item.payState==0?true:false">

        <div class="order-info">
          <p>
            {{item.shop.shopName}}
            <i class="iconfont icon-caretdown" @click="detailetShow(item)"></i>
          </p>
          <div class="order-info-right">
            <p>&#165;{{item.orderTotal}}</p>
            <el-button type="success" round size="small" @click="toPayment(item.orderId)">去支付</el-button>

            <el-popconfirm @confirm="deleteOrder(item.orderId)" title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消" >
              <template #reference>
                <el-button type="danger" round size="small">删除订单</el-button>
              </template>
            </el-popconfirm>


          </div>
        </div>
        <ul class="order-detailet" v-show="item.isShowDetailet">
          <li v-for="odItem in item.lineitemList">
            <p>{{odItem.item.shopItem.shopItemName}} x {{odItem.quantity}}</p>
            <p>&#165;{{odItem.item.shopItem.shopItemPrice*odItem.quantity}}</p>
          </li>
          <li>
            <p>配送费</p>
            <p>&#165;{{item.shop.deliveryPrice}}</p>
          </li>
        </ul>
      </li>
    </ul>
    <h3>已支付订单信息：</h3>
    <ul class="order">
      <li v-for="item in form.orderArr" v-show="item.payState==1?true:false">
        <div class="order-info">
          <p>
            {{item.shop.shopName}}
            <i class="iconfont icon-caretdown" @click="detailetShow(item)"></i>
          </p>
          <div class="order-info-right">
            <p>&#165;{{item.orderTotal}}</p>
          </div>
        </div>
        <ul class="order-detailet" v-show="item.isShowDetailet">
          <li v-for="odItem in item.lineitemList">
            <p>{{odItem.item.shopItem.shopItemName}} x {{odItem.quantity}}</p>
            <p>&#165;{{odItem.item.shopItem.shopItemPrice*odItem.quantity}}</p>
          </li>
          <li>
            <p>配送费</p>
            <p>&#165;{{item.shop.deliveryPrice}}</p>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 底部菜单部分 -->
    <Footer></Footer>
  </div>
</template>
<script setup>
import {computed, ref} from "vue";
import {useCommon } from '@/hooks/common';
import {ElMessage, ElMessageBox} from "element-plus";
const {ordersStore,globalProperties,Footer,router} = useCommon();

const form=ref({
  orderArr: {},
  user:{}
})



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


const getListOrders = async () => {
  form.value.user =JSON.parse(sessionStorage.getItem('userInfo'));
  try {
     if(form.value.user!=null){
    const res = await ordersStore.getOrdersListByUserIdId(form.value.user.userId);

    if (res && res.data) {
      let result = res.data;
      for (let orders of result) {
        orders.isShowDetailet = false;
      }
      form.value.orderArr = result;
      // 处理返回结果
    } else {

      // throw new Error('请求返回值为空,请先登录');
    }} else {
       open();
     }
  } catch (error) {
    console.error(error);
  }

}

getListOrders()
const detailetShow = (orders) => {
  orders.isShowDetailet =!orders.isShowDetailet;
}
const toPayment = (orderId) => {
  router.push({path:'/payment',query:{orderId:orderId}})
}

const deleteOrder = async (orderId) => {
  const res=await ordersStore.deleteOrder(orderId)
  if (res.code == globalProperties.$code_success){
    await getListOrders()
    ElMessage({type:'success',message:res.message})
  }else {
    ElMessage({type:'warning',message:res.message})
  }
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
/****************** 历史订单列表部分 ******************/
.wrapper h3 {
  margin-top: 12vw;
  box-sizing: border-box;
  padding: 4vw;
  font-size: 4vw;
  font-weight: 300;
  color: #999;
}
.wrapper .order {
  width: 100%;
}
.wrapper .order li {
  width: 100%;
}
.wrapper .order li .order-info {
  box-sizing: border-box;
  padding: 2vw 4vw;
  font-size: 4vw;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wrapper .order li .order-info .order-info-right {
  display: flex;
}
.wrapper .order li .order-info .order-info-right .order-info-right-icon {
  background-color: #f90;
  color: #fff;
  border-radius: 3px;
  margin-left: 2vw;
  user-select: none;
  cursor: pointer;
}
.wrapper .order li .order-detailet {
  width: 100%;
}
.wrapper .order li .order-detailet li {
  width: 100%;
  box-sizing: border-box;
  padding: 1vw 4vw;
  color: #666;
  font-size: 3vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
