<template>
  <div id="app">
    <transition name="fade">
      <router-view class="router"></router-view>
    </transition>
    <loading :show="loadingShow" ></loading>
  </div>
</template>
<script>
import loading from './components/loading/loading.vue';
// import { mapGetters } from 'vuex';
import { mapState } from 'vuex';
export default {
  name: 'app',
  data(){
    return{
    }
  },
  computed: mapState({
    loadingShow: state => state.loadingShow,
  }),
  // {
  //   loadingShow(){
  //     // return this.$store.getters['loadingShow'];
  //     return this.$store.state.loadingShow;
  //   }
  //   // ...mapGetters(['loadingShow'])
  // },
  components:{
    loading
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "./common/css/mobile-reset.css"
  html,body,#app
    height: 100%
    .router
      height:100%
      position: absolute
      width:7.5rem
      margin-left:-3.75rem
      top: 0
      left:50%
      background: #fff
      transition: all 0.5s
      z-index:2
      &.fade-enter-active
        transform: translate(100%, 0)
        opacity: 0
      &.fade-leave-active
        transform: translate(100%, 0)
        opacity: 0
      // overflow:auto
</style>
