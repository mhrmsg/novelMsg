const express=require('express');
 //创建路由容器
 const  router = express.Router();
 const {commonResGet,commonResPost}=require('../controller/index')


 router.route('/all').get(commonResGet).post(commonResPost);;


module.exports=router;
