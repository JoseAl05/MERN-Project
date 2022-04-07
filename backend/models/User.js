const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:{unique:true}
    },
    password:{
        type:String,
        required:true,
    },
    tokenConfirm:{
        type:String,
        default:null
    },
    confirmAccount:{
        type:Boolean,
        default:false,
    }
});

module.exports = mongoose.model('User',userSchema);