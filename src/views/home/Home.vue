<template>
  <div id="home"
       ref="home-control">
    <router-view></router-view>
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentscroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
            >
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature></feature>
      <tab-control :titles="titles"
                   class="tab-control"
                   @tabClick="tabClick"></tab-control>
      <goods-list :goods="this.goods[ currentType ].list"
                  class=""></goods-list>
    </scroll>
    <!--回到顶部-->
    <back-top @click.native="backClick"
              v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar';
  import {getHomeMultidata} from '../../network/home';
  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import Feature from './childComps/Feature';
  import TabControl from '../../components/content/tabcontrol/TabControl';
  import {getHomeGoods} from '../../network/home';
  import GoodsList from '../../components/content/goods/goodsList/GoodsList';
  import Scroll from '../../components/common/scroll/Scroll';
  import BackTop from '../../components/content/backtop/BackTop';
  export default {
    name: 'Home',
    components: {
      TabControl,
      NavBar,
      HomeSwiper,
      RecommendView,
      Feature,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        titles: ['流行','新款','精选'],
        goods: {
          'pop': {page:0, list: []},
          'new': {page:0, list: []},
          'sell': {page:0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        saveY: 0
      };

    },
    //活跃时执行
    activated() {
      //滚动到所保存的位置
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      this.$refs.scroll.refresh();
    },

    //un活跃时执行
    deactivated() {
      this.saveY = this.$refs.scroll.getY();
      console.log(this.saveY);
    },
    created() {
      //1.请求多个数据
      getHomeMultidata().then(res => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
      //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');

      //3.监听Item中图片加载完成,因为没有$bus，所以要在main.js中创建它
      this.$bus.$on('itemImageLoad', () => {
        // console.log('------');
        this.$refs.scroll.refresh();
      });

    },
    methods: {
      //事件监听的方法
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
        }
      },
      backClick() {
        //回到顶部的方法(在Scroll.vue中做了一个简单的封装，这里只是调用了一下方法)
        this.$refs.scroll.scrollTo(0,0,500);
      },
      //是否显示回顶部按钮
      contentscroll(position) {
        this.isShowBackTop = (-position.y) > 1000;
      },
      loadMore() {
        this.getHomeGoods(this.currentType);
      },


      //网络请求相关方法
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page += 1;
          this.$refs.scroll.scroll.finishPullUp();
        });
      }

    }
  };
</script>

<style scoped>
  #home {
    padding-top: 44px;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;


    position: fixed;
    left: 0;
    right: 0;
    top: 0;

    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    background-color: white;
    z-index: 9;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;


  }
  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*}*/
</style>
