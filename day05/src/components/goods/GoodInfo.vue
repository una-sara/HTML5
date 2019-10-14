<template>
  <div class="app-goodinfo">
    <!-- 轮播图   -->
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <!--调用子组件-->
						<swiper-box :list="rows"></swiper-box>
					</div>
				</div>
			</div>    
    <!-- 商品信息 -->
			<div class="mui-card">
				<div class="mui-card-header">
           {{info.lname}}
        </div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>
               销售价:{{info.price}}
            </p>
            购买数量:
			<div class="mui-numbox">
					<button class="mui-btn mui-btn-numbox-minus" type="button" @click="goodSub">-</button>
					<input class="mui-input-numbox" type="number" value="1" v-model="val"/>
					<button class="mui-btn mui-btn-numbox-plus" type="button" @click="goodAdd">+</button>
				</div>
					</div>
				</div>
				<div class="mui-card-footer">
            <mt-button type="danger" size="small">加入购物车</mt-button>
        </div>
			</div>
     
    <!-- 商品参数 -->
  </div>
</template>
<script>
  //1:引入子组件  swiperBox.vue
  import swiperBox from "../sub/swiperBox.vue"
  export default {
    data(){
      return {
        rows:[], //创建数组保存子组件显示数据
        info:{}, //创建对象保存商品信息(lname,price)
        pid:this.$route.query.pid,
        val:1
      }
    },
    created() {
      this.getImages();
      this.findGoodInfo();
    },
    methods:{
      goodAdd(){
        this.val++;
      },
      goodSub(){
        if(this.val > 1){
          this.val--;
        }
      },
      findGoodInfo(){
          var url = "http://127.0.0.1:3000";
          url+="/findProduct?pid="+this.pid;
          this.axios.get(url).then(result=>{
            this.info=result.data.data[0];
            //console.log(this.info);
          });

      },
      getImages(){
         var url = "http://127.0.0.1:3000/imageList";
         this.axios.get(url).then(result=>{
           //console.log(result);
           this.rows = result.data;
         })
      }
    },
    //2:注册子组件
    components:{
      "swiper-box":swiperBox
    }
  }
  //        练习:为+绑定点击事件  数量加一
  //             为-绑定点击事件  数量减一
</script>
<style>
</style>