<template>

  <div class="wrapper">
    <!-- header部分 -->
    <header>
      <div class="icon-location-box">
        <div class="icon-location"></div>
      </div>
      <!--    使用高德地图获取当前位置-->
      <div class="location-text" @click="toUserAddress"><i class="iconfont icon-weizhi"></i>{{form.current_cityAndProvince}}</div>
    </header>
    <!-- search部分 -->
    <!--
    搜索框部分（此块与search-fixed-top块宽度高度一致，用于当
    search-fixed-top块固定后，挡住下面块不要窜上去）
    -->
    <div class="search">
      <div class="search-fixed-top" id="fixedBox">
        <div ref="fixedBox" class="search-panel">
          <i class="iconfont icon-sousuo" style="flex: 0 0 15px;padding-left: 3px ;font-size: 25px;"></i>
          <input type="search" value="请输入要查询的商品" style="flex: 6; border: none;outline: none;color: #9f9f9f;font-size: 5vw;" >
          <i class="search-button" style="flex: 0 0 15vw;" onclick="searchClick()">搜索</i>
        </div>
      </div>
    </div>
    <!-- 点餐分类部分 -->

    <ul class="itemtype">
      <li @click="toShopList(1)">
        <img src="../assets/dcfl01.png">
        <p>美食</p>
      </li>
      <li @click="toShopList(2)">
        <img src="../assets/dcfl02.png">
        <p>早餐</p>
      </li>
      <li @click="toShopList(3)">
        <img src="../assets/dcfl03.png">
        <p>跑腿代购</p>
      </li>
      <li @click="toShopList(4)">
        <img src="../assets/dcfl04.png">
        <p>汉堡披萨</p>
      </li>
      <li @click="toShopList(5)">
        <img src="../assets/dcfl05.png">
        <p>甜品饮品</p>
      </li>
      <li @click="toShopList(6)">
        <img src="../assets/dcfl06.png">
        <p>速食简餐</p>
      </li>
      <li @click="toShopList(7)">
        <img src="../assets/dcfl07.png">
        <p>地方小吃</p>
      </li>
      <li @click="toShopList(8)">
        <img src="../assets/dcfl08.png">
        <p>米粉面馆</p>
      </li>
      <li @click="toShopList(9)">
        <img src="../assets/dcfl09.png">
        <p>包子粥铺</p>
      </li>
      <li @click="toShopList(10)">
        <img src="../assets/dcfl10.png">
        <p>炸鸡炸串</p>
      </li>
    </ul>



    <!-- 横幅广告部分（注意：此处有背景图片） -->
    <div class="banner">
      <h3>品质套餐</h3>
      <p>搭配齐全吃得好</p>
      <a>立即抢购 &gt;</a>
    </div>
    <!-- 超级会员部分 -->
    <div class="supermember">
      <div class="left">
        <img src="../assets/super_member.png">
        <h3>超级会员</h3>
        <p>&#8226; 每月享超值权益</p>
      </div>
      <div class="right">
        立即开通 &gt;
      </div>
    </div>
    <!-- 推荐商家部分 -->
    <div class="recommend">
      <div class="recommend-line"></div>
      <p>推荐商家</p>
      <div class="recommend-line"></div>
    </div>
    <!-- 推荐方式部分 -->
    <ul class="recommendtype">
      <li>综合排序<i class="iconfont icon-caretdown"></i></li>
      <li>距离最近</li>
      <li>销量最高</li>
      <li>筛选<i class="iconfont icon-filter"></i></li>
    </ul>
    <!-- 推荐商家列表部分 -->
    <ul class="shop">
      <li>
        <img src="../assets/sj01.png">
        <div class="shop-info">
          <div class="shop-info-h">
            <h3>万家饺子（软件园E18店）</h3>
            <div class="shop-info-like">&#8226;</div>
          </div>
          <div class="shop-info-star">
            <div class="shop-info-star-left">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <p>4.9 月售345单</p>
            </div>
            <div class="shop-info-star-right">
              蜂鸟专送
            </div>
          </div>
          <div class="shop-info-delivery">
            <p>&#165;15起送 | &#165;3配送</p>
            <p>3.22km | 30分钟</p>
          </div>
          <div class="shop-info-explain">
            <div>各种饺子</div>
          </div>
          <div class="shop-info-promotion">
            <div class="shop-info-promotion-left">
              <div class="shop-info-promotion-left-incon">新</div>
              <p>饿了么新用户首单立减9元</p>
            </div>
            <div class="shop-info-promotion-right">
              <p>2个活动</p>
              <i class="iconfont icon-caretdown"></i>
            </div>
          </div>
          <div class="shop-info-promotion">
            <div class="shop-info-promotion-left">
              <div class="shop-info-promotion-left-incon" style="background-color: #F1884F;">特</div>
              <p>特价商品5元起</p>
            </div>
          </div>
        </div>
      </li>
      <li>
        <img src="../assets/sj02.png">
        <div class="shop-info">
          <div class="shop-info-h">
            <h3>小锅饭豆腐馆（全运店）</h3>
            <div class="shop-info-like">&#8226;</div>
          </div>
          <div class="shop-info-star">
            <div class="shop-info-star-left">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <p>4.9 月售345单</p>
            </div>
            <div class="shop-info-star-right">
              蜂鸟专送
            </div>
          </div>
          <div class="shop-info-delivery">
            <p>&#165;15起送 | &#165;3配送</p>
            <p>3.22km | 30分钟</p>
          </div>
          <div class="shop-info-explain">
            <div>各种饺子</div>
          </div>
          <div class="shop-info-promotion">
            <div class="shop-info-promotion-left">
              <div class="shop-info-promotion-left-incon">新</div>
              <p>饿了么新用户首单立减9元</p>
            </div>
            <div class="shop-info-promotion-right">
              <p>2个活动</p>
              <i class="iconfont icon-caretdown"></i>
            </div>
          </div>
          <div class="shop-info-promotion">
            <div class="shop-info-promotion-left">
              <div class="shop-info-promotion-left-incon">特</div>
              <p>特价商品5元起</p>
            </div>
          </div>
        </div>
      </li>
      <li>
        <img src="../assets/sj03.png">
        <div class="shop-info">
          <div class="shop-info-h">
            <h3>麦当劳麦乐送（全运路店）</h3>
            <div class="shop-info-like">&#8226;</div>
          </div>
          <div class="shop-info-star">
            <div class="shop-info-star-left">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <p>4.9 月售345单</p>
            </div>
            <div class="shop-info-star-right">
              蜂鸟专送
            </div>
          </div>
          <div class="shop-info-delivery">
            <p>&#165;15起送 | &#165;3配送</p>
            <p>3.22km | 30分钟</p>
          </div>
          <div class="shop-info-explain">
            <div>各种饺子</div>
          </div>
          <div class="shop-info-promotion">
            <div class="shop-info-promotion-left">
              <div class="shop-info-promotion-left-incon">新</div>
              <p>饿了么新用户首单立减9元</p>
            </div>
            <div class="shop-info-promotion-right">
              <p>2个活动</p>
              <i class="iconfont icon-caretdown"></i>
            </div>
          </div>
          <div class="shop-info-promotion">
            <div class="shop-info-promotion-left">
              <div class="shop-info-promotion-left-incon">特</div>
              <p>特价商品5元起</p>
            </div>
          </div>
        </div>
      </li>
      <li>
        <img src="../assets/sj04.png">
        <div class="shop-info">
          <div class="shop-info-h">
            <h3>米村拌饭（浑南店）</h3>
            <div class="shop-info-like">&#8226;</div>
          </div>
          <div class="shop-info-star">
            <div class="shop-info-star-left">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <p>4.9 月售345单</p>
            </div>
            <div class="shop-info-star-right">
              蜂鸟专送
            </div>
          </div>
          <div class="shop-info-delivery">
            <p>&#165;15起送 | &#165;3配送</p>
            <p>3.22km | 30分钟</p>
          </div>
          <div class="shop-info-explain">
            <div>各种饺子</div>
          </div>
          <div class="shop-info-promotion">
            <div class="shop-info-promotion-left">
              <div class="shop-info-promotion-left-incon">新</div>
              <p>饿了么新用户首单立减9元</p>
            </div>
            <div class="shop-info-promotion-right">
              <p>2个活动</p>
              <i class="iconfont icon-caretdown"></i>
            </div>
          </div>
          <div class="shop-info-promotion">
            <div class="shop-info-promotion-left">
              <div class="shop-info-promotion-left-incon">特</div>
              <p>特价商品5元起</p>
            </div>
          </div>
        </div>
      </li>
      <li>
        <img src="../assets/sj05.png">
        <div class="shop-info">
          <div class="shop-info-h">
            <h3>申记串道（中海康城店）</h3>
            <div class="shop-info-like">&#8226;</div>
          </div>
          <div class="shop-info-star">
            <div class="shop-info-star-left">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <p>4.9 月售345单</p>
            </div>
            <div class="shop-info-star-right">
              蜂鸟专送
            </div>
          </div>
          <div class="shop-info-delivery">
            <p>&#165;15起送 | &#165;3配送</p>
            <p>3.22km | 30分钟</p>
          </div>
          <div class="shop-info-explain">
            <div>各种饺子</div>
          </div>
          <div class="shop-info-promotion">
            <div class="shop-info-promotion-left">
              <div class="shop-info-promotion-left-incon">新</div>
              <p>饿了么新用户首单立减9元</p>
            </div>
            <div class="shop-info-promotion-right">
              <p>2个活动</p>
              <i class="iconfont icon-caretdown"></i>
            </div>
          </div>
          <div class="shop-info-promotion">
            <div class="shop-info-promotion-left">
              <div class="shop-info-promotion-left-incon">特</div>
              <p>特价商品5元起</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <!-- 底部菜单部分 -->
    <Footer></Footer>
  </div>

