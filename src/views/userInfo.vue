<script setup>
import { useCommon} from '@/hooks/common';
import {ref} from "vue";

const {router,customerStore,businessStore,globalProperties,Footer} = useCommon();

const form=ref({
  user:{},
  customer:{},
  business:{},
  showUser:{
    userName:'',
    userSex:'',
    userImg:''
  }
})

const getUserInfo = async () => {
  form.value.user=JSON.parse(sessionStorage.getItem("userInfo"))
  if (form.value.user.role==1){
    await customerStore.getCustomerById(form.value.user.userId)
    form.value.customer=customerStore.customerById
        form.value.showUser.userName=form.value.customer.customerName
    form.value.showUser.userSex=form.value.customer.customerSex
    form.value.showUser.phone=form.value.customer.phone
    form.value.showUser.userImg=form.value.customer.customerImg
  }
  if (form.value.user.role==2){
    await businessStore.getBusinessById(form.value.user.userId)
    form.value.business=businessStore.businessById
    form.value.showUser.userName=form.value.business.businessName
    form.value.showUser.userSex=form.value.business.businessSex
    form.value.showUser.phone=form.value.business.phone
    form.value.showUser.userImg=form.value.business.businessImg
  }

}


onMounted(()=>{getUserInfo()})

const toUser = () => {
  router.push({path:'/user'})
}

</script>
<template>
  <div class="wrapper" :model="form">
    <div class="header">
      <span class="hei">头像</span>
            <img v-if="form.showUser.userImg!=null" :src="form.showUser.userImg" style="width: 100px; height: 100px;margin-top: 30px" >

    </div>
    <div class="userName">
      <span class="hei">昵称</span>
      <span class="Name hui">{{form.showUser.userName}}</span>
    </div>
    <p class="bangding">账号绑定</p>
    <div class="phone">
      <span class="hei">手机</span>
      <span class="hui tel">{{form.showUser.phone}}</span>
    </div>
    <p class="bangding">安全设置</p>

    <div class="back" @click="toUser">返回</div>

    <Footer></Footer>
</div>
</template>

<style scoped>

*{
  padding:0;
  margin: 0;
  box-sizing: border-box;
}
html{
  font-size: 10px;
}
body{
  background-color: #f5f5f5;
}
.header{
  position: relative;
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-between;
  width: 100%;
  height: 10rem;
  background-color: #fff;
  line-height: 10rem;
  text-align: center;
  overflow: hidden;
  padding: 0 1.2rem;
  border-bottom: 1px solid #eee;
}
.hei{
  font-size: 1.6rem;
  font-weight: 700;
  color: #000;
}
.hui{
  font-size: 1.6rem;
  color: #666;
  margin-right: 3rem;
}

.header .tx{
  margin:2rem 2rem 0 0;
  width: 6rem;
  height: 6rem;
  overflow: hidden;
  background-color:pink;
  border-radius: 50%;

}
.tx iconfont{
  width: 100%;
  height: 100%;
}

.userName{
  position: relative;
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-between;
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
  background-color: #fff;
  overflow: hidden;
  padding:0 1.2rem;
}
.userName span{
  font-size: 1.6rem;
}


.bangding{
  color:#999;
  height: 4rem;
  text-align: left;
  padding-left: 1.2rem;
  line-height: 4rem;
}
.phone{
  position: relative;
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-between;
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  text-align: left;
  padding:0 1.2rem;
  background-color: #fff;

}
.Psw{
  position: relative;
  display: flex;
  flex-flow: nowrap row;
  justify-content: space-between;
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  text-align: left;
  padding:0 1.2rem;
  background-color: #fff;

}
.Psw input{
  /* font-size: 1.6rem; */
  border: none;
  width: 10rem;
}
.xiugai{
  color: #0097ff;
  font-size: 1.6rem;
  margin-right: 3rem;
}
.back{
  display: block;
  text-decoration: none;
  margin-top: 2rem;
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  background-color: #fff;
  text-align: center;
  color: #ff5339;
  font-size: 1.6rem;
  font-weight: 700;
}
.xiangyou{
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.6rem;

}
.chakan{
  position: absolute;
  right: 10rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  background:url("../assets/chakan.png")0 0 no-repeat;
  background-size: 100% 100%;

}
.see{
  background:url("../assets/chakan2.png")0 0 no-repeat;
  background-size: 100% 100%;
}

</style>
