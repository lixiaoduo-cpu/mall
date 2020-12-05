<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'TabBar'
  };
</script>

<style scoped>
  /*设置底纹*/
  #tab-bar{
    display: flex;
    background-color: #f6f6f6;
    /*固定在底部*/
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /*设置过渡效果*/
    box-shadow: 0 -3px 1px rgba(100, 100, 100,0.1);
  }

</style>