</template>
<script setup>
import {onMounted,onUnmounted,watch,ref} from "vue";
import { useCommon } from '@/hooks/common';
import MapContainer from "@/views/MapContainer.vue";
import {storeToRefs} from "pinia";
const {router,gaoDeAddress, globalProperties,Footer} = useCommon();
const fixedBox=ref(null)

const {address}=storeToRefs(gaoDeAddress)

const form=ref({
  current_cityAndProvince:address.value.province+address.value.city
})




onMounted(()=>{
  document.onscroll = ()=> {
    //获取滚动条位置
    let s1 = document.documentElement.scrollTop;
    let s2 = document.body.scrollTop;
    let scroll = s1 == 0 ? s2 : s1;
    //获取视口宽度
    let width = document.documentElement.clientWidth;

    //获取顶部固定块v
    let search =fixedBox.value;
    if (search) {
      //判断滚动条超过视口宽度的12%时，搜索块变固定定位
      if (scroll > width * 0.12) {
        search.style.position = 'fixed';
        search.style.left = '0';
        search.style.top = '20px';
      } else {
        search.style.position = 'static';
      }}
  }
})
onUnmounted(()=>{
  //当切换到其他组件时，就不需要document滚动条事件，所以将此事件去掉
  document.onscroll = null;
})

