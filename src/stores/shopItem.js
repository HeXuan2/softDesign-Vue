//管理用户数据相关
import {defineStore} from "pinia";
import {ref} from "vue";
import {
    createShopItemAPI,
    deleteShopItemAPI,
    getShopItemByIdAPI,
    listShopItemByBusinessIdAPI,
    updateShopItemAPI
} from "@/api/shopItem";

export const useShopItemStore=defineStore('shopItem',()=>{
    const shopItemListByBusinessId=ref({})
    const shopItemById=ref({})
    const getShopItemListByBusinessId = async (businessId) => {
        const res=await listShopItemByBusinessIdAPI(businessId)
        shopItemListByBusinessId.value=res.data
        return res;
    }

    const getShopItemById=async (shopItemId)=>{
        const res=await getShopItemByIdAPI(shopItemId)
        shopItemById.value=res.data
        return res
    }
    const deleteShopItem = async (shopItemId) => {
        const res=await deleteShopItemAPI(shopItemId);
        return res;
    }

    const createShopItem = async (shopItem) => {
        const res=await createShopItemAPI(shopItem);
        return res;
    }

    const updateShopItem = async (shopItem) => {
        const res=await updateShopItemAPI(shopItem)
        return res;
    }



    //3. 以对象的格式把state和action return
    return{
        shopItemListByBusinessId,
        shopItemById,
        getShopItemById,
        getShopItemListByBusinessId,
        deleteShopItem,
        createShopItem,
        updateShopItem
    }
},{
    persist:true
})
