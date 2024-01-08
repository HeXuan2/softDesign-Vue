import request from "@/utils/http";


export function listShopItemByBusinessIdAPI(businessId) {
    return request({
        url: '/shopItem/listShopItemByBusinessId',
        method: 'get',
        params: {businessId}
    })
}

export function getShopItemByIdAPI(shopItemId) {
    return request({
        url: '/shopItem/getShopItemById',
        method: 'get',
        params: {shopItemId}
    })
}

export function deleteShopItemAPI(shopItemId) {
    return request({
        url: '/shopItem/removeShopItem',
        method: 'delete',
        params: {shopItemId}
    })
}

export function createShopItemAPI(shopItem) {
    return request({
        url: '/shopItem/saveShopItem',
        method: 'post',
        data: {
            shopItemName:shopItem.shopItemName,
            shopItemImg:shopItem.shopItemImg,
            shopItemPrice:shopItem.shopItemPrice,
            businessId:shopItem.businessId,
            shopItemDescription:shopItem.shopItemDescription
        }
    })
}


export function updateShopItemAPI(shopItem) {
    return request({
        url: '/shopItem/updateShopItem',
        method: 'put',
        data: {
            shopItemId:shopItem.shopItemId,
            shopItemName:shopItem.shopItemName,
            shopItemImg:shopItem.shopItemImg,
            shopItemPrice:shopItem.shopItemPrice,
            businessId:shopItem.businessId,
            shopItemDescription:shopItem.shopItemDescription
        }
    })
}


