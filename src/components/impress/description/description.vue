<template>
  <div class="descript">
    <p>为认真贯彻党的十八大和十八届三中、四中、五中、六中全会精神，全面落实习近平总书记系列重要讲话特别是视察江苏重要讲话精神，切实增强践行“两学一做”学习教育的思想自觉和行动自觉，确保广大党员干部严守党的政治纪律政治规矩，增强组织观念、服从组织决定，知敬畏、明底线、守规矩，进一步查找和整改机关作风存在的问题，广泛征求人民群众的意见建议，区委、区政府决定，12月份在全区范围内开展2016年建邺区作风建设群众评议活动。</p>
    <div @click="confirm">确认说明内容，开始填写调查问卷</div>
  </div>
</template>
<script>
  export default {
    methods:{
      confirm () {
        this.$router.push('/appraises');
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .descript
    padding:0 0.3rem
    box-sizing:border-box
    p
      line-height:0.6rem
      font-size:0.28rem
      color:#737070
      text-indent: 2em
    p:nth-child(1)
      padding-top:0.3rem
    div
      font-size:0.32rem
      width:5.6rem
      height:0.7rem
      line-height:0.7rem
      color:#fff
      background-color:#ff895d
      border-radius:10px
      margin:0 auto
      margin-top:1rem
      text-align:center
</style>