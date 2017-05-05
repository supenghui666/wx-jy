<template>
  <div class="ingredient">
    <h4>{{allQuestion.objectName}}</h4>
    <h5>
      <span>{{allQuestion.indexSeq}}.</span>
      <div>
        <span>{{allQuestion.indexDesc}}</span>
      </div>
    </h5>
    <div>
      <div class="chioces_container">
        <ul class="option">
          <li v-for="(chioce, index) in allQuestion.survey_questionaryitem" @click="showMore(chioce,index),onActive(chioce)" :class="{active :chioceActive==chioce.itemDesc||chioce.itemValue==1}">{{chioce.itemDesc}}</li>
        </ul>
      </div>
      <transition name="fade">
        <div v-if="show" class="fixed">
          <div class="content" v-bind:class="{bounceInDown:show}">
            <h6>不了解说明</h6>
            <p class="introduct">{{allQuestion.exp}}</p>
            <div id="button" @click="onHide">继续</div>
          </div>
        </div>
        <div v-else-if="onShow" class="fixed">
          <div class="content" v-bind:class="{bounceInDown:onShow}">
            <h6>不满意原因</h6>
            <i @click="onShow=!onShow" id="cancle"></i>
            <div class="notGood" v-if="allQuestion.remark!=null">
              <p>不满意记录:</p>
              <p v-for="(item,i) in allQuestion.remark">{{i+1}}.{{item}}</p>
            </div>
            <textarea class="discontent" v-model="unsatisfyContent" placeholder="请具体全面描述不满意的原因和事例"></textarea>
            <div id="button" @click="unsatisfy">提交</div>
          </div>
        </div>
      </transition>
    </div>
    <div class="progress"><progress :value="allQuestion.indexSeq" :max="questionsType.length" /><span>{{Math.round(allQuestion.indexSeq/questionsType.length*100)+'%'}}</span></div>
    <footer class="footer">
      <div class="container" v-bind:class="{bcg: showQues}">
        <div class="show-type-container">
          <i class="show-all" @click="showQues=!showQues"></i>
          <div class="list">
            <span>{{allQuestion.indexSeq}}</span>
            <span>/</span>
            <span>{{questionsType.length}}</span>
          </div>
        </div>
        <transition>
          <ul v-if="showQues" class="list-type clearfix">
            <li v-for="(item, i) in questionsType" @click="change(item)">
              <span v-bind:class="{active: allQuestion.indexSeq==item.indexSeq}">{{ item.indexSeq }}</span>
            </li>
          </ul>
        </transition>
      </div>
      <transition name="fade">
        <div @click="showQues=!showQues" v-if="showQues" class="fixed"></div>
      </transition>
    </footer>
  </div>
</template>
<script>
  export default {
    data (){
      return{
        allQuestion: {
        },
        questionsType:[],
        chioceIndex:'',
        onShow:false,
        show:false,
        chioceActive: '',
        activeName:'',
        showQues: false,
        obj:'',
        unsatisfyContent:''
      }
    },
    created: function(){
      //获取评议的部门的题目
      this.obj = JSON.parse(localStorage.getItem(0));
      this.$ajax.post(this._url._url+'/index.php/Home/Question/requestQs',{objID:this.obj.objID,refeStyle:this.obj.refeStyle,indexSeq:this.obj.indexSeq?this.obj.indexSeq:''}).then( response=> {
        if (response.data.status==1) {
          this.allQuestion = response.data.data;
        }else{
        }
      }).catch( error=> {
        console.log(error);
      });
      //获取对应部门的题号
      this.$ajax.post(this._url._url+'/index.php/Home/Question/questionChoices',{objID:this.obj.objID,refeStyle:this.obj.refeStyle}).then( response=> {
        if (response.data.status==1) {
          this.questionsType = response.data.data;
        }else{
        }
      }).catch( error=> {
        console.log(error);
      })
    },
    methods:{
      //判断题目选项做出对应的动作
      showMore (chioce,index) {
        //存
        localStorage.setItem(1,this.allQuestion.objectName);
        this.chioceIndex = index;
        if (chioce.itemSeq == 4) {
          this.onShow=true;
        }else if(chioce.itemSeq == 5){
          this.show=true;
        }else{
          this.onNext();
        }
      },
      //选项选中后的选择状态
      onActive (chioce) {
        this.chioceActive = chioce.itemDesc;
        setTimeout(()=>this.chioceActive = '',300);
      },
      //不了解提示
      onHide () {
        this.show = false;
        this.onNext();
      },
      //不满意原因
      unsatisfy (){
        if (this.unsatisfyContent.length<20) {
          alert("您输入20字以上");
        }else{
          this.$ajax.post(this._url._url+'/index.php/Home/Question/disContent',{remark:this.unsatisfyContent+'|'+this.allQuestion.remark,quesID:this.allQuestion.ID}).then(response =>{
            if (response.data.status==1) {
              this.onShow=false;
              this.onNext();
              this.unsatisfyContent = '';
            }
          }).catch(error=> {
            console.log(error);
          }) 
        }
      },
      //底部题目改变
      change (item) {
        this.$ajax.post(this._url._url+'/index.php/Home/Question/requestQs',{indexSeq:item.indexSeq,objID:this.obj.objID,refeStyle:this.obj.refeStyle}).then( response=> {
          if (response.data.status==1) {
            this.allQuestion = response.data.data;
            this.showQues=!this.showQues; 
          }else{
            alert('请先做第'+response.data.data+"题");
          }
        }).catch( error=> {
          console.log(error);
        })
      },
      //获取下一题
      onNext (){
        this.$ajax.post(this._url._url+'/index.php/Home/Question/saveQs',{quesID:this.allQuestion.ID,itemSeq:this.chioceIndex+1,objID:this.obj.objID}).then( response=> {
          if (response.data.status==1) {
            this.allQuestion = response.data.data;
          }else if(response.data.status==2){
            this.$router.push("/suggest");
          }else{
          }
        }).catch( error=> {
          console.log(error);
        })      
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './ingredient.styl'
  @import '../../common/css/public.styl'
</style>