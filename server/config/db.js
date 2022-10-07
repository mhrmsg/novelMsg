const mongoose=require('mongoose');
const connectDB=async()=>{
    mongoose.connect(
            "mongodb://localhost:27017/novel",
          err=>{
            if(err){
                console.log('----------------')
                console.log('数据库连接失败',err)
                console.log('----------------')
            }else{
             console.log('数据库连接成功')   
            }
    });
}

module.exports=connectDB
