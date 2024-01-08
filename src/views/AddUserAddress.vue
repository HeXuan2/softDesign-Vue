<template>
  <div class="wrapper" :model="form">
    <!-- header部分 -->
    <header>
      <div class="location-text"><i class="iconfont icon-angle-left" @click="toback"></i>新增送货地址</div>
    </header>
    <!-- 表单部分 -->
    <ul class="form-box">
      <li>
        <div class="title">
          联系人：
        </div>
        <div class="content">
          <input type="text" v-model="form.deliveryAddress.contactName" placeholder="联系人
姓名">
        </div>
      </li>
      <li>
        <div class="title">
          性别：
        </div>
        <div class="content" style="font-size: 3vw;">
          <input type="radio" v-model="form.deliveryAddress.contactSex" value="1"
                 style="width:6vw;height:3.2vw;">男
          <input type="radio" v-model="form.deliveryAddress.contactSex" value="0"
                 style="width:6vw;height:3.2vw;">女
        </div>
      </li>
      <li>
        <div class="title">
          电话：
        </div>
        <div class="content">
          <input type="tel" v-model="form.deliveryAddress.contactTel" placeholder="电话">
        </div>
      </li>
      <li>
        <div class="title">
          收货地址：
        </div>

        <div class="content">
          <el-input type="textarea" id="tipinput" v-model="form.deliveryAddress.address" placeholder="收货地址"></el-input>
          <el-button @click="toMap">选择收货地址</el-button>
        </div>
      </li>
    </ul>
    <div class="button-add">
      <button @click="addUserAddress">保存</button>
    </div>
    <!-- 底部菜单部分 -->
    <Footer></Footer>

  </div>

</template>
<script setup>
import {ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import { useCommon } from '@/hooks/common';
import {storeToRefs} from "pinia";
const {router,gaoDeAddress,userStore,deliveryAddressStore,route, globalProperties,Footer} = useCommon();
const {address}=storeToRefs(gaoDeAddress)

const form=ref({
  shopId:route.query.shopId,
  user:{},
  deliveryAddress:{
    contactName:'何璇',
    contactSex:1,
    contactTel:'12345678910',
    address:address.value.showAddress
  }
});



form.value.user=JSON.parse(sessionStorage.getItem('userInfo'))


const addUserAddress = async () => {
  if(form.value.deliveryAddress.contactName==''){
    ElMessage({type:'warning',message:"联系人不能为空"})
    return;
  }
  if(form.value.deliveryAddress.contactTel==''){
    ElMessage({type:'warning',message:"联系人账号不能为空"})
    return;
  }
  if(form.value.deliveryAddress.address==''){
    ElMessage({type:'warning',message:"联系人地址不能为空"})
    return;
  }

  form.value.deliveryAddress.userId=form.value.user.userId

  const res= await deliveryAddressStore.saveDeliveryAddress(form.value.deliveryAddress)
  if(res.code==globalProperties.$code_success){
    router.push({path:'/userAddress',query:{shopId:form.value.shopId}})
  }else {
    ElMessage({type:'warning',message:"新增地址失败"})
  }
}
const toback = () => {
  router.push({path:'/UserAddress',query:{shopId:form.value.shopId}})
}
const toMap = () => {
  router.push({path:'/MapContainer'})
}

</script>

<style scoped>
/*************** 总容器 ***************/
.wrapper {
  width: 100%;
  height: 100%;
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

/*************** （表单信息） ***************/
.wrapper .form-box {
  width: 100%;
  margin-top: 12vw;
}
.wrapper .form-box li {
  box-sizing: border-box;
  padding: 4vw 3vw 0vw 3vw;
  display: flex;
}
.wrapper .form-box li .title {
  flex: 0 0 18vw;
  font-size: 3vw;
  font-weight: 700;
  color: #666;
}
.wrapper .form-box li .content {
  flex: 1;
  display: flex;
  align-items: center;
}
.wrapper .form-box li .content input {
  border: none;
  outline: none;
  width: 100%;
  height: 4vw;
  font-size: 3vw;
  word-break:break-word;
}
.wrapper .button-add {
  box-sizing: border-box;
  padding: 4vw 3vw 0vw 3vw;
}
.wrapper .button-add button {
  width: 100%;
  height: 10vw;
  font-size: 3.8vw;
  font-weight: 700;
  border: none;
  outline: none;
  border-radius: 4px;
  color: #fff;
  background-color: #38CA73;
}
</style>
