const express=require("express")
const router = express.Router(); 
const userModel=require('../models/user')
const bcrypt=require("bcrypt")
const jwt =require("jsonwebtoken")
const {generateToken}=require("../utills/generateTokens")
const productModel=require("../models/prodect-model") 

module.exports.registerUser= async function(req,res){
  try{ 
    let {email,password,fullname}=req.body;
    let user=await userModel.findOne({email:email});
    if(user) return res.status(401).send("you already is registered")
      else{
    bcrypt.genSalt(10,function(err ,salt){
      bcrypt.hash(password,salt, async function(err,hash){
        if(err) return res.send(err.message);
      else {
         user= await userModel.create({
      email,
      password:hash,
      fullname,
  })
     let token=generateToken(user)
    res.cookie("token",token);
    res.render("shop")
      };

      })
    })
  }}
  catch(err){
  res.send(err.message);

  }
}

module.exports.loginUser= async function(req,res){
  try{ 
    let {email,password}=req.body;
    let user=await userModel.findOne({email:email});
    if(!user) return res.send("email or password incorrect")
   
      bcrypt.compare(password,user.password, async function(err,result){
        if(result){
          let token=generateToken(user);
          res.cookie("token",token)
           let products= await productModel.find();
             res.render("shop",{products})
        }
        else{
          return res.send("email or password incorrect")
        }
      })
}
  catch(err){
  res.send(err.message);

  }
}

module.exports.logout=function(req,res){
  res.cookie("token",);
  res.redirect("/")
}
