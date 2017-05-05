<template>
  <div class="suggest">
    <header>
      <span>部门名称:</span>
      <span>{{department}}</span>
    </header>
    <form>
      <label>作风建设:</label>
      <textarea class="textarea" placeholder="请填写您的看法" v-model="suggest"></textarea>
      <div class="btn" @click="getRedpacket">下一步</div>
    </form>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        suggest:'',
        department:''
      }
    },
    created:function(){
      //获取到本地缓存评议的部门
      this.department = localStorage.getItem(1);
    },
    methods:{
      getRedpacket(){
        if (this.suggest!='') {
          $.ajax.post('',{}).then(reponst =>{
            this.$router.push("/redpackets");
          }).catch(error =>{
          })
        }else{
          this.$router.push("/redpackets");
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .suggest
    header
      height:1rem
      line-height:1rem
      padding:0 0.2rem
      font-size:0.36rem
      color:#323232
      border-bottom:1px solid #eeeeee
    form
      padding: 0 0.2rem
      margin:0 auto
      font-size:0.32rem
      label
        color:#746464
        padding:0.3rem 0
        display:block
      .textarea
        display:block
        padding:0.2rem
        width:6.4rem
        height:5.5rem
        margin:0 auto
        box-sizing:border-box
        resize:none
        outline:none
        border:1px solid #bcbcbc
        border-radius:6px
      .btn
        width:5.6rem
        height:0.7rem
        border-radius:16px
        background-color:#ff895d
        line-height:0.7rem
        color:#fff
        text-align:center
        margin:0 auto
        margin-top:2.3rem
</style>