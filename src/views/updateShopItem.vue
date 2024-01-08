<template>
  <div class="wrapper">
    <!-- header部分 -->
    <header>
      <div class="location-text"><i class="iconfont icon-angle-left" @click="toback"></i>更新商品</div>
    </header>
    <!--    填写门店信息-->
    <div style="margin-top: 60px">
      <el-form :model="form" label-width="120px">
        <el-form-item label="商品名字">
          <el-input v-model="form.shopItemName" />
        </el-form-item>

        <el-form-item label="上传图片" v-model="form.shopItemImg" >
          <el-upload action="#" list-type="picture-card" :auto-upload="false" :limit="1"  @change="handleImageUpload">
            <img class="uploaded-image" v-if="shopElseForm.Img" :src="shopElseForm.Img" style="height: 100%;width: 100%" alt="Uploaded Image">
            <el-icon v-else><Plus /></el-icon>
          </el-upload>

          <el-popconfirm @confirm="deleteImage" title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消" >
            <template #reference>
              <el-button type="danger" round size="small" style="position: absolute; right: 0; top: 50%; transform: translateY(-50%);" >删除图片</el-button>
            </template>
          </el-popconfirm>


        </el-form-item>


        <el-form-item label="商品金额">
          <el-input-number v-model="form.shopItemPrice" :step="1" />
        </el-form-item>


        <el-form-item label="门店描述">
          <el-input v-model="form.shopItemDescription" type="textarea" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="updateShopItem">更新商品</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCommon } from '@/hooks/common';
import { Plus, } from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";

const {router, shopItemStore,route,globalProperties,Footer} = useCommon();

// do not use same name with ref
const form = ref({
  shopItemId:route.query.shopItemId,
  shopItemName: '',
  shopItemImg: '',
  shopItemPrice: '',
  shopItemDescription: '',
  businessId:'',
})

const shopElseForm=ref({
  shopItemId:route.query.shopItemId,
  Img:''
})

const getShopItemById = async () => {
  await shopItemStore.getShopItemById(shopElseForm.value.shopItemId)
  form.value=shopItemStore.shopItemById
  shopElseForm.value.Img=form.value.shopItemImg
}

getShopItemById()
const updateShopItem = async () => {
  const res= await shopItemStore.updateShopItem(form.value)

  if(res.code==globalProperties.$code_success) {
    ElMessage({type:'success',message:res.message})
    router.back()
  }else {
    ElMessage({type:'warning',message:res.message})
  }
}

const toback = () => {
  router.back()
}

const deleteImage = () => {
  shopElseForm.value.Img=''
  form.value.shopItemImg=''
}

const handleImageUpload = (file) => {
  const reader=new FileReader();
  reader.onload=(e)=>{
    form.value.shopItemImg=e.target.result
  };
  reader.readAsDataURL(file.raw)
}
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
