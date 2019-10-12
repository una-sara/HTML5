<!--src/componets/home/NewsList.vue-->
<template>
  <div class="app-newslist">
		<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							  {{item.title}}
							<p class='mui-ellipsis'>
              <span>{{item.ctime | datetimeFilter}}</span>
              <span>点击{{item.point}}次</span>
              </p>
						</div>
					</a>
				</li>
     </ul>
  <mt-button type="primary" size="large" @click="getMore">加载更多</mt-button>   
  </div> 
</template>
<script>
  export default {
    data(){
       return {
         list:[],
         pno:1,     //当前页码
         pageSize:7 //页大小
         }
    },
    methods:{
     //加载更多 加载下一页数据 
     getMore(){
       //1:修改当前页码+1
       this.pno++;
       //2:发送请求get
       var url = "http://127.0.0.1:3000";
       url+="/newslist?pno="+this.pno;
       url+="&pageSize="+this.pageSize;
       //3:获取下一页数据保存 list
       this.axios.get(url).then(result=>{
          //3.1:拼接二个数组
          var rows = this.list.concat(result.data.data);
          //3.2:赋值list
          this.list = rows;
          //this.list = result.data.data;
       });
     },
     //mui查找 左面图片右面文字
     getnewsList(){
      var url = "http://127.0.0.1:3000/newslist";
      this.axios.get(url).then(result=>{
         ///console.log(result.data.data);
         this.list = result.data.data;
      })
     }
    },
    created() {
      this.getnewsList();
    },
  }  
</script>
<style>
  /*日期和点击次数两端对齐*/
  .app-newslist li .mui-ellipsis{
    display:flex;   /*弹性布局*/
    font-size:12px;
    color:#226aff;
    justify-content:space-between;/*两端对齐*/
  }
</style>