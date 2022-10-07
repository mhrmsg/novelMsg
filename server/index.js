const express = require('express')
const dotenv = require('dotenv')
const router =  require('./routes/router')
const connectDB = require('./config/db')

//加载环境变量
dotenv.config({ 
    path:'.env'
})

//连结数据库
connectDB() 

const app=express();
const PORT=process.env.PORT||3000;

app.use(express.json())
app.use('/novel',router)


app.listen(PORT,console.log(`server running ${process.env.PORT}`))