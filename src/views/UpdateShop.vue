<template>
  <div class="wrapper">
    <!-- header部分 -->
    <header>
      <div class="location-text"><i class="iconfont icon-angle-left" @click="toback"></i>更新门店</div>
    </header>
    <!--    填写门店信息-->
    <div style="margin-top: 60px">
      <el-form :model="form" label-width="120px">
        <el-form-item label="门店名字">
          <el-input v-model="form.shopName" />
        </el-form-item>
        <el-form-item label="门店类型">
          <el-select v-model="form.shopType" placeholder="请选择你的门店类型">
            <el-option label="美食" value="1" />
            <el-option label="早餐" value="2" />
            <el-option label="跑腿代购" value="3" />
            <el-option label="汉堡披萨" value="4" />
            <el-option label="甜品饮食" value="5" />
            <el-option label="素食简餐" value="6" />
            <el-option label="地方小吃" value="7" />
            <el-option label="米粉面馆" value="8" />
            <el-option label="包子粥铺" value="9" />
            <el-option label="炸鸡炸串" value="10" />
          </el-select>
        </el-form-item>

        <el-form-item label="门店地址">
          <el-input v-model="form.shopAddress" />
        </el-form-item>
        <el-form-item label="门店联系电话">
          <el-input v-model="form.shopPhone" />
        </el-form-item>


        <el-form-item label="上传图片" v-model="form.shopLogo" >
          <el-upload action="#" list-type="picture-card" :auto-upload="false" :limit="1"  @change="handleImageUpload">
              <img class="uploaded-image" v-if="shopElseForm.shopImg" :src="shopElseForm.shopImg" style="height: 100%;width: 100%" alt="Uploaded Image">
            <el-icon v-else><Plus /></el-icon>
          </el-upload>
          <el-popconfirm @confirm="deleteImage" title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消" >
            <template #reference>
              <el-button type="danger" round size="small" style="position: absolute; right: 0; top: 50%; transform: translateY(-50%);" >删除图片</el-button>
            </template>
          </el-popconfirm>

        </el-form-item>

        <el-form-item label="门店起送金额" >
          <el-input-number v-model="form.startPrice" :min="1" :step="1" />
        </el-form-item>

        <el-form-item label="门店配送金额" >
          <el-input-number v-model="form.deliveryPrice" :min="1" :step="1" />
        </el-form-item>

        <el-form-item label="门店描述">
          <el-input v-model="form.shopDescription" type="textarea" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="updateShop">确认更新</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {computed, reactive} from 'vue'
import { ref,onMounted} from 'vue';
import { useCommon } from '@/hooks/common';
import {Delete, Plus,} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";

const {router, route,shopStore,globalProperties,Footer} = useCommon();

// do not use same name with ref
let form = ref({
  shopId:'',
  shopName:'',
  shopLogo:'',
  shopAddress:'',
  shopPhone:'',
  startPrice:'',
  deliveryPrice: '',
  shopType: '',
  shopDescription: '',
  businessId:''
})

const shopElseForm=ref({
  shopId:route.query.shopId,
  shopImg:''
})

const getShopById = async () => {
  await shopStore.getShopById(shopElseForm.value.shopId)
  form.value=shopStore.shopById
  shopElseForm.value.shopImg=form.value.shopLogo
}

const handleImageUpload = (file) => {
  const reader=new FileReader();
  reader.onload=(e)=>{
    form.value.shopLogo=e.target.result
  };
  reader.readAsDataURL(file.raw)
}


const deleteImage = () => {
  shopElseForm.value.shopImg=''
  form.value.shopLogo=''
}




const updateShop = async () => {

  const res=await shopStore.updateShop(form.value)

  if(res.code==globalProperties.$code_success) {
    ElMessage({type:'success',message:"更新门店成功"})
    router.push({path: '/myShopList',query: {businessId:form.value.businessId}});
  }else {
    ElMessage({type:'warning',message:"更新门店失败"})
  }
}


const toback = () => {
  router.back()
}

getShopById()

</script>

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

.wrapper header .location-text {
  font-size: 4.5vw;
  font-weight: 700;
  color: #fff;
}
.wrapper header .location-text .icon-angle-left{
  position: relative;
  right: 122px;
}


</style>
