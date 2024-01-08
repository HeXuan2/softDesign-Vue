//管理用户数据相关
import {defineStore} from "pinia";
import {getCustomerByIdAPI, updateCustomerAPI} from "@/api/customer";
import {ref} from "vue";

export const useCustomerStore=defineStore('customer',()=>{
    const customerById=ref({})
    const updateCustomer=async ({userId, userName, userSex, phone,userImg})=>{
        const res=await updateCustomerAPI({userId, userName, userSex, phone,userImg})
        return res
    }

    const getCustomerById = async (customerId) => {
        const res=await getCustomerByIdAPI(customerId)
        customerById.value=res.data
    }

    //3. 以对象的格式把state和action return
    return{
        customerById,
        updateCustomer,
        getCustomerById,
    }
},{
    persist:true
})
