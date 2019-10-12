//app.js
//1:加载模块 express pool.js
const express = require("express");
const pool = require("./pool");
//2:创建服务器端对象
var app = express();
//3:监听 3000
app.listen(3000);
//4:指定静态目录  public 
app.use(express.static("public"));
//5:加载跨域访问模块
const cors = require("cors");
//6:配置跨域访问模块 那个域名跨域访问允许
//  脚手架8080允许
//origin      允许跨域访问域名列表
//credentials 跨域访问保存session id
app.use(cors({
  origin:["http://127.0.0.1:8080",
  "http://localhost:8080"],
  credentials:true
}));
//功能一:home 组件轮播图片  
app.get("/imageList",(req,res)=>{
   //1:将轮播图中所需图片 复制public/img
   //2:查询
   var list = [
     {id:1,img_url:"http://127.0.0.1:3000/img/banner1.png"},
     {id:2,img_url:"http://127.0.0.1:3000/img/banner2.png"},
     {id:3,img_url:"http://127.0.0.1:3000/img/banner3.png"},
     {id:4,img_url:"http://127.0.0.1:3000/img/banner4.png"},
   ];
   res.send(list); 
});

//功能二:获取新闻列表分页显示
//xz_news表 20 条数据 7行一页  三页
//1:请求参数  pno 页码 pageSize 页大小
//2:哪条sql
// SELECT id,title,img_url,ctime,point
// FROM xz_news
// LIMIT ?,?
//3:返回数据结果json
//  {code:1,data:[]} 
app.get("/newslist",(req,res)=>{
  //1:获取参数 pno pageSize
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //2:设置默认值  pno 1 pageSize 7
  if(!pno){
    pno = 1;
  }
  if(!pageSize){
    pageSize = 7;
  }
  //3:创sql语句 
  var sql = " SELECT id,title,img_url";
  sql +=" ,ctime,point";
  sql +=" FROM xz_news";
  sql +=" LIMIT ?,?";
  var ps = parseInt(pageSize);
  //(2-1)*7= 7
  var offset = (pno-1)*pageSize;
  pool.query(sql,[offset,ps],(err,result)=>{
     if(err)throw err;
     res.send({code:1,data:result});
  })
  //4:返回 
});

//功能二:商品分页显示 
app.get("/products",(req,res)=>{
  //1:参数 pno pageSize
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //2:允许使用默认值  1 7  15:15
  if(!pno){pno=1}
  if(!pageSize){pageSize=7}
  //3:sql
 var sql = " SELECT l.lid,l.title,";
 sql+=" l.price,p.md";
 sql+=" FROM xz_laptop l,xz_laptop_pic p";
 sql+=" WHERE l.lid = p.laptop_id";
 sql+=" GROUP BY l.lid";
 sql+=" LIMIT ?,?";
 //4:json 
 var offset = (pno-1)*pageSize;
 pageSize = parseInt(pageSize);
 pool.query(sql,[offset,pageSize],(err,result)=>{
   if(err)throw err;
   res.send({code:1,data:result});
 }) 
});

