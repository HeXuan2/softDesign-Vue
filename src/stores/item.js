//管理用户数据相关
import {defineStore} from "pinia";
import {ref} from "vue";
import {createItemAPI, deleteItemAPI, getItemByIdAPI, listItemByShopIdAPI, updateItemAPI} from "@/api/item";

export const useItemStore=defineStore('item',()=>{
    const itemListByShopId=ref({})
    const item=ref({})
    const getItemListByShopId = async (shopId) => {
        const res=await listItemByShopIdAPI(shopId)
        itemListByShopId.value=res.data
        return res;
    }

    const getItemById=async (itemId)=>{
        const res=await getItemByIdAPI(itemId)
        item.value=res.data
        return res
    }
    const deleteItem = async (itemId) => {
      const res=await deleteItemAPI(itemId);
      return res;
    }

    const createItem = async (item) => {
      const res=await createItemAPI(item);
      return res;
    }

    const updateItem = async (item) => {
      const res=await updateItemAPI(item)
        return res;
    }



    //3. 以对象的格式把state和action return
    return{
        itemListByShopId,
        item,
        getItemById,
        getItemListByShopId,
        deleteItem,
        createItem,
        updateItem
    }
},{
    persist:true
})
