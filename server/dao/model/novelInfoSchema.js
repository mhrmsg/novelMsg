const mongoose =require('mongoose');

const novelInfoModel=new mongoose.Schema({
        'book_url':String,
        'book_id':String,
        'image':String,
        'title':String,
        'author':String,
        'sub-type':String,
        'status':String,
        'intro':String,
        'bookDetail': mongoose.Schema.Types.Mixed
        }
)

novelInfoModel.set('collection','novelInfo')

module.exports=mongoose.model('novelInfoModel',novelInfoModel)


