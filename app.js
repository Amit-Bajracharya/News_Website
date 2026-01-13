const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const user = require("./project_model/user_model.js");
const user_router = require('./routes/userRoutes.js')
app.use(express.json());
app.use(express.urlencoded());

//ROUTER FOR USER LOGIN
app.use( '/users/api', user_router)

app.get('/', (req, res)=>{
    app.send("This is homepage")
})
mongoose
  .connect(
    "mongodb+srv://amitdb:NmUicO0b3fiUAyzB@databaseapi.ltqn5l0.mongodb.net/?appName=databaseapi"
  )
  .then(() => {
    console.log("Connected to Database");
    app.listen(5000, () => {
      console.log("App is listening to server port 5000....");
    });
  })
  .catch((error) => {
    console.log("Unable to connect to database");
    console.log("Error:", error.message);
  });
