<template>
  <div class="app-login">
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
       <form>
         用户名<input type="text" name="uname" v-model="uname"/>
         密码  <input type="password" name="upwd" v-model="upwd"/>
         <input type="button" value="登录" @click="butLogin" />
       </form>			
					</div>
				</div>
			</div>
  </div>
</template>
<script>
  //单独引入 Toast
  import {Toast} from "mint-ui"
  export default {
    data(){
      return {uname:"",upwd:""}
    },
    methods:{
      butLogin(){
        //console.log(123);
        //0:为button按钮绑定点击事件
        //1:获取用户输入用户名和密码
        var u = this.uname;
        var p = this.upwd;
        //console.log(u+"-"+p);
        //2:验证不能为空
        var reg = /^[a-z0-9]{3,12}$/i;
        if(!reg.test(u)){
           Toast("用户名格式不正确，请检查");
           return;
        }
        //3:发送ajax请求
        var url = "http://127.0.0.1:3000/";
        url+="login?uname="+u+"&upwd="+p;
        this.axios.get(url).then(result=>{
          if(result.data.code==1){
            this.$router.push("/Home")
          }else{
            Toast("用户名或密码有误");
          }
        })
        //4:失败 显示提示框
        //5:成功 跳转home
      }
    }
  }
</script>
<style>
</style>