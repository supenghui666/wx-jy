<template>
  <div class="red-packets">
    <h5>感谢您完成调查问卷</h5>
    <div>
      <p>打开红包</p>
      <img src="./open.png" @click="getRedpack()">
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        objID:''
      }
    },
    methods:{
      getRedpack(){
        this.objID = sessionStorage.getItem(0);
        this.$store.dispatch('getRedPacket/act/redPacket',{
          Vue: this,
          objID: this.objID
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .red-packets
    text-align:center
    h5{
      padding-top:1.5rem
      font-size: 0.4rem
      color:#35a0e8
    }
    div
      width: 3.8rem
      height: 5.22rem
      background:url(./red-packets.png) no-repeat center center
      background-size:3.73rem 5.22rem
      position:absolute
      left:50%
      top:50%
      margin-top:-2.61rem
      margin-left:-1.9rem
      img
        width:1.03rem
        height:1.03rem
      p
        font-size:0.38rem
        margin-top:2rem
        color:#f8bb18
        height:1rem
        line-height:1rem
        width:100%
</style>