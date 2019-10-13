<!-- src/componets/goods/GoodList.vue-->
<template>
  <!-- 外层父元素-->
  <div class="app-goodlist">
    <!-- 商品项目-->
     <div class="goods-item" v-for="item in list" :key="item.lid">
       <img  :src="'http://127.0.0.1:3000/'+item.md" />
       <h4>{{item.title}}</h4>
       <div class="info">
          <span class="now">{{item.price}}</span>  

       </div>
       <div class="sell">
         <span>热卖中</span>
       </div>
     </div> <!-- 商品项-->
     <mt-button type="primary" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
  export default {
    data(){
      return {pno:0,pageSize:4,list:[]}
    },
    created() {
      this.getMore();
    },
    methods:{
      getMore(){
        this.pno++;
        var url = "http://127.0.0.1:3000";
        url+="/products?pno="+this.pno
        url+="&pageSize="+this.pageSize;
        this.axios.get(url).then(result=>{
          var rows = this.list.concat(result.data.data);
          this.list = rows;
        })
      }
    }
  }
</script>
<style>
/*外层父元素*/
.app-goodlist{
  display:flex;   /*弹性布局*/
  flex-wrap:wrap; /*子元素换行*/
  justify-content:space-between;/*两端对齐*/
  padding:4px;
}
/*商品项*/
.app-goodlist .goods-item{
  width:49%;   /*商品项宽度*/
  border:1px solid #ccc;/*边框*/
  box-shadow:0 0 8px #ccc;/*阴影*/
  margin:4px 0;
  padding:2px;
  display:flex;/*子元素弹性布局*/
  flex-direction:column;/*排列方式:垂直*/
  min-height:230px;
  justify-content:space-between;
}
.app-goodlist .goods-item img{
  width:100%;
}
.app-goodlist .goods-item h4{
  font-size:18px;
} /**/
.app-goodlist .goods-item .now{
  color:red;
  font-size:16px;
  font-weight:bold
}
</style>
