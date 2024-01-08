//管理用户数据相关
import {defineStore} from "pinia";
import {ref} from "vue";
import {getInfo, loginAPI} from "@/api/user";
import {register} from "@/api/user";
export const useUserStore=defineStore('user',()=>{
    //1。定义管理用户数据的state
    let resToken=ref({})

    // const cartStore=useCartStore()
    //2. 定义获取接口数据的action函数
    const getUserToken = async ({account,password}) => {
        const res = await loginAPI({account,password})

        resToken.value=res
    }

    const userRegister =async (user)=>{

        const res=await register(user)

        return res
    }

    const userInfo=ref({})
    const getUserInfo=async (token)=>{
        const res=await getInfo(token)

        userInfo.value=res.data

    }

    const clearUserInfo=()=>{
        userInfo.value={}
        sessionStorage.clear()
        //执行清除购物车action
        // cartStore.clearCart()
    }


    //3. 以对象的格式把state和action return
    return{
        resToken,
        userInfo,
        getUserToken,
        userRegister,
        getUserInfo,
        clearUserInfo,

    }
},{
    persist:true
})
