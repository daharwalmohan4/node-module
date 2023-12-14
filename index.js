const express = require('express')
const mongoose = require('mongoose')
const userModel  = require('./models/usersModel');
const usersModel = require('./models/usersModel');

const app  = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = "mongodb+srv://mohan:mohan23@cluster0.z7b39hp.mongodb.net/mern"

// midlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// mongodb connection
mongoose
.connect(MONGO_URI)
.then(() => {
    console.log("MongDb Conected");
})
.catch((err)=>{
    console.log(err)
})

// api

    app.get("/" ,(req,res)=>{
        console.log("hello / GET");
        return res.send("This is your server")
    })

    app.post("./create-user" ,async(req, res) => {
        console.log("post request is working")
        console.log(req.body);
        return res.send("worling")

    })
    //api HTML form

app.get("/api/html", (req, res) => {
    return res.send(
      `
          <html>
          <body>
          <h1>This is form<h1/>
          <form action = "/api/form_submit" method="POST">
          <label for="name">Name</label>
          <input type="text" name="name"></input>
          <br/>
          <label for="email">Email</label>
          <input type="text" name="email"></input>
          <br/>
          <label for="password">Password</label>
          <input type="text" name="password"></input>
          <br/>
          <button type='submit'>Submit</button>
          </form>
          <body/>
          <html/>
          `
    );
  });
  
  app.post("/api/form_submit", async (req, res) => {
    const nameC = req.body.name;
    const emailC = req.body.email;
    const passwordC = req.body.password;
  
    const userObj = new usersModel({
      //schema : client
      name: nameC,
      email: emailC,
      password: passwordC,
    });
  
    try {
      const userDb = await userObj.save();
      console.log(userDb);
      return res.send({
        status: 201,
        message: "User creates successfully",
        data: userDb,
      });
    } catch (error) {
      return res.send({
        status: 500,
        message: "Database error",
        error: error,
      });
    }
  });



app.listen(8000, ()=>{
    console.log("server is running ")
})