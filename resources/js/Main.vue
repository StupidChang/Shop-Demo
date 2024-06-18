<template>
        <router-view></router-view>


</template>

<script>
export default {
  name: 'Main',
  methods: {
    loadHome: function(){
      this.$router.push('/Home')
    }
  },
  mounted: function(){
    this.loadHome()
  }
}
</script>

<style scoped>
    /* 定義過渡效果樣式 */
    .fade-enter-active, .fade-leave-active {
        transition: opacity 3s;
    }
    .fade-enter-from, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
        opacity: 0;
    }
    .fade-enter-to, .fade-leave-from /* .fade-leave-active in <2.1.8 */ {
        opacity: 1;
    }
</style>

