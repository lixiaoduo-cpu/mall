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
        scroll: null
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
      //3.上拉加载更多
      // this.scroll.on('pullingUp', () => {
      //   this.$emit('pullingUp')
      // })
      //3.监听scroll滚动到底部
      if (this.pullUpLoad){
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp');
        });
      }


    },
    methods: {
      scrollTo(x,y,time) {
        this.scroll.scrollTo(x,y,time);
      },
      finishPullUp() {
        this.scroll.finishPullUp();
      },
      refresh() {
        this.scroll.refresh();
      },
      getY() {
        return this.scroll.y

      }

    }
  };
</script>

<style scoped>

</style>
