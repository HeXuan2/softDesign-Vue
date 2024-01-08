//管理用户数据相关
import {defineStore} from "pinia";
import {ref} from "vue";
import {listCartAPI} from "@/api/cart";
import {saveCartAPI} from "@/api/cart";
import {removeCartAPI} from "@/api/cart";
import {updateCartAPI} from "@/api/cart";

export const useCartStore=defineStore('cart',()=>{
    const cartList=ref({})

    const getCartList = async (userId,shopId) => {

        const res=await listCartAPI(userId,shopId)
        cartList.value=res.data

        return res;
    }

    const saveCart = async ({itemId, shopId, userId, quantity}) => {
        const res=await saveCartAPI({itemId, shopId, userId, quantity})

        return res
    }

    const updateCart=async ({itemId, shopId, userId, quantity})=>{
        const res=await updateCartAPI({itemId, shopId, userId, quantity})
        return res
    }

    const removeCart =async({itemId, shopId, userId}) => {
      const res=await removeCartAPI({itemId, shopId, userId})
        return res
    }

    //3. 以对象的格式把state和action return
    return{
        cartList,
        saveCart,
        updateCart,
        removeCart,
        getCartList,
    }
},{
    persist:true
})
