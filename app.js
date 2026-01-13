const express = require("express")
const app = express()
const mongoose = require("mongoose")



mongoose.connect("mongodb+srv://amitdb:NmUicO0b3fiUAyzB@databaseapi.ltqn5l0.mongodb.net/?appName=databaseapi")
.then(()=>{
    console.log("Connected to Database")
    app.listen(5000, () =>{
        console.log("App is listening to server port 5000....")
    })
}).catch(()=>{
    console.log("Unable to connect to database")
})