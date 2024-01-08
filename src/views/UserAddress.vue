<template>
  <div class="wrapper" :model="form">
    <!-- header部分 -->
    <header>
      <div class="location-text"><i class="iconfont icon-angle-left" @click="toback"></i>地址管理</div>
    </header>

    <!-- 地址列表部分 -->
    <ul class="addresslist">
      <li v-for="item in form.deliveryAddressArr">
        <div class="addresslist-left" @click="setDeliveryAddress(item)">
          <h3>{{item.contactName}}{{item.contactSex==1?'先生':'女士'}} {{item.contactTel}}
          </h3>
          <p>{{item.address}}</p>
        </div>
        <div class="addresslist-right">
          <i class="iconfont icon-edit" @click="editUserAddress(item.daId)"></i>
          <el-popconfirm @confirm="removeUserAddress(item.daId)" title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消" >
            <template #reference>
              <el-button class="iconfont icon-remove"></el-button>
            </template>
          </el-popconfirm>


        </div>
      </li>
    </ul>


    <!-- 新增地址部分 -->
    <div class="addbtn" @click="toAddUserAddress()">
      <i class="iconfont icon-plus-circle"></i>
      <p>新增收货地址</p>
    </div>

<!--    <el-button @click="nihao">nihao</el-button>-->
    <!-- 底部菜单部分 -->
    <Footer></Footer>

  </div>
</template>


<script setup>
import {onBeforeMount, reactive} from "vue";
import { useCommon } from '@/hooks/common';
import {ElMessage, ElMessageBox} from "element-plus";
const {router, userStore,deliveryAddressStore,route, globalProperties,Footer} = useCommon();


const form=reactive({
  shopId:route.query.shopId,
  user:JSON.parse(sessionStorage.getItem('userInfo')),
  deliveryAddressArr:[]
})



const listDeliveryAddressByUserId = async () => {
  if(form.user!=null){
    await deliveryAddressStore.getDeliveryAddressByUserId(form.user.userId)
    form.deliveryAddressArr= deliveryAddressStore.deliveryAddressList
  }
}

onBeforeMount(()=>listDeliveryAddressByUserId())


const setDeliveryAddress = (deliveryAddress) => {
  localStorage.setItem(form.user.userId,JSON.stringify(deliveryAddress))
  router.push({path:'/orders',query:{shopId:form.shopId}})
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


const toAddUserAddress =() => {

  if(JSON.parse(sessionStorage.getItem('userInfo'))==null){
    open();
  }else {
    router.push({path:'/addUserAddress',query:{shopId:form.shopId}})
  }

}

const editUserAddress= (daId) => {
  router.push({path:'/editUserAddress',query:{shopId:form.shopId,daId:daId}})
}

const removeUserAddress =async (daId) => {
  const res = await deliveryAddressStore.removeDeliveryAddress(daId)
  await listDeliveryAddressByUserId()

  if (res.code == globalProperties.$code_success) {
    ElMessage({
      type: 'success',
      message: 'Delete completed',
    })
  } else {
    ElMessage({type: 'warning', message: "删除地址失败"})
  }
}

const toback = () => {
  router.push({path:'/Orders',query:{shopId:form.shopId}});
}

</script>

<style scoped>
/*************** 总容器 ***************/
.wrapper {
  width: 100%;
  height: 100%;
  background-color: #F5F5F5;
}
/*************** header ***************/
.wrapper header {
  width: 100%;
  height: 12vw;
  background-color: #0097FF;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  font-size: 4.8vw;
  position: fixed;
  left: 0;
  top: 0;
  /*保证在最上层*/
  z-index: 1000;
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

/*************** addresslist ***************/
.wrapper .addresslist {
  width: 100%;
  margin-top: 12vw;
  background-color: #fff;
}

.wrapper .addresslist li {
  width: 100%;
  box-sizing: border-box;
  border-bottom: solid 1px #DDD;
  padding: 3vw;
  display: flex;
}
.wrapper .addresslist li .addresslist-left {
  flex: 5;
  /*左边这块区域是可以点击的*/
  user-select: none;
  cursor: pointer;
}
.wrapper .addresslist li .addresslist-left h3 {
  font-size: 4.6vw;
  font-weight: 300;
  color: #666;
}
.wrapper .addresslist li .addresslist-left p {
  font-size: 4vw;
  color: #666;
}
.wrapper .addresslist li .addresslist-right {
  flex: 1;
  font-size: 5.6vw;
  color: #999;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.wrapper .addresslist li .addresslist-right .icon-edit{
  margin-right: 10px;
  font-size: 20px;
}
.wrapper .addresslist li .addresslist-right .icon-remove{
  font-size: 20px;
}

.wrapper .addresslist li .addresslist-right .el-button{
  width: 0px;
  height: 27px;
}


/*************** 新增地址部分 ***************/
.wrapper .addbtn {
  width: 100%;
  height: 14vw;
  border-top: solid 1px #DDD;
  border-bottom: solid 1px #DDD;
  background-color: #fff;
  margin-top: 4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4.5vw;
  color: #0097FF;
  user-select: none;
  cursor: pointer;
}
.wrapper .addbtn p {
  margin-left: 2vw;
}
</style>
