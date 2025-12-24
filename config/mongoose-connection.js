const mongoose=require('mongoose')
const dbger=require('debug')("development:mongoose");
const config=require("config")

mongoose
.connect(`${config.get("MONGODB_URI")}/backendproject`)
.then(function(){
    dbger("connected");
})
.catch(function(err){
    dbger(err)
})
module.exports=mongoose.connection;