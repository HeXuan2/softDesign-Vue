//封装所有和用户相关的接口函数
import request from "@/utils/http";


export const loginAPI = ({account, password}) => {
    return request({
        url:'/user/login',
        method:'post',
        data:{
            userId:account,
            password:password,
        }
    })

}

export const register=(user)=>{
    return request({
        url: '/user/register',
        method: 'post',
        data:{
            userId:user.userId,
            password:user.password,
            userName:user.userName,
            userSex:user.userSex,
            role:user.userRole
        }
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: {token}
    })
}

export function getUserByIdAPI(userId) {
    return request({
        url: '/user/getUserById',
        method: 'get',
        params: {userId}
    })
}


export function loginOut() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}



