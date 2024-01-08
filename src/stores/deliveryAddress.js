//管理用户数据相关
import {defineStore} from "pinia";
import {ref} from "vue";
import {getDeliveryAddressByIdAPI} from "@/api/deliveryAddress";
import {removeDeliveryAddressAPI} from "@/api/deliveryAddress";
import {saveDeliveryAddressAPI} from "@/api/deliveryAddress";
import {updateDeliveryAddressAPI} from "@/api/deliveryAddress";
import {listDeliveryAddressByUserIdAPI} from "@/api/deliveryAddress";

export const useDeliveryAddressStore=defineStore('deliveryAddress',()=>{
    const deliveryAddressList=ref({})
    const getDeliveryAddressById = async (daId) => {
        const res=await getDeliveryAddressByIdAPI(daId)
        deliveryAddressList.value=res.data
        return res;
    }

    const getDeliveryAddressByUserId = async (userId) => {
        const res=await listDeliveryAddressByUserIdAPI(userId)
        deliveryAddressList.value=res.data
        return res;
    }

    const saveDeliveryAddress = async (deliveryAddress) => {
        const res=await saveDeliveryAddressAPI(deliveryAddress)
        return res
    }

    const updateDeliveryAddress=async ({daId,contactName,contactSex,contactTel,address,userId})=>{
        const res=await updateDeliveryAddressAPI({daId,contactName,contactSex,contactTel,address,userId})
        return res
    }

    const removeDeliveryAddress =async(daId) => {
        const res=await removeDeliveryAddressAPI(daId)
        return res
    }

    //3. 以对象的格式把state和action return
    return{
        deliveryAddressList,
        getDeliveryAddressById,
        getDeliveryAddressByUserId,
        updateDeliveryAddress,
        removeDeliveryAddress,
        saveDeliveryAddress
    }
},{
    persist:true
})
