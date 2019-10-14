<!--src/componets/Exam01.vue-->
<template>
  <!-- 先创建一个根元素 div-->
  <div class="app-exam01">
    <h3>练习组件创建</h3>
    <h1 @click="jump1">跳转到新闻组件</h1>
    <!--添加 h1 跳转商品列表组件-->
    <h1 @click="jump2">跳转到商品列表组件</h1>
    <!-- 组件之间跳转 带参数-->
    <h1 @click="jump3">带参数跳转</h1>
  </div>
</template>
<script>
  export default {//组件默认导出对象 
     data(){
       return {}  //组件操作数据 
     },
     methods:{
      jump3(){this.$router.push("/NewsList?nid=6")},
      jump1(){this.$router.push("/NewsList")},
      jump2(){this.$router.push("/GoodsList")}
     }
  }
</script>
<style>
  .app-exam01{
     color:red;
     font-size:16px;    
  }
</style>