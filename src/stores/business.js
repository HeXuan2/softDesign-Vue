//管理用户数据相关
import {defineStore} from "pinia";
import {getBusinessByIdAPI, updateBusinessAPI} from "@/api/business";
import {ref} from "vue";

export const useBusinessStore=defineStore('business',()=>{
    const businessById=ref({})

    const updateBusiness=async ({userId, userName, userSex, phone,userImg})=>{
        const res=await updateBusinessAPI({userId, userName, userSex, phone,userImg})
        return res
    }

    const getBusinessById = async (businessId) => {
      const res=await getBusinessByIdAPI(businessId)
        businessById.value=res.data
    }

    //3. 以对象的格式把state和action return
    return{
        updateBusiness,
        getBusinessById,
        businessById
    }
},{
    persist:true
})
