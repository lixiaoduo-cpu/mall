<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    name: 'Scroll',
    components: {
      BScroll
    },
    data() {
      return {
        scroll: null,
        message: '111'
      };
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      //1. 创建BS对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        //监听滚动
        probeType: this.probeType,
        //下拉刷新
        pullUpLoad: this.pullUpLoad
      });
      //2. 监听滚动位置
      this.scroll.on('scroll',(position) => {
        this.$emit('scroll',position);
      });

      //3. 监听上拉加载更多
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp');
      });
    },
    methods: {
      scrollTo(x,y,time) {
        this.scroll.scrollTo(x,y,time);
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      }

    }
  };
</script>

<style scoped>

</style>
