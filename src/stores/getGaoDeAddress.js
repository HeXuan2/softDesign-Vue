import {defineStore} from "pinia";
import {ref} from "vue";

export const usegetGaoDeAddress=defineStore('GaoDeAddress',()=>{
    const address=ref({
        province:'省份',
        city:'城市',
        current:'',
        path:'',
        showAddress:''
    })
    //3. 以对象的格式把state和action return
    return{
        address
    }
},{
    persist:true
})
