<template>
  <div class="login">
    <header class="banner"></header>
    <form onsubmit="return false">
      <p>
        <label>手机号:</label>
        <input type="tel" name="手机号" v-model="telNub" maxlength="11" autocomplete="off">
      </p>
      <p v-show="telErr!=''">{{res.telErr}}</p>
      <p>
        <label>验证码:</label>
        <input class="tel" type="text" name="验证码" maxlength="6" v-model="code" autocomplete="off">
        <input class="code" type="button" @click="getCode()" name="获取验证" :disabled="disabled" :value="val">
      </p>
      <p v-show="codeErr">{{res.codeErr}}</p>
      <p>
        <button class="btn" @click="login">登录</button>
      </p>
    </form>
  </div>
</template>
<script>
  export default {
    data (){
      return{
        res:{},
        telNub:'',
        code:'',
        telErr:'',
        codeErr:'',
        time:60,
        disabled: false,
        val:'获取验证码',
        reg: /^1[3|4|5|7|8][0-9]{9}$/
      }
    },
    watch:{
      code:function(){
        this.codeErr = false;
      },
      telNub:function(){
        this.telErr = false;
      }
    },
    methods:{
      //登录
      login(){
        if (this.reg.test(this.telNub)&&this.code!=""){
          this.$store.dispatch('login/act/LOGIN', {
            Vue: this,
            telNub: this.telNub,
            code: this.code,
          });
        }else if (this.telNub==""&&this.code!="") {
          this.res.text = "手机号不能为空";
        }else if (this.telNub==""&&this.code=="") {
          this.res.telErr = "手机号不能为空";
          this.res.codeErr = "验证码不能为空";
        }
      },
      //验证码倒计时
      countDown(){
        if (this.time==0) {
          this.disabled = false;
          this.val="点击获取";
          this.time = 60;
        }else{
          this.disabled = true;
          this.val = "重新发送("+this.time+")";
          this.time--;
          setTimeout( ()=>this.countDown(),1000 );
        }
      },
      //获取验证码
      getCode(){
        if (this.reg.test(this.telNub)){
          this.$store.dispatch('login/act/CODE',{
            Vue: this,
            telNub: this.telNub
          })
        }else{
          this.res.telErr = "手机号码格式不对";
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.login
  .banner
    width:100%
    height:4.35rem
    background:url(./banner.png) no-repeat center center
    background-size:7.5rem 4.36rem
  form
    color:#a0a0a0
    padding-top:0.7rem
    width:6rem
    margin:0 auto
    font-size:0.32rem
    input
      outline:none
      border:none
      padding:0
      border:1px solid #eeeeee
      font-size:0.28rem
      box-sizing:border-box
      padding:0.1rem
    p
      display: flex
      align-items:center
      label
        padding-right:0.26rem
    p:nth-child(1)
      input
        width:4.5rem
    p:nth-child(2)
      color:#f00
      margin-top:0.2rem
    p:nth-child(3)
      padding-top:0.4rem;
      .tel
        width:2.7rem
        margin-right:0.10rem
      .code
        width:1.68rem
        font-size:0.26rem
        background-color:#fff
    p:nth-child(4)
      color:#f00
      margin-top:0.2rem
    .btn
      width:6rem
      outline:none
      border:none
      padding:0
      margin-top:1.5rem
      height:0.8rem
      border-radius:8px
      background-color:#ff895d
      color:#fff
</style>