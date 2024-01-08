<script setup>
import {ElMessage} from "element-plus";
import 'element-plus/theme-chalk/el-message.css'
import { useCommon } from '@/hooks/common';
const {router, userStore, globalProperties,Footer} = useCommon();


//表单校验（账户名+密码）
//1.准备表单对象
const form=ref({
  account:'110',
  password:'123',
  agree:true,
})

// 2. 准备规则对象
const rules={
  account:[
    {required:true ,message:'用户账号不能为空',trigger:'blur'}
  ],
  password:[
    {required:true,message:'密码不能为空',trigger:'blur'},
    {min:2,max:14,message: '密码长度为2-14个字符',trigger:'blur'}
  ],
  agree:[
    {
      validator:(rule,value,callback)=>{

        //自定义校验逻辑  勾选就通过 不勾选就不通过
        if(value){
          callback()
        }else{
          callback(new Error('请勾选协议'))
        }
      }
    }
  ]
}


//3. 获取form实例做统一校验
const formRef=ref(null)
const doLogin = () => {
  const {account,password}=form.value
  //调用实例方法
  formRef.value.validate(async (valid)=>{
    //以valid作为判断条件 通过校验才执行登录逻辑
    await userStore.getUserToken({account,password})
    if(valid && userStore.resToken.code==globalProperties.$code_success){
      //1. 提示用户
      ElMessage({type:'success',message:userStore.resToken.message})
      await userStore.getUserInfo(userStore.resToken.data.token)
      // 将登录对象存入 getSessionStorage
      sessionStorage.setItem('userInfo', JSON.stringify(userStore.userInfo.user));
      //2. 跳转首页
      router.push({path:'/'})
    }else {
      ElMessage({type:'warning',message:userStore.resToken.message})
    }

  })
}

const doRegister = () => {
  //跳转注册页
  router.push({path:'/register'})
}

</script>


<template>
  <div class="wrapper">
    <!-- header部分 -->
    <header>
      <p>饿了么用户登陆</p>
    </header>
    <!-- 表单部分 -->
    <div class="account-box">
      <div class="form">
        <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="60px"
                 status-icon>

          <el-form-item prop="account" label="账户">
            <el-input v-model="form.account"/>
          </el-form-item>

          <el-form-item prop="password"  label="密码">
            <el-input v-model="form.password" type="password"/>
          </el-form-item>


          <el-form-item prop="agree" label-width="22px">
            <el-checkbox  size="large" v-model="form.agree">
              我已同意隐私条款和服务条款
            </el-checkbox>
          </el-form-item>

          <el-button size="large" class="BtnLogin" @click="doLogin">点击登录</el-button>

          <el-button size="large" class="BtnRegister" @click="doRegister">点击注册</el-button>


        </el-form>
      </div>
    </div>
    <!-- 底部菜单部分 -->
    <Footer></Footer>
  </div>
</template>


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
/****************** 表单部分 ******************/

.BtnLogin {
  margin-left: 0px;
  margin-bottom: 10px;
  width: 100%;
  height: 10vw;
  font-size: 3.8vw;
  font-weight: 700;
  color: #fff;
  background-color: #38CA73;
  border-radius: 4px;
  border: none;
  outline: none;
}

.BtnRegister {
  margin-left:0px;
  width: 100%;
  height: 10vw;
  font-size: 3.8vw;
  font-weight: 700;
  /*与上面登陆按钮不同的只有颜色、背景色、边框不同*/
  color: #666;
  background-color: #EEE;
  border: solid 1px #DDD;
  border-radius: 4px;
  border: none;
  outline: none;
}

.account-box .form {
    margin-top: 50px;
    &-item {
      margin-bottom: 28px;
        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
        }
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
</style>
