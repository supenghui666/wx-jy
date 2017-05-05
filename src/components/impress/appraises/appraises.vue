<template>
  <div>
    <header>总体评价表</header>
    <form>
      <h5 class="title">您对我区作风建设的总体评价是否满意?</h5>
      <ul class="clearfix">
        <li>
          <input type="radio" name="option" value="1" v-model="picked" />
          <label for="满意">满意</label>
        </li>
        <li>
          <input type="radio" name="option" value="2" v-model="picked" />
          <label for="基本满意">基本满意</label>
        </li>
        <li>
          <input type="radio" name="option" value="4" v-model="picked" />
          <label for="不满意">不满意</label>
        </li>
      </ul>
      <h6>您对我区作风建设的总体看法</h6>
      <textarea placeholder="请填写您的看法" v-model="scenName"></textarea>
      <div class="btn" @click="onNext">下一步</div>
    </form>
  </div>
</template>
<script>
export default {
  data (){
    return{
      picked: 1,
      scenName:''
    }
  },
  created:function(){
    this.$ajax.get(this._url._url+'/index.php/Home/Question/suveySugg').then( response=> {
      if (response.data.status==1) {
        let res = response.data.data
        this.picked = res.appraise;
        this.scenName = res.scenName;
      }
    }).catch( error=> console.log(error));    
  },
  methods:{
    onNext(){
      if (this.picked=='') {
        alert('请您选择对我区作风建设是否满意')
      }else{
        this.$ajax.post(this._url._url+'/index.php/Home/Question/suveySugg',{appraise:this.picked,scenName:this.scenName}).then( response=> {
          if (response.data.status==1) {
            this.$router.push('/impress');
          }
        }).catch( error=> console.log(error));
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  header
    height:1.2rem
    width:100%
    font-size:0.34rem
    text-align:center
    line-height:1.2rem
    color:#323232
    border-bottom: 1px solid #f0f0f0
  form
    color: #646464
    width:7rem
    margin: 0 auto
    font-size: 0.32rem
  form ul
    width: 6.5rem
    margin: 0 auto
  form ul li
    float: left
    width: 33.3%
  .title
    height: 0.85rem
    line-height: 0.85rem
  h6
    width: 100%
    height: 1.2rem
    line-height: 1.2rem
  textarea
    display: block
    padding:0
    width:6.4rem
    height:5.5rem
    resize: none
    font-size:0.3rem
    box-sizing:border-box
    padding:0.2rem
    margin: 0 auto
    border-radius: 6px
  .btn
    width:5.6rem
    height:0.7rem
    text-align:center
    font-size:0.36rem
    background-color:#ff895d
    margin:0 auto
    line-height:0.7rem
    border-radius:16px
    margin-top:1rem
    color:#fff
</style>
