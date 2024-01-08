import request from "@/utils/http";

export function listShopByShopTypeIdAPI(shopType) {
    return request({
        url: '/shop/getShopListByShopTypeId',
        method: 'get',
        params: {shopType}
    })
}

export function listShopByBusinessIdAPI(businessId) {
    return request({
        url: '/shop/listShopByBusinessId',
        method: 'get',
        params: {businessId}
    })
}

export function getShopByIdAPI(shopId) {
    return request({
        url: '/shop/getShopById',
        method: 'get',
        params: {shopId}
    })
}

export function deleteShopAPI(shopId) {
    return request({
        url: '/shop/removeShop',
        method: 'delete',
        params: {shopId}
    })
}

export function createShopAPI(shop) {
    return request({
        url: '/shop/saveShop',
        method: 'post',
        data: {
            shopName:shop.shopName,
            shopLogo:shop.shopLogo,
            shopAddress:shop.shopAddress,
            shopPhone:shop.shopPhone,
            startPrice:shop.startPrice,
            deliveryPrice:shop.deliveryPrice,
            shopType:shop.shopType,
            businessId:shop.businessId,
            shopDescription:shop.shopDescription
        }
    })
}


export function updateShopAPI(shop) {
    return request({
        url: '/shop/updateShop',
        method: 'put',
        data: {
            shopId:shop.shopId,
            shopName:shop.shopName,
            shopLogo:shop.shopLogo,
            shopAddress:shop.shopAddress,
            shopPhone:shop.shopPhone,
            startPrice:shop.startPrice,
            deliveryPrice:shop.deliveryPrice,
            shopType:shop.shopType,
            businessId:shop.businessId,
            shopDescription:shop.shopDescription
        }
    })
}


