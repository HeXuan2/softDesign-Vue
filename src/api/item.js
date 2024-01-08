import request from "@/utils/http";

export function listItemByShopIdAPI(shopId) {
    return request({
        url: '/item/listItemByShopId',
        method: 'get',
        params: {shopId}
    })
}

export function getItemByIdAPI(itemId) {
    return request({
        url: '/item/getItemById',
        method: 'get',
        params: {itemId}
    })
}

export function deleteItemAPI(itemId) {
    return request({
        url: '/item/removeItem',
        method: 'delete',
        params: {itemId}
    })
}

export function createItemAPI(item) {
    return request({
        url: '/item/saveItem',
        method: 'post',
        data: {
            shopId:item.shopId,
            shopItemId:item.shopItemId
        }
    })
}


export function updateItemAPI(item) {
    return request({
        url: '/item/updateItem',
        method: 'put',
        data: {
            shopId:item.shopId,
            shopItemId:item.shopItemId
        }
    })
}
