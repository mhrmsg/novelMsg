const novelInfoModel = require('../dao/model/novelInfoSchema')

exports.commonResGet=async (req,res,nex)=>{
    let json=await novelInfoModel.find();
    res.status(200).json({success:true,msg:'成功',data:json})
}


exports.commonResPost=async (req,res,nex)=>{
    const params=await novelInfoModel.create(req.body);
    res.status(200).json({success:true,data:params,msg:'创建成功'})
}