const toShopList = (shopType) => {
  // 如果shopType的值为123，则执行该代码后，页面的URL将变为/shopList?shopType=123。
  router.push({path:'/shopList',query:{shopType:shopType}});
}
const toUserAddress = () => {
  router.push({path:'/userAddress'});
}


</script>

<style scoped>

.map-container {
  width: 300px;
  height: 300px;
  margin-top: 0px;
  margin-left: 40px;
  margin-bottom: 60px;

}

/****************** 总容器 ******************/
.wrapper {

  width: 100%;
  height: 100%;
}
/****************** header ******************/
.wrapper header {
  width: 100%;
  height: 12vw;
  background-color: #0097FF;
  display: flex;
  align-items: center;
}
.wrapper header .icon-location-box {
  width: 3.5vw;
  height: 3.5vw;
  margin: 0 1vw 0 3vw;
}
.wrapper header .location-text {
  font-size: 4.5vw;
  font-weight: 700;
  color: #fff;
}
.wrapper header .location-text .icon-weizhi{
  font-size: 30px; margin-right: 4px
}
/****************** search ******************/
.wrapper .search {
  width: 100%;
  height: 13vw;
}
.wrapper .search .search-fixed-top{
  margin-top: 31px;
  width: 100%;
  height: 13vw;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50% 50% 50% 50%;
}
.wrapper .search .search-fixed-top .search-panel{
  margin-top: 30px;
  width: 97%;
  display: flex;
  height: 8vw;
  justify-content: center;
  align-items: center;
  border: 2px solid #0097ff;
  font-size: 5vw;

  border-radius: 25px;

}
.wrapper .search .search-fixed-top .search-panel .search-button{
  height: 100%;

  border-radius:  25px;
  cursor: pointer;
  font-size: 3vw;
  background-color: #0097ff;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
}

