//管理用户数据相关
import {defineStore} from "pinia";
import {ref} from "vue";
import {confirmOrderAPI, createOrdersAPI, deleteOrderAPI, getOrdersByShopIdAPI, refundOrderAPI} from "@/api/orders";
import {listOrdersByUserIdIdAPI} from "@/api/orders";
import {getOrdersByIdAPI} from "@/api/orders";
import {payOrderAPI} from "@/api/orders";

export const useOrdersStore=defineStore('orders',()=>{
    const ordersList=ref({})
    const ordersListByShopId=ref({})

    const getOrdersListByUserIdId = async (userId) => {
        const res=await listOrdersByUserIdIdAPI(userId)
        ordersList.value=res.data
        return res;
    }

    const getOrdersByShopId = async (shopId) => {
      const res=await getOrdersByShopIdAPI(shopId)
        ordersListByShopId.value=res.data

    }

    const getOrdersListById = async (orderId) => {
        const res=await getOrdersByIdAPI(orderId)
        ordersList.value=res.data
        return res;
    }

    const createOrders = async ({userId,shopId,orderTotal,daId}) => {

        const res=await createOrdersAPI({userId,shopId,orderTotal,daId})
        return res
    }

    const payOrder = async (orderId) => {
        const res=await payOrderAPI(orderId)
        return res
    }

    const confirmOrder = async (orderId) => {
      const res=await confirmOrderAPI(orderId)
        return res
    }

    const refundOrder = async (orderId) => {
      const res=await refundOrderAPI(orderId)
        return res;
    }

    const deleteOrder = async (orderId) => {
      const res=await deleteOrderAPI(orderId)
        return res
    }

    //3. 以对象的格式把state和action return
    return{
        ordersList,
        ordersListByShopId,
        getOrdersListById,
        createOrders,
        getOrdersListByUserIdId,
        payOrder,
        getOrdersByShopId,
        confirmOrder,
        refundOrder,
        deleteOrder,
    }
},{
    persist:true
})
