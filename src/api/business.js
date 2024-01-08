import request from "@/utils/http";


export function getBusinessByIdAPI(businessId) {
    return request({
        url: '/business/getBusinessById',
        method: 'get',
        params: {businessId}
    })
}

export function updateBusinessAPI({userId, userName, userSex, phone,userImg}) {
    return request({
        url: '/business/updateBusiness',
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
