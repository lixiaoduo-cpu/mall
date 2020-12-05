<template>
  <div>
    <h2>分类</h2>
    <p>{{data1}}</p>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar';
  import {get} from '../../router/category';
  export default {
    name: 'Category',
    components: {NavBar},
    data() {
      return {
        data1: null
      }
    },
    created() {
      get().then(res => {
        this.data1 =res
      })
    }
  };
</script>

<style scoped>

</style>
