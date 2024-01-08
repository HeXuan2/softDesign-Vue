<script lang="ts" setup>
import {ref,reactive} from "vue";
import type {FormInstance, FormRules } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import {ElMessage} from "element-plus";
import { useCommon } from '../../hooks/common.js';
const {router,userStore, customerStore,businessStore,globalProperties,Footer} = useCommon();

const ruleFormRef = ref<FormInstance>()


const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空，请输入密码'))
  } else {
    if (ruleForm.value.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForm.value.pass) {
    callback(new Error("两次密码不一致!"))
  } else {
    callback()
  }
}

//表单校验（账户名+密码）
//1.准备表单对象
const ruleForm = ref({
  account:'110',
  pass:'123',
  checkPass:'123',
  userName:'警察3',
  userSex:'',
  userRole:'',
  phone:''
})

// 2. 准备规则对象
const rules = reactive<FormRules<typeof ruleForm>>({
  account:[
    {required:true ,message:'用户账号不能为空',trigger:'blur'}
  ],
  pass: [{ validator: validatePass, trigger: 'blur'  }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  userName:[
    {required:true ,message:'用户名称不能为空',trigger:'blur'}
  ],
  phone:[
    {required:true ,message:'电话不能为空',trigger:'blur'}
  ],
  userSex: [
    {
      required: true,
      message: '请选择性别',
      trigger: 'change',
    },
  ],
  userRole: [
    {
      required: true,
      message: '请选择你的角色',
      trigger: 'change',
    },
  ],
})



const doRegister = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {


    const userId=ruleForm.value.account;
    const password=ruleForm.value.checkPass;
    const userName= ruleForm.value.userName;
    const userSex=ruleForm.value.userSex;
    const userRole=ruleForm.value.userRole;
    const phone=ruleForm.value.phone;
    const userImg=null
    const res= await userStore.userRegister({userId,password,userRole});
    const resValid=ref({})
    resValid.value=false
    if (userRole==1){
      const res1=await customerStore.updateCustomer({userId, userName, userSex, phone,userImg})
      if (res1.code==globalProperties.$code_success){
        resValid.value=true
      }
    }
    if(userRole==2) {
      const res2=await businessStore.updateBusiness({userId, userName, userSex, phone,userImg})
      if (res2.code==globalProperties.$code_success){
        resValid.value=true
      }
    }

    if (valid && resValid) {
      resValid.value=false
      ElMessage({type:'success',message:res.message})
      router.push({path:'/login'})
    } else {
      resValid.value=false
      ElMessage({type:'warning',message:res.message})
      return false
    }
  })
}
</script>


<template>
  <div class="wrapper">
    <!-- header部分 -->
    <header>
      <p>饿了么用户注册</p>
    </header>
    <!-- 表单部分 -->
    <div class="account-box">
      <div class="form">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-position="right" label-width="60px"
                 status-icon>

          <el-form-item  prop="account" label="账户号" class="item">
            <el-input v-model="ruleForm.account"/>
          </el-form-item>

          <el-form-item prop="pass"  label="密码" class="item">
            <el-input v-model="ruleForm.pass" type="password"/>
          </el-form-item>

          <el-form-item prop="checkPass"  label="确认密码" class="item" >
            <el-input v-model="ruleForm.checkPass" type="password"/>
          </el-form-item>

          <el-form-item prop="userName" label="用户名" class="item">
            <el-input v-model="ruleForm.userName"/>
          </el-form-item>

          <el-form-item prop="userPhone" label="电话" class="item">
            <el-input v-model="ruleForm.phone"/>
          </el-form-item>

          <el-form-item label="性别" prop="userSex" class="item">
            <el-radio-group v-model="ruleForm.userSex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="角色" prop="userRole" class="item">
            <el-radio-group v-model="ruleForm.userRole">
              <el-radio :label="1">客户</el-radio>
              <el-radio :label="2">商家</el-radio>
            </el-radio-group>
          </el-form-item>


          <el-button size="large" class="BtnRegister" @click="doRegister(ruleFormRef)">注册</el-button>

        </el-form>

      </div>
    </div>
    <!-- 底部菜单部分 -->
    <Footer></Footer>
  </div>
</template>


<style>
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
.BtnRegister {
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

.item .el-form-item__label {
  height: 45px;
  line-height: 45px;
  padding: 0px 4px 0 0;
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

/****************** 底部菜单部分 ******************/
.wrapper .footer {
  width: 100%;
  height: 14vw;
  border-top: solid 1px #DDD;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.wrapper .footer li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
  user-select: none;
  cursor: pointer;
}
.wrapper .footer li p {
  font-size: 2.8vw;
}
.wrapper .footer li i {
  font-size: 5vw;
}
</style>
