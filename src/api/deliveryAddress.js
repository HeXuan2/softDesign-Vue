import request from "@/utils/http";

export function listDeliveryAddressByUserIdAPI(userId) {
    return request({
        url: '/deliveryAddress/listDeliveryAddressByUserId',
        method: 'get',
        params: {userId}
    })
}
export function getDeliveryAddressByIdAPI(daId) {
    return request({
        url: '/deliveryAddress/getDeliveryAddressById',
        method: 'get',
        params: {daId}
    })
}

export function saveDeliveryAddressAPI(deliveryAddress) {
    return request({
        url: '/deliveryAddress/saveDeliveryAddress',
        method: 'post',
        data:{
            contactName:deliveryAddress.contactName,
            contactSex:deliveryAddress.contactSex,
            contactTel:deliveryAddress.contactTel,
            address:deliveryAddress.address,
            userId:deliveryAddress.userId
        }
    })
}



export function updateDeliveryAddressAPI({daId,contactName,contactSex,contactTel,address,userId}) {
    return request({
        url: '/deliveryAddress/updateDeliveryAddress',
        method: 'put',
        data:{
            daId:daId,
            contactName:contactName,
            contactSex:contactSex,
            contactTel:contactTel,
            address:address,
            userId:userId
        }

    })
}

export function removeDeliveryAddressAPI(daId) {
    return request({
        url: '/deliveryAddress/removeDeliveryAddress',
        method: 'delete',
        params:{
           daId:daId
        }
    })
}
