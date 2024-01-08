import request from "@/utils/http";

export function createOrdersAPI({userId,shopId,orderTotal,daId}) {
    return request({
        url: '/orders/createOrders',
        method: 'post',
        data:{
            userId:userId,
            shopId:shopId,
            orderTotal:orderTotal,
            daId:daId,
        }
    })
}



export function getOrdersByShopIdAPI(shopId) {
    return request({
        url: '/orders/listOrdersByShopId',
        method: 'get',
        params:{
            shopId
        }
    })
}



export function getOrdersByIdAPI(orderId) {
    return request({
        url: '/orders/getOrdersById',
        method: 'get',
        params:{
            orderId
        }
    })
}
export function listOrdersByUserIdIdAPI(userId) {
    return request({
        url: '/orders/listOrdersByUserId',
        method: 'get',
        params:{
            userId
        }
    })
}

export function payOrderAPI(orderId){
    return request({
        url:'/orders/payOrder',
        method:'get',
        params:{
            orderId
        }
    })
}


export function confirmOrderAPI(orderId){
    return request({
        url:'/orders/confirmOrder',
        method:'get',
        params:{
            orderId
        }
    })
}

export function refundOrderAPI(orderId){
    return request({
        url:'/orders/refundOrder',
        method:'get',
        params:{
            orderId
        }
    })
}


export function deleteOrderAPI(orderId){
    return request({
        url:'/orders/deleteOrderById',
        method:'delete',
        params:{
            orderId
        }
    })
}
