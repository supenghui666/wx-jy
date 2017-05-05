<template>
  <div>
    <header>机关部门征求意见表</header>
    <div>
      <form>
        <ul class="suggestion_container">
          <li class="type">
            <label>部门名称:</label>
            <select class="select" v-model="selected">
              <template  v-for="(item, i) in departTypes">
                <option :value="item.objID" v-if="item.objID==selected" selected>{{item.objectName}}</option>
                <option :value="item.objID" v-else>{{item.objectName}}</option>
              </template>
            </select>
          </li>
          <li class="suggestion">
            <label>意见建设:</label>
            <textarea placeholder="请填写您的意见" v-model="suggest"></textarea>
          </li>
          <li class="type next">
            <label>部门名称:</label>
            <select class="select" v-model="selected1">
              <template  v-for="(item, i) in departTypes">
                <option :value="item.objID" v-if="item.objID==selected1" selected>{{item.objectName}}</option>
                <option :value="item.objID" v-else>{{item.objectName}}</option>
              </template>
            </select>
          </li>
          <li class="suggestion">
            <label>意见建设:</label>
            <textarea placeholder="请填写您的意见" v-model="suggest1"></textarea>
          </li>
          <li class="btn" @click="submit">完成</li>
        </ul>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    data (){
      return{
        departTypes:[],
        selected:'',
        selected1:'',
        suggest:'',
        suggest1:''
      }
    },
    created:function(){
      this.$ajax.get(this._url._url+'/index.php/Home/Question/objsugg').then( response=> {
        this.departTypes = response.data.dialog;
        let res = response.data.data;
        this.selected = res[0].objID;
        this.selected1 = res[1].objID;
        this.suggest = res[0].scenName;
        this.suggest1 = res[1].scenName;
      }).catch( error=> {
        console.log(error);
      });
    },
    methods:{
      submit(){
        if (this.selected==this.selected1) {
          alert('请选择不同的部门填写意见');
          return false;
        }
        this.$ajax.post(this._url._url+'/index.php/Home/Question/objsugg',{objsugg:[{objID:this.selected,objectName:'',scenName:this.suggest},{objID:this.selected1,objectName:'',scenName:this.suggest1}]}).then( response=> {
          if (response.data.status==1) {
            this.$router.push('redPackets');
          }
        }).catch( error=> {
          console.log('请您检查您的网络重试');
        });
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import './consultations.styl'
</style>