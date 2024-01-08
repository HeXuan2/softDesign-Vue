import request from "@/utils/http";

export function listCartAPI(userId,shopId) {
    return request({
        url: '/cart/listCart',
        method: 'get',
        params: {userId,shopId}
    })
}

export function saveCartAPI({itemId, shopId, userId, quantity}) {
    return request({
        url: '/cart/saveCart',
        method: 'post',
        data:{
            itemId:itemId,
            shopId:shopId,
            userId:userId,
            quantity:quantity
        }
    })
}

export function updateCartAPI({itemId, shopId, userId, quantity}) {
    return request({
        url: '/cart/updateCart',
        method: 'put',
        data:{
            itemId:itemId,
            shopId:shopId,
            userId:userId,
            quantity:quantity
        }
    })
}

export function removeCartAPI({itemId, shopId, userId}) {
    return request({
        url: '/cart/removeCart',
        method: 'delete',
        data:{
            itemId:itemId,
            shopId:shopId,
            userId:userId,
        }
    })
}
