const mongoose = require('mongoose')
var Schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/profile-db-api',{
    useNewUrlParser:true,
    useCreateIndex:true
})
const Profile = new Schema({
    name : {
        type:String
    },
    bio : {
        type:String
    },
    linkedinlink : {
        type:String
    },
    githublink :{
        type:String
    },
    resume :{
        data: Buffer, 
        contentType: String
    }
})
module.exports = mongoose.model('profileschema',Profile)