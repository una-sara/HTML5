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
//7:加载第三方模块 body-parser
//body-parser 针对post请求处理请求参数
//如果配置成功 req.body..
const bodyParser = require("body-parser");
//8:配置对特殊 json是否是自动转换 不转换
app.use(bodyParser.urlencoded({extended:false}))


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
//功能三:商品分页显示 
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
//功能四:获取一条新闻详细信息
app.get("/findNewsInfo",(req,res)=>{
  //1:获取参数
  var id = req.query.id;
  //2:创建正则表达式
  var reg = /^\d{1,}$/;
  //3:如果验证失败 输出错误信息{code:-1}
  if(!reg.test(id)){
   res.send({code:-1,msg:"新闻编号格式有误"});
   return;//函数停止运行
  }
  //4:创建sql
  var sql = " SELECT id,title,content,ctime";
      sql +=" ,img_url FROM xz_news";
      sql +=" WHERE id = ?";
  //5:发送sql语句
  pool.query(sql,[id],(err,result)=>{
     if(err)throw err;
     res.send({code:1,data:result});
  })
  //6:输出查询结果 输出{code:1}
})
//功能五:获取评论列表
app.get("/getComment",(req,res)=>{
  //1:参数 nid 新闻编号 pno 页码 pageSize 
  //页大小
  var nid = req.query.nid;
  var pno = req.query.pno;
  var pageSize = req.query.pageSize;
  //2:设置默认值 
  if(!pno){pno=1}
  if(!pageSize){pageSize=5}
  //3:sql语句
  var sql = " SELECT id,content,ctime,nid";
      sql +=" FROM xz_comment";
      sql +=" WHERE nid = ?";
      sql +=" LIMIT ?,?";
  //4:offset 行偏移量    
  var offset = (pno-1)*pageSize;
  //5:页大小造型
  pageSize = parseInt(pageSize);
  pool.query(sql,[nid,offset,pageSize],(err,result)=>{
      if(err)throw err;
      res.send({code:1,data:result});
  });
})
//功能六:发表评论
//1:用户post请求 /addcomment
app.post("/addcomment",(req,res)=>{
 //2:获取二个参数 nid content
 var nid = req.body.nid;        //新闻编号
 var content = req.body.content;//评论内容
 //3:创建sql语句
 var sql = "INSERT INTO xz_comment VALUES";
     sql+="(null,?,now(),?)";
 //4:发送sql语句并且返回返回结果
 pool.query(sql,[content,nid],(err,result)=>{
    if(err)throw err;
    //判断执行insert语句影响行数
    if(result.affectedRows>0){
      res.send({code:1,msg:"评论发表成功"});
    }else{
      res.send({code:-1,msg:"评论发表失败"});
    }
 })
 //5:判断 评论成功 评论失败
});
//6:加载body-parser模块 配置 写在 app.js 前面 

//功能七:获取商品详细信息
app.get("/findProduct",(req,res)=>{
  //1:参数 pid
  var pid = req.query.pid;
  //2:sql  SELECT lname,price FROM xz_laptop WHERE //lid=?
  var sql =" SELECT lname,price FROM xz_laptop";
      sql+=" WHERE lid = ?";
  //3:json {code:1,data:[]}
  pool.query(sql,[pid],(err,result)=>{
     if(err)throw err;
     res.send({code:1,data:result});
  })
});

//功能八:用户登录
app.get("/login",(req,res)=>{
 //参数
 var uname = req.query.uname;
 var upwd = req.query.upwd;
 //sql
 var sql = " SELECT id FROM xz_login";
      sql+=" WHERE uname = ? AND upwd = md5(?)";
 pool.query(sql,[uname,upwd],(err,result)=>{
    if(err)throw err;  
    if(result.length==0){
      res.send({code:-1,msg:"用户名或密码有误"});
    }else{
      //将用户登录凭证保存在服务器端 session对象中
      res.send({code:1,msg:"登录成功"});
    }
 });
})

//功能九:将商品添加至购物车
app.get("/addcart",(req,res)=>{
  //1:参数 pid count uid price
  var pid = parseInt(req.query.pid);
  var count = 1;
  var uid = parseInt(req.query.uid);
  var price = parseInt(req.query.price);
  var sql =" SELECT id FROM xz_cart";
      sql+=" WHERE uid = ? AND pid = ?";
  pool.query(sql,[uid,pid],(err,result)=>{
    if(err)throw err; 
    if(result.length==0){
     var sql = ` INSERT INTO xz_cart`;
     sql+=` VALUES(null,1,${price},${pid},${uid})`;
    }else{
      var sql = ` UPDATE xz_cart`;
      sql+=` SET count=count+1 WHERE pid=${pid}`;
      sql+=` AND uid = ${uid}`;
    }
    pool.query(sql,(err,result)=>{
      if(err)throw err;
      if(result.affectedRows > 0){
        res.send({code:1,msg:"添加成功"});
      }else{
        res.send({code:-1,msg:"添加失败"});
      }
    })
  })
  //5:JSON
});

//功能十:购物车列表
app.get("/cartlist",(req,res)=>{
 //参数 uid   
 var uid = req.query.uid;
 //sql  多表查询
 var sql = " SELECT c.id,c.count,c.price,";
 sql+=" c.uid,c.pid,l.lname";
 sql+=" FROM xz_cart c,xz_laptop l";
 sql+=" WHERE l.lid = c.pid";
 sql+=" AND c.uid = ?";
 pool.query(sql,[uid],(err,result)=>{
   if(err)throw err;
   res.send({code:1,data:result})
 })
});
