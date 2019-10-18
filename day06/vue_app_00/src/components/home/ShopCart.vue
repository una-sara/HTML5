<template>
  <div class="app-cart">
    <div class="mui-card">
				<div class="mui-card-header">
           <h3>购物车列表</h3>
        </div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" />
						<div class="mui-media-body">
							<p class='mui-ellipsis'>
                <!-- 购物车中商品项目 start-->
                <input type="checkbox" />
							  华为手机 p21
                3999.99
                <button>删除</button> 
                <!-- 购物车中商品项目 end-->   
              </p>
						</div>
					</a>
				</li>
        </ul> 
						
 

            

					</div>
				</div>
				<div class="mui-card-footer">
          小计:￥3.00
        </div>
			</div>
  </div>
</template>
<script>
  export default {
    data(){
      return {}
    }
  }
</script>
<style>
</style>