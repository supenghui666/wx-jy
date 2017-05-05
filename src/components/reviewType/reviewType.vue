<template>
  <div class="reviewType">
    <header>您需要参加调查的评议如下</header>
    <ul>
      <li v-for="item in reviewType" :class="{over:item.expstatus==0}">
        <p class="border" @click="onActive(item)" :class="{active:isActive==item.refeName&&item.expstatus!=0}">{{item.refeName}}</p>
        <p>评议日期{{item.bdate}}到{{item.edate}}</p>
        <div class="complete">
          <progress :value="item.complete" :max="item.total"></progress>
          <span>{{Math.round(item.complete/item.total*100)+'%'}}</span> 
        </div>
      </li>
    </ul>
    <div class="nub">共<span>{{reviewType.length}}</span>种评议</div>
    <div class="go" @click="goReview()">继续</div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        reviewType:'',
        isActive:'',
        refeStyle:'',
        expstatus:'',
        completestatus:''
      }
    },
    created:function(){
      //获取评议类型
      this.$ajax.get(this._url+'/index.php/Home/Question/refeAuth').then( response=> {
        if (response.data.status==1) {
          this.reviewType = response.data.data;
        }
      }).catch( error=> {
        console.log(error);
      })
    },
    methods:{
      //选评议类型选中状态
      onActive(item){
        if (item.expstatus==0) {
          return false;
        }else{
          this.isActive = item.refeName;//存储选中评议类型
          sessionStorage.setItem(3,item.refeStyle);
          this.refeStyle = item.refeStyle;
          this.expstatus = item.expstatus;//获取评议是否过期 
          this.completestatus = item.completestatus;//评议是否完成 
        }
      },
      //点击继续确定选择的评议类型
      goReview(){
        if (this.isActive=='') {
          alert('请选择评议对象');
          return false;
        }
        if (this.expstatus==0) {
          return false;
        }
        if (this.completestatus==1) {
          alert('该评议已完成');
          return false;
        }
        if (this.isActive=="印象评议") {
          this.$ajax.post(this._url+'/index.php/Home/test/warmTip',{refeStyle:this.refeStyle}).then( response=> {
            if(response.data.status==1) {//status为1代表做完题目
              this.$router.push('/description');
            }else{
              sessionStorage.setItem(2,response.data.dialog);
              alert('您上次做到'+response.data.data);
              this.$router.push('/impress');
            }
          }).catch( error=> {
            console.log(error);
          })
        }else{
          this.$router.push('/department');
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.reviewType
  text-align:center
  header
    height:1rem
    border-bottom:1px solid #eeeeee
    font-size:0.36rem
    color:#000
    line-height:1rem
  ul
    width:5rem
    padding-top:0.3rem
    margin:0 auto
    .active
      background-color:#d5eeff
      border-radius: 6px
    .over
      background:url(../../common/images/deadTime.png) no-repeat center left
      background-size:1rem 1rem
      border-radius: 6px
    li
      font-size:0.32rem
      color:#646464
      line-height:0.7rem
      margin-bottom:0.3rem
      .border
        border:2px solid #ccc
        border-radius:12px
    .complete
      height:0.6rem
      line-height:0.6rem
      text-align:left
      display:flex
      align-items:center
      justify-content:space-between
      progress
        vertical-align:middle
        height:0.2rem
        width:4.05rem
  .nub
    font-size:0.32rem
    margin-bottom:0.5rem
    span
      color:#ff0000
  .go
    background-color:#ff895d
    color:#fff
    font-size:0.36rem
    width:5.6rem
    height:0.7rem
    border-radius:10px
    line-height:0.7rem
    margin:0 auto
</style>