const mongoose=require("mongoose")
const db=process.env.DB;     //DB is the environment variable in .env file (for security purposes)
mongoose.connect(db).then(   //connection is set up to the mongoose database now
console.log("connection successful")
).catch((err)=>{
console.log(err);
})