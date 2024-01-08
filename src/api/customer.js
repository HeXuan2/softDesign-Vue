import request from "@/utils/http";

export function getCustomerByIdAPI(customerId) {
    return request({
        url: '/customer/getCustomerById',
        method: 'get',
        params: {customerId}
    })
}

export function updateCustomerAPI({userId, userName, userSex, phone,userImg}) {
    return request({
        url: '/customer/updateCustomer',
        method: 'put',
        data:{
            userId:userId,
            userName:userName,
            userSex:userSex,
            phone:phone,
            userImg:userImg
        }
    })
}
