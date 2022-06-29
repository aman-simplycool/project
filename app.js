require("dotenv").config({path:"config/config.env"})
const express=require("express")
const app=express();
app.use(express.json());
//required connection files that are used for setting up link with mongoose
require("./connection/conn")

//we must parse incoming requrests in json format

app.use(require('./routes/routes'))

//either port no 4000 will run or port that is mentioned in env file

//setting up the port
const port=process.env.PORT||4000

//calling a function to test port has been set up or not
app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})