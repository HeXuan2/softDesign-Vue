<template>
  <div className="app-container">

    <div class="mapSearch" :model="address">
      <input v-model="address.showAddress" placeholder="请输入你要查找的关键词" id="tipinput">
      <button type="primary" @click="confirmAddress">确定选址</button>
      <button @click="toback">返回</button>
    </div>

    <div style="background-color: #ffffff;">
      <div id="container"></div>
    </div>
  </div>
</template>

<script setup>
//那到当前位置的地址以及搜索后选中的地址，并传入到pinia中集中管理，需要时取出

import AMapLoader from '@amap/amap-jsapi-loader';
/*在Vue3中使用时,需要引入Vue3中的shallowRef方法(使用shallowRef进行非深度监听,
因为在Vue3中所使用的Proxy拦截操作会改变JSAPI原生对象,所以此处需要区别Vue2使用方式对地图对象进行非深度监听,
否则会出现问题,建议JSAPI相关对象采用非响应式的普通对象来存储)*/
import { useCommon } from '@/hooks/common';
const {router,globalProperties,} = useCommon();
import {ref} from "vue";
import {storeToRefs} from "pinia";
import {usegetGaoDeAddress} from "@/stores/getGaoDeAddress";
const getGaoDeAddress=usegetGaoDeAddress()

const {address}=storeToRefs(getGaoDeAddress)



const path = ref([]);
const current_position = ref([]);
const current_address = ref({}) //存储当前的具体地址
const path_address = ref({})//存储搜索后的具体地址

var autoOptions = {
  input: "tipinput"
};

var geocoder
var marker


function initMap() {

  window._AMapSecurityConfig = {
    securityJsCode: '77ec7271e886d4a0554924b40469e5bb',
  }
  AMapLoader.load({
    key: "4ddf4960bc6eb183e4e5737ce1ec7e8c", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    // plugins:[''], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap) => {
    const map = new AMap.Map("container", {  //设置地图容器id
      viewMode: "3D",    //是否为3D地图模式
      zoom: 13,           //初始化地图级别
      center: [113.808299, 34.791787], //初始化地图中心点位置
    });


    var options = {
      'showButton': true,//是否显示定位按钮
      'buttonPosition': 'LB',//定位按钮的位置
      /* LT LB RT RB */
      'buttonOffset': new AMap.Pixel(10, 20),//定位按钮距离对应角落的距离
      'showMarker': true,//是否显示定位点
      'markerOptions': {//自定义定位点样式，同Marker的Options
        'offset': new AMap.Pixel(-18, -36),
        'content': '<img src="https://a.amap.com/jsapi_demos/static/resource/img/user.png" style="width:36px;height:36px"/>'
      },
      'showCircle': true,//是否显示定位精度圈
      'circleOptions': {//定位精度圈的样式
        'strokeColor': '#0093FF',
        'noSelect': true,
        'strokeOpacity': 0.5,
        'strokeWeight': 1,
        'fillColor': '#02B0FF',
        'fillOpacity': 0.25
      }
    }
    // 添加插件
    AMap.plugin(['AMap.Geolocation','AMap.Geocoder','AMap.PlaceSearch','AMap.AutoComplete'], function () {
      //异步同时加载多个插件

      var auto = new AMap.AutoComplete(autoOptions);
      var placeSearch = new AMap.PlaceSearch({
        map: map
      });  //构造地点查询类
      auto.on("select", select);//注册监听，当选中某条记录时会触发
      function select(e) {
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name);  //关键字查询查询
      }

      // 添加地图插件
      var geolocation = new AMap.Geolocation(options);
      geocoder = new AMap.Geocoder({
        city: "010", //城市设为北京，默认：“全国”
        radius: 1000 //范围，默认：500
      });
      marker = new AMap.Marker();
      map.addControl(geolocation);
      geolocation.getCurrentPosition()
      // 监听定位成功事件
      geolocation.on('complete', onComplete);//返回定位信息
      // 监听定位失败事件
      geolocation.on('error', onError);//返回定位出错信息

      map.on('click', (e) => {
        // if(e.lnglat.lng==null||e.lnglat.lat==null) {
        //   e.lnglat.lng=0
        //   e.lnglat.lat=0
        // }
        path.value = [e.lnglat.lng, e.lnglat.lat]
        regeoCode(path.value);
      });
    });

    function onComplete(obj) {
      // if(obj.position[0]==null||obj.position[1]==null) {
      //   obj.position[0]=0
      //   obj.position[1]=0
      // }
      current_position.value = obj.position
      regeoCode(current_position.value)
    }

    function onError(obj) {
      alert(obj.info + ',,,,' + obj.message);
    }


    const regeoCode = (lnglat) => {
      map.add(marker);
      marker.setPosition(lnglat);
      if (lnglat==current_position.value){
        geocoder.getAddress(current_position.value, (status, result) => {
          if (status === 'complete' && result.regeocode) {
            current_address.value=result.regeocode
            address.value.province=current_address.value.addressComponent.province
            address.value.city=current_address.value.addressComponent.city
            address.value.current=current_address.value.formattedAddress

          } else {
            console.error('根据经纬度查询地址失败');
          }
        })
      }else if(lnglat==path.value){
        geocoder.getAddress(path.value, (status, result) => {
          if (status === 'complete' && result.regeocode) {
            path_address.value= result.regeocode
            address.value.path=path_address.value.formattedAddress
          } else {
            console.error('根据经纬度查询地址失败');
          }
        })
      }

    }

  })


}


const confirmAddress = () => {

  if (current_address.value.formattedAddress&&!path_address.value.formattedAddress){

    address.value.showAddress= current_address.value.formattedAddress
  }else{

    address.value.showAddress=path_address.value.formattedAddress
  }


}
const toback = () => {
  router.back()
}


onMounted(() => {
  initMap()
})

</script>

<style>
#container {
  padding: 0px;
  margin: 0px;
  width: 300px;
  height: 300px;
}

.mapSearch {
  display: flex;
  margin-bottom: 8px;
}

  .el-button {
    margin-left: 8px;
  }


#tishikuang {
  margin-bottom: 200px;
  display: block;
}

</style>


