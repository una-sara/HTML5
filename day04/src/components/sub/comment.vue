<!-- src/compoents/sub/comment.vue-->
<!-- 子组件不用配置访问路径-->
<template>
  <div class="app-comment">
    		<div class="mui-card">
				<div class="mui-card-header">
        </div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<textarea placeholder="请吐槽最多120个字" maxlength="120"></textarea>
            <mt-button size="large" type="primary">发表评论</mt-button>
					</div>
				</div>
				<div class="mui-card-footer">
            <div class="cmt-list">
              <div class="cmt-item" v-for="(item,i) in list" :key="item.id">
         <div>第{{i+1}}楼  发表时间:{{item.ctime | dateFilter}}</div>
         <div>{{item.content}}</div>
              </div>
            </div>
        </div>
			</div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        pno:0,
        pageSize:5,
        list:[]
      }
    },
    created(){
      this.getMore();
    },
    methods:{
      getMore(){ //17:40
         this.pno++;
         var url = "http://127.0.0.1:3000/";
         url+="getComment?nid=5";
         url+="&pno="+this.pno;
         url+="&pageSize="+this.pageSize;
         this.axios.get(url).then(result=>{
             var rows = this.list.concat(result.data.data);
             this.list = rows;
         });
      }
    }
  }
  //1:创建函数  getMore(); 
  //2:data     pno pageSize list
  //3:created() 
  //4:cmt-item 循环 nid=5  
</script>
<style>
</style>
