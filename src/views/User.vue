<script setup>
import { useCommon } from '@/hooks/common';
import {computed, ref} from "vue";
const {router, globalProperties,businessStore,customerStore,Footer,userStore} = useCommon();


const toUserInfo = () => {
  if(form.value.user==null){
    router.push({path:'/login'})
  }else {
    router.push({path: '/userInfo'})
  }

}

const confirm = () => {
    //退出登录逻辑实现
    //   1.清楚用户信息
    userStore.clearUserInfo()
    // 2. 跳转登录页
    router.push('/login')
}

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
const sexFilter = computed(() => {
  const value=form.value.showUser.userSex
  return value==1?'先生':'女士';
});

</script>

<template>
  <div class="wrapper">
    <div >
      <div class="user">
<!--        <div class="user-r" :model="form">-->
<!--          <p class="tel">-->

<!--            <svg class="icon" aria-hidden="true" style="margin-right: 10px">-->
<!--            <use xlink:href="#icon-elemo"></use>-->
<!--            </svg>-->

<!--              <span style="font-size: 20px" v-if="form.user==null">登录/注册</span>-->
<!--              <span style="font-size: 20px" v-if="form.user!=null">欢迎{{form.showUser.userName}}{{sexFilter}}</span>-->

<!--            <svg style="font-size: 40px;margin-left: 60px" class="icon" aria-hidden="true" @click="toUserInfo" >-->
<!--            <use xlink:href="#icon-angle-right" ></use>-->
<!--            </svg>-->

<!--          </p>-->

<!--          <p  class="welcome" v-if="form.user==null">登录后享受更多权益</p>-->
<!--          <p  class="welcome" v-if="form.user!=null">您的账号是：{{form.user.userId}}</p>-->

<!--        </div>-->

        <div class="user-r" :model="form" style="position: relative;">
          <p class="tel">
            <svg class="icon" aria-hidden="true" style="margin-right: 10px">
              <use xlink:href="#icon-elemo"></use>
            </svg>
            <span style="font-size: 20px" v-if="form.user==null">登录/注册</span>
            <span style="font-size: 20px" v-if="form.user!=null">欢迎{{form.showUser.userName}}{{sexFilter}}</span>

            <svg style="font-size: 40px; position: absolute; right: -90px;" class="icon" aria-hidden="true" @click="toUserInfo">
              <use xlink:href="#icon-angle-right"></use>
            </svg>

          </p>

          <p class="welcome" v-if="form.user==null">登录后享受更多权益</p>
          <p class="welcome" v-if="form.user!=null">您的账号是：{{form.user.userId}}</p>
        </div>



      </div>
      <div class="hongbao">
        <div>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-hongbao"></use>
          </svg>
          <p>红包</p>
        </div>
        <div>
          <svg  class="icon" aria-hidden="true">
            <use xlink:href="#icon-jinbi" ></use>
          </svg>
          <p>金币</p>
        </div>

      </div>
      <div class="dizhi">
        <svg  class="icon" aria-hidden="true">
          <use xlink:href="#icon-elemo" ></use>
        </svg>

        <span>App规则</span>
      </div>
      <div class="dizhi">
        <svg  class="icon" aria-hidden="true">
          <use xlink:href="#icon-shouye1" ></use>
        </svg>

        <span>我的地址</span>
      </div>
      <div class="dizhi">
        <svg  class="icon" aria-hidden="true">
          <use xlink:href="#icon-kefu" ></use>
        </svg>

        <span>我的客服</span>
      </div>
      <div class="dizhi">
        <svg  class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai" ></use>
        </svg>

        <span>下载饿了么APP</span>
      </div>
      <div class="dizhi tuichu">
        <svg  class="icon" aria-hidden="true">
          <use xlink:href="#icon-tuichu" ></use>
        </svg>


          <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                  <span >退出登录</span>
              </template>
          </el-popconfirm>



      </div>
      <p class="yinsi">隐私政策！！</p>
    </div>

    <!-- 底部菜单部分 -->
    <Footer></Footer>
    </div>

</template>

<style scoped>

.icon{
  font-size: 40px;
}

.user{
  display: block;
  position: relative;
  padding:2.2rem 1.5rem;
  width: 100%;
  height: 11rem;
  background-image: linear-gradient(90deg,#0af,#0085ff);
  color: #fff;
}
.tx{
  position: relative;
  float: left;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  overflow: hidden;
}
.tx>icon{
  width: 100%;
  height: 100%;
}
.user-r{
  display: block;
  text-decoration: none;
  color: #fff;
  float: left;
  margin-left: 2rem;
}
.user-r>p:nth-child(1){
  font-size: 2.1rem;
  font-weight: 900;
  margin-bottom: 0.8rem;
}

.user>icon{
  position: absolute;
  right: 0rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0.5rem;
  height: 0.5rem;
}

.user .angle-right{
  margin-right: 0px;
}

.hongbao{

  width: 100%;
  height: 8rem;
  overflow: hidden;
}
.hongbao>div{
  float: left;
  background-color:#fff;
  width: 50%;
  height: 8rem;
  padding:1.6rem 0;
  text-align: center;
  border: 1px solid #eee;
}
.hongbao>div>icon{
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}
.dizhi{
  position: relative;
  width: 100%;
  height: 4.6rem;
  margin-top: 1rem;
  line-height: 4.6rem;
  text-align: left;
  background-color: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.dizhi>icon{
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 2rem;
  height: 2rem;

}
.dizhi>span{
  font-size: 1.6rem;
  margin-left: 5.4rem;
}
.yinsi{
  margin-top: 2rem;
  font-size: 1.5rem;
  color: #4da6f0;
  width: 100%;
  text-align: center;
}

</style>
