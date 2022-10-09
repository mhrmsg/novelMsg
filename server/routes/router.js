const express=require('express');
 //创建路由容器
 const  router = express.Router();
 const {commonResGet,commonInfoResGet,commonResPost,randomResGet}=require('../controller/index')


router.route('/all').get(commonResGet).post(commonResPost);;

router.route('/info').get(commonInfoResGet)

router.route('/random').get(randomResGet)


module.exports=router;
