const mongoose=require("mongoose")

//creating the mongoose schema
//required fields wil be
//name,email,password

const schema=new mongoose.Schema({       
 name:{                                
  type:String,
  required:true
 },
  email:{
  type:String
 },
 password:{
 type:String
 }   
})

//mongoose model created which will be further 
//exported to use in different files
const regData=new mongoose.model("regdata",schema)
module.exports=regData;