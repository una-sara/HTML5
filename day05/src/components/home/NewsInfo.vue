<template>
  <div class="app-newsinfo">
     <!-- 当前新闻详细信息-->
		<div class="mui-card">
				<div class="mui-card-header mui-card-media" :style="'height:40vw;background-image:url('+info.img_url+')'"></div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>Posted on {{info.ctime | dateFilter}}</p>
						<p style="color: #333;"> 
                {{info.content}}
            </p>
					</div>
				</div>
				<div class="mui-card-footer">
					<a class="mui-card-link">Like</a>
					<a class="mui-card-link">Read more</a>
				</div>
			</div>
     <!-- 评论-->
     <comment-box></comment-box>
  </div>
</template>
<script>
  //1:引入子组件
  import comment from "../sub/comment.vue"
  //2:注册子组件
  //3:调用子组件
  export default {
    data(){
      return {
          info:{}
      }
    },
    created() {
      this.findNewsInfo();
    },
    methods:{
      findNewsInfo(){
       //1:获取参数
       var nid = this.$route.query.nid;
       console.log(nid);    
       //2:发送ajax 请求
       var url = "http://127.0.0.1:3000/";
       url+="findNewsInfo?id="+nid;
       this.axios.get(url).then(result=>{
         this.info = result.data.data[0];
       });
       //3:获取返回数据 显示  
      }
    },//methods end
    components:{
      "comment-box":comment
    }
  }//default end 

</script>
<style>
</style>