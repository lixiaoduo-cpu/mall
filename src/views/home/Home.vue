<template>
  <div id="home">
    <router-view></router-view>
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
  <home-swiper :banners="banners"></home-swiper>
  <recommend-view :recommends="recommends"></recommend-view>
  <feature></feature>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar';
  import {getHomeMultidata} from '../../router/home';
  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import Feature from './childComps/Feature';
  export default {
    name: 'Home',
    components: {
      NavBar,HomeSwiper,RecommendView,Feature
    },
    data() {
      return {
        banners: [],
        recommends: []
      };
    },
    created() {
      //1.请求多个数据
      getHomeMultidata().then(res => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
        console.log(this.recommends);
      });
    }
  };
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }
</style>
