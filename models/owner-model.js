const mongoose=require('mongoose');

const ownerSchema=mongoose.Schema({
    fullname:{
        type:String,
        minlength:3,
        trim:true,

               },
    email:String,
    password:String,
    cart:{
        type:Array,
        default:[]
    },
    isAdmin:Boolean,
    products:{
        type:Array,
        default:[]
    },
    gst:Number,
    picture:String,

})
module.exports=mongoose.model("owner",ownerSchema);