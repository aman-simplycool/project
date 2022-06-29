const router = require("express").Router();
const schema = require('../model/schema')
const bcrypt = require("bcrypt");
/*
->adding a user need basic details like
1->name
2->email
3->password
*/
router.post("/addUser", async(req, res) => {            //add user is route for adding some new client
  try {
    const { name, email,password } = req.body;        //name email and password is being stored 

    if (!name || !email || !password) {               //if any of 3 detail is missing show error
      return res.status(400).send("fill all four details properly");
    }

    const data = await schema.findOne({ email});     //check whether this user has already been registered earlier or not

    if (data) {                                           // if person already exists show error
      return res.status(400).send("person already registered");
    }
    const hashedpassword =await bcrypt.hash(password,10);  //password must be in hashed form for security reason 
     console.log(hashedpassword);
     req.body.password=hashedpassword
    const user = new schema(req.body);                    //create an object of user data    
    await user.save();                                    // save that profile object now
    console.log(user);
    return res.status(200).json({ msg: "sucessful registration" }); //give sucess response
  }
  catch (err) {                                           // if some error occurs show it and send 
    console.log(err);
    return res.status(401).json(err);
  }
});

//adding user route ends
//delteing user route starts
/*
deleting a user requires only 
-> name and email of user
*/
router.post('/deleteUser', async (req, res) => {
  const { name, email } = req.body;                      //just check name and email existss or not
  if (!name || !email) {
    console.log("all required details not found");
    return res.status(404).json({ "msg": "required details not found" })
  }
  schema.deleteOne({ email: email }).then(() => {        // call delteOne function provided by mongoose and pass the email                                                     
    console.log("user deleted sucessfully");             // if promise is fulfiled then show success message   
    return res.status(200).json({ "msg": "profile delted sucessfully" })
  }).catch((err) => {                                   // if some error occurs then show the error message
    console.log(err);                                   //return error 
    return res.status(400).json(err);
  })
}) 
module.exports=router                                     //export the router file