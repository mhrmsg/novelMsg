const novelInfoModel = require('../dao/model/novelInfoSchema')

exports.commonResGet=async (req,res,nex)=>{
    if(req.query){
        const page = req.query.page
        const pagesize = req.query.pagesize
        const start = ( page - 1  ) * pagesize
        let json=await novelInfoModel.find().skip(start).limit(pagesize);
        res.status(200).json({success:true,msg:'成功',data:json})
        return
    }
    let json=await novelInfoModel.find();
    res.status(200).json({success:true,msg:'成功',data:json})
}

exports.commonInfoResGet = async (req,res,nex)=>{
    let json=await novelInfoModel.count();
    res.status(200).json({success:true,msg:'成功',data:json})
}


exports.commonResPost=async (req,res,nex)=>{
    const params=await novelInfoModel.create(req.body);
    res.status(200).json({success:true,data:params,msg:'创建成功'})
}

exports.randomResGet = async ( req , res , nex ) =>{
    let json=await novelInfoModel.aggregate( [ { $sample: { size: 3 } } ] )
    res.status(200).json({success:true,msg:'成功',data:json})
}