/****************** 点餐分类部分 ******************/
.wrapper .itemtype {
  padding-left: 10px;
  margin-top: 0px;
  width: 100%;
  height: 48vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  /*要使用align-content。10个子元素将自动换行为两行，而且两行作为一个整体垂直居中*/
  align-content: center;
}
.wrapper .itemtype li {
  /*一共10个子元素，通过计算，子元素宽度在16.7 ~ 20 之间，才能保证换两行*/
  margin-left: -6px;
  width: 18vw;
  height: 20vw;
  display: flex;
  /*弹性盒子主轴方向设为column，然后仍然是垂直水平方向居中*/
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
}
.wrapper .itemtype li img {
  width: 12vw;
  /*视频讲解时高度设置为12vw，实际上设置为10.3vw更佳*/
  height: 10.3vw;
}
.wrapper .itemtype li p {
  font-size: 3.2vw;
  color: #666;
}
/****************** 横幅广告部分 ******************/
.wrapper .banner {
  /**
  * 设置容器宽度95%，然后水平居中，这样两边留白;
  * 这里不能用padding，因为背景图片也会覆盖padding
  */
  width: 95%;
  margin: 0 auto;
  height: 29vw;
  /*此三个样式组合，可以保证背景图片充满整个容器*/
  background-image: url(../assets/index_banner.png);
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  padding: 2vw 6vw;
}
.wrapper .banner h3 {
  font-size: 1.7rem;
  font-weight: 700;
  font-family: 黑体;
  margin-bottom: 0.6rem;
}
.wrapper .banner p {
  font-size: 3.4vw;
  color: #666;
  margin-bottom: 2.4vw;
}
.wrapper .banner a {
  font-size: 3vw;
  color: #C79060;
  font-weight: 700;
}
/****************** 超级会员部分 ******************/
.wrapper .supermember {
  /*这里也设置容器宽度95%，不能用padding，因为背景色也会充满padding*/
  width: 95%;
  margin: 0 auto;
  height: 11.5vw;
  background-color: #FEEDC1;
  margin-top: 1.3vw;
  border-radius: 2px;
  color: #644F1B;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.wrapper .supermember .left {
  display: flex;
  align-items: center;
  margin-left: 4vw;
  user-select: none;
}
.wrapper .supermember .left img {
  width: 6vw;
  height: 6vw;
  margin-right: 2vw;
}
.wrapper .supermember .left h3 {
  font-size: 4vw;
  margin-right: 2vw;
}
.wrapper .supermember .left p {
  font-size: 3vw;
}
.wrapper .supermember .right {
  font-size: 3vw;
  margin-right: 4vw;
  cursor: pointer;
}
/****************** 推荐商家部分 ******************/
.wrapper .recommend {

  width: 100%;
  height: 14vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper .recommend .recommend-line {
  width: 6vw;
  height: 0.2vw;
  background-color: #888;
}
.wrapper .recommend p {
  font-size: 4vw;
  margin: 0 4vw;
}
/****************** 推荐方式部分 ******************/
.wrapper .recommendtype {
  padding: 0px;
  width: 100%;
  height: 5vw;
  margin-bottom: 5vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.wrapper .recommendtype li {
  font-size: 3.5vw;
  color: #555;
}
/****************** 推荐商家列表部分 ******************/
.wrapper .shop {
  width: 100%;
  margin-bottom: 14vw;
}
.wrapper .shop li {
  margin-left: -31px;
  width: 100%;
  box-sizing: border-box;
  padding: 0vw;
  user-select: none;
  border-bottom: solid 1px #DDD;
  display: flex;
}
.wrapper .shop li img {
  width: 18vw;
  height: 18vw;
}
.wrapper .shop li .shop-info {
  width: 100%;
  box-sizing: border-box;
  padding-left: 3vw;
}
.wrapper .shop li .shop-info .shop-info-h {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vw;
}
.wrapper .shop li .shop-info .shop-info-h h3 {
  font-weight: bold;
  font-size: 4vw;
  color: #333;
}
.wrapper .shop li .shop-info .shop-info-h .shop-info-like {
  width: 1.6vw;
  height: 3.4vw;
  background-color: #666;
  color: #fff;
  font-size: 4vw;
  margin-right: 4vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper .shop li .shop-info .shop-info-star {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vw;
  font-size: 3.1vw;
}
.wrapper .shop li .shop-info .shop-info-star .shop-info-star-left {
  display: flex;
  align-items: center;
}


.wrapper .shop li .shop-info .shop-info-star .shop-info-star-left .fa-star {
  width: 10px;
  height: 10px;
  background-color: #FEC80E;
  clip-path: polygon(50% 0%, 62% 38%, 100% 38%, 69% 59%, 82% 100%, 50% 75%, 18% 100%, 31% 59%, 0% 38%, 38% 38%);
  margin-right: -0.5vw;
}
.wrapper .shop li .shop-info .shop-info-star .shop-info-star-left p {
  color: #666;
  margin-left: 2vw;
}
.wrapper .shop li .shop-info .shop-info-star .shop-info-star-right {
  background-color: #0097FF;
  color: #fff;
  font-size: 2.4vw;
  border-radius: 2px;
  padding: 0 0.6vw;
}


.wrapper .shop li .shop-info .shop-info-delivery {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2vw;
  color: #666;
  font-size: 3.1vw;
}
.wrapper .shop li .shop-info .shop-info-explain {
  display: flex;
  align-items: center;
  margin-bottom: 3vw;
}
.wrapper .shop li .shop-info .shop-info-explain div {
  border: solid 1px #DDD;
  font-size: 2.8vw;
  color: #666;
  border-radius: 3px;
  padding: 0 0.1vw;
}
.wrapper .shop li .shop-info .shop-info-promotion {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.8vw;
}
.wrapper .shop li .shop-info .shop-info-promotion .shop-info-promotion-left
{
  display: flex;
  align-items: center;
}
.wrapper .shop li .shop-info .shop-info-promotion .shop-info-promotion-left
.shop-info-promotion-left-incon {
  width: 4vw;
  height: 4vw;
  background-color: rgb(240, 115, 115);
  border-radius: 3px;
  font-size: 3vw;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper .shop li .shop-info .shop-info-promotion .shop-info-promotion-left
p {
  color: #666;
  font-size: 3vw;
  margin-left: 2vw;
}
.wrapper .shop li .shop-info .shop-info-promotion .shop-info-promotion-right
{
  display: flex;
  align-items: center;
  font-size: 2.5vw;
  color: #999;
}
.wrapper .shop li .shop-info .shop-info-promotion .shop-info-promotion-right p {
  margin-right: 2vw;
}

</style>
