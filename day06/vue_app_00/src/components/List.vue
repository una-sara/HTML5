<template>
  <div class="app-list">
    <h3>数据列表</h3>
    <ul>
    <!-- 创建警告消息 -->
    <!-- 默认情况下 vue对数据排序操作 -->   <!-- vue 指定属性 key="item.id" -->   <!-- id 不能重复 -->  
      <li v-for="item in list" :key="item.id">
         {{item.id}}:{{item.name}}:{{item.age}}
      </li>
    </ul>
  </div>
</template>
<script>
   export default {
      data(){
        return {
          list:[
             {id:1,name:"tom",age:19},
             {id:2,name:"jerry",age:20},
             {id:3,name:"james",age:21}
            ]
        }      
      }
   }
</script>
<style>
</style>