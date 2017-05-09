<template>
  <div class="department">
    <header>您需要参加调查问卷的部门</header>
    <ul>
      <li v-for="(item, index) in authObject">
        <p :class="{active:isActive==item.objectName&&item.status!=1,over:item.status==1}" @click="onActive(item)">{{item.objectName}}</p>
      </li>
    </ul>
    <div class="nub">共<span>{{authObject.length}}</span>个部门</div>
    <div class="go" @click="goOn">继续</div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        authObject:[{
            objectName:'',
            ID:'',
            status:''
          }
        ],
        isActive:'',
        objID:'',
        refeStyle:'',//评议部门
        isComplete:''//是否完成评议状态
      }
    },
    //获取调查用户可以做的部门
    created:function(){
      this.$ajax.get(this._url+'/index.php/Home/Question/authObject').then( response=> {
        if (response.data.status==1) {
          this.authObject = response.data.data;
        }
      }).catch( error=> {
        console.log(error);
      })
    },
    methods:{
      //选取部门题目选中
      onActive(item){
        this.objID = item.ID;
        this.refeStyle = item.refeStyle;
        this.isComplete = item.status;
        if (item.status!=1) {
          this.isActive=item.objectName;
        }
      },
      //选部门后跳到对应部门题目
      goOn(){
        if (this.isActive!='') {
          if (this.isComplete==1) {
            return false;
          };
          this.$ajax.post(this._url+'/index.php/Home/Question/warmTip',{objID:this.objID,refeStyle:this.refeStyle}).then( response=> {
            let obj = JSON.stringify({objID:this.objID,refeStyle:this.refeStyle,indexSeq:response.data.dialog});
            localStorage.setItem(0,obj);
            if (response.data.status==1) {
              this.$router.push("/ingredient");
            }else{
              alert("您上次做到第"+response.data.dialog+"点击确认");
              this.$router.push("/ingredient");
            }
          }).catch( error=> {
            console.log(error);
          })
        }else{
          alert("请选择评议对象");
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.department
  text-align:center
  header
    height:1rem
    border-bottom:1px solid #eeeeee
    font-size:0.36rem
    color:#000
    line-height:1rem
  ul
    height:8rem
    width:5rem
    padding-top:0.6rem
    margin:0 auto
    .active
      background-color:#d5eeff
      border-radius:12px
    .over
      background:url(../../../common/images/complete.png) no-repeat center right
      background-size:1rem 1rem
      border-radius:12px
    li
      font-size:0.32rem
      color:#646464
      height:0.7rem
      line-height:0.7rem
      margin-bottom:0.3rem
      border:2px solid #ccc
      border-radius:12px
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