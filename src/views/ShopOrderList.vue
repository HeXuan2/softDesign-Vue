<template>
  <div class="wrapper" :model="form">
    <!-- header部分 -->
    <header>
      <div class="location-text"><i class="iconfont icon-angle-left" @click="toback"  style="padding-left: 20px"></i>该门店的订单</div>
    </header>
    <!-- 订单列表部分 -->
    <h3>未确认订单信息：</h3>
    <ul class="order">
      <li v-for="item in form.orderArr" v-show="item.confirmStatus==0?true:false">

        <div class="order-info">
          <p>
            {{item.shop.shopName}}
            <i class="iconfont icon-caretdown" @click="detailetShow(item)"></i>
          </p>
          <div class="order-info-right">
            <p>&#165;{{item.orderTotal}}</p>
            <el-button type="success" round size="small" @click="confirmStatus(item.orderId)">确定</el-button>

            <el-popconfirm @confirm="refundStatus(item.orderId)" title="确认要取消订单吗？会导致退款噢~" confirm-button-text="确认" cancel-button-text="取消" >
              <template #reference>
                <el-button type="danger" round size="small">取消</el-button>
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
    <h3>已确认订单信息：</h3>
    <ul class="order">
      <li v-for="item in form.orderArr" v-show="item.confirmStatus==1?true:false">
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
    <h3>已退款订单信息：</h3>
    <ul class="order">
      <li v-for="item in form.orderArr" v-show="item.confirmStatus==2?true:false">
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
const {ordersStore,route,globalProperties,Footer,router} = useCommon();

const form=ref({
  shopId:route.query.shopId,
  orderArr: {},
  user:{}
})

const confirmStatus = async (orderId) => {
  const res=await ordersStore.confirmOrder(orderId)
  if (res.code == globalProperties.$code_success){
    await getListOrders()
    ElMessage({type:'success',message:res.message})
  }else {
    ElMessage({type:'warning',message:res.message})
  }
}

const refundStatus = async (orderId) => {
  const res=await ordersStore.refundOrder(orderId)
  if (res.code == globalProperties.$code_success){
    await getListOrders()
    ElMessage({type:'success',message:res.message})
  }else {
    ElMessage({type:'warning',message:res.message})
  }
}

const toback = () => {
  router.back()
}

const getListOrders = async () => {

      await ordersStore.getOrdersByShopId(form.value.shopId);
        let result = ordersStore.ordersListByShopId;
        for (let orders of result) {
          orders.isShowDetailet = false;
        }
        form.value.orderArr = result;
        // 处理返回结果

}

getListOrders()
const detailetShow = (orders) => {
  orders.isShowDetailet =!orders.isShowDetailet;
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
