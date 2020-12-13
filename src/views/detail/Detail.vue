<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods">111</detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar';
  import {getDetail, goods, shop} from '../../network/detail';
  import DetailSwiper from './childComps/DetailSwiper';
  import DetailBaseInfo from './childComps/DetailBaseInfo';
  import DetailShopInfo from './childComps/DetailShopInfo';
  import Scroll from '../../components/common/scroll/Scroll';

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,DetailSwiper,DetailBaseInfo,DetailShopInfo,Scroll
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {}
      };
    },
    created() {
      //保存传入的iid
      this.iid = this.$route.params.id;

      //根据iid来查询对应的数据
      getDetail(this.iid).then(res => {
        //获取轮播图数据
        this.topImages = res.data.result.itemInfo.topImages;
        console.log(res);
        //获取商品信息
        this.goods = new goods(res.data.result.itemInfo,
            res.data.result.columns,
            res.data.result.shopInfo.services);
        console.log(this.goods);
        //获取商家信息
        this.shop = new shop(res.data.result.shopInfo);
      });
    }

  };
</script>

<style scoped>
  #detail {
    position: relative;
    background-color: white;
    z-index: 9;
    height: 100vh;
    overflow: hidden;
  }

 .content {
    height: calc(100% - 44px);
 }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
