//管理商家数据相关
import {defineStore} from "pinia";
import {ref,reactive} from "vue";
import {getShopByIdAPI, listShopByBusinessIdAPI, listShopByShopTypeIdAPI} from "@/api/shop";
import {createShopAPI, deleteShopAPI, updateShopAPI} from "@/api/shop";
export const useShopStore=defineStore('shop',()=>{
    const shopListByShopTypeId=ref({})
    const shopListByBusinessId=ref({})
    const shopById=ref({})

    const getShopById = async (shopId) => {
      const res=await getShopByIdAPI(shopId)
        shopById.value=res.data
    }

    const listShopByShopTypeId = async (shopType) => {
      const res=await listShopByShopTypeIdAPI(shopType)
        shopListByShopTypeId.value=res.data
        return shopListByShopTypeId.value;
    }

    const listShopByBusinessId = async (businessId) => {
        const res=await listShopByBusinessIdAPI(businessId)
        shopListByBusinessId.value=res.data

        return shopListByBusinessId.value;
    }

    const deleteShop = async (shopId) => {
        const res=await deleteShopAPI(shopId);
        return res;
    }

    const createShop = async (shop) => {
        const res=await createShopAPI(shop);
        return res;
    }

    const updateShop = async (shop) => {
        const res=await updateShopAPI(shop)
        return res;
    }




    //3. 以对象的格式把state和action return
    return{
        shopListByShopTypeId,
        shopListByBusinessId,
        shopById,
        getShopById,
        listShopByShopTypeId,
        listShopByBusinessId,
        createShop,
        deleteShop,
        updateShop
    }
},{
    persist:true
})
