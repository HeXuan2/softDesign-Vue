//axios基础的安装
import axios from 'axios'
import {ElMessage} from "element-plus";
import 'element-plus/theme-chalk/el-message.css'
import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";
const router=useRouter()

const httpInstance = axios.create({
    baseURL:'http://127.0.0.1:8080/supermarket/',
    timeout:5000
})

//拦截器，从官网直接复制
httpInstance.interceptors.request.use(config => {
    if(config.url==='/user/login'||config.url==='/user/register'){
        //不做任何处理
        return config
    }
    // 1.从pinia获取token数据
    const userStore = useUserStore()
    //  2. 按照后端的要求凭借token
    const token =userStore.resToken.data.token
    if (token) {
        config.headers.Authorization = token
    }
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use( res => res.data,  e => {

     //统一错误提示
    ElMessage({
        type: 'warning',
        message: "数据响应错误，请稍后再试"
    })
    //401token失效处理
    //1.清楚本地用户数据
    //2. 跳转到登录页
    if (e.response.status === 401) {
        userStore.clearUserInfo()
        router.push({path:'/login'})
    }
    return Promise.reject(e)
})

export default httpInstance


