<template>
  <div id="impress">
    <header>
      <h2>机关部门评价表(第{{allQuestion.objectGroup}}组)</h2>
      <h4>{{allQuestion.indexDesc}}</h4>
      <h5>{{allQuestion.objectName}}</h5>
    </header>
    <div> 
      <div class="chioces_container">
        <ul>
          <li v-for="(chioce, index) in allQuestion.survey_questionaryitem" @click="showMore(chioce,index),onActive(chioce)" :class="{active :chioceActive==chioce.itemDesc||chioce.itemValue==1}">{{chioce.itemDesc}}</li>
        </ul>
      </div>
      <transition name="fade">
        <div v-if="show" class="fixed">
          <div class="content" v-bind:class="{bounceInDown:show}">
            <h6>不了解介绍</h6>
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
    <div class="progress"><progress :value="allQuestion.indexSeq" :max="departTypes.length" /><span>{{Math.round(allQuestion.indexSeq/departTypes.length*100)+'%'}}</span></div>
    <footer class="footer">
      <div class="container" v-bind:class="{bcg: showQues}">
        <div class="show-type-container">
          <i class="show-all" @click="showQues=!showQues"></i>
          <div class="list">
            <span>{{allQuestion.indexSeq}}</span>
            <span>/</span>
            <span>{{departTypes.length}}</span>
          </div>
        </div>
        <transition>
          <ul v-if="showQues" class="list-type clearfix">
            <li v-for="(item, i) in departTypes" @click="change(item)">
              <span v-bind:class="{ active: allQuestion.objectName==item.objectName }">{{ item.objectName }}</span>
            </li>
          </ul>
        </transition>
      </div>
      <transition name="fade">
        <div @click="showQues=!showQues" v-if="showQues" class="mask"></div>
      </transition>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'impress',
  data (){
    return {
      allQuestion: {},
      departTypes:[],
      chioceIndex:'',
      onShow:false,
      show:false,
      chioceActive:'',
      refeType:'',
      typeIndex:'',
      showQues: false,
      unsatisfyContent:'',
      oldIndex:''
    }
  },
  created: function () {
    this.refeType = sessionStorage.getItem(3);
    this.oldIndex = sessionStorage.getItem(2);
    this.$ajax.post(this._url._url+'/index.php/Home/Question/requestQs',{refeStyle:this.refeType,objID:this.oldIndex,key:1}).then( response=> {
      this.allQuestion = response.data.data;
      this.departTypes = response.data.dialog;
    }).catch( error=> {
      console.log(error);
    });
  },
  methods:{
    //判断题目选项做出对应的动作
    showMore (chioce,index) {
      //存
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
      setTimeout(()=> this.chioceActive = '',300);
    },
    //不了解提示
    onHide () {
      this.show = false;
      this.onNext();
    },
    //不了解原因
    unsatisfy (){
      if (this.unsatisfyContent.length<20) {
        alert("您输入20字以上");
      }else{
        this.$ajax.post(this._url._url+'/index.php/Home/Question/disContent',{remark:this.unsatisfyContent+'|'+this.allQuestion.remark,quesID:this.allQuestion.ID}).then(response =>{
          if (response.data.status==1) {
            this.onShow=false;
            this.onNext();
          }
        }).catch(error=> {
          console.log(error);
        }) 
      }
    },
    //底部题目改变
    change (item) {
      this.$ajax.post(this._url._url+'/index.php/Home/Question/requestQs',{objID:item.objID,refeStyle:this.refeType}).then( response=> {
        if (response.data.status==1) {
          this.allQuestion = response.data.data;
          this.showQues=!this.showQues;
        }else{
          alert("请先做"+response.data.data+"题目");
        }
      }).catch( error=> {
        console.log(error);
      })
    },
    //获取下一题
    onNext (index){
      this.$ajax.post(this._url._url+'/index.php/Home/Question/saveQs',{quesID:this.allQuestion.ID,itemSeq:this.chioceIndex+1}).then( response=> {
        if (response.data.status==1) {
          this.allQuestion = response.data.data;
        }else if(response.data.status==2){
          this.$router.push("/consultations");
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
@import './impress.styl'
@import '../../common/css/public.styl'
</style>
