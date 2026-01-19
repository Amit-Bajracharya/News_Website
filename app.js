const express = require("express");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config()

const user_router = require("./routes/userRoutes.js");
const admin_router = require("./routes/adminRouter.js");
const message_router = require('./routes/messageRouter.js')
const news_router= require('./routes/news_router.js')


//TO ENCODE JSON FILES
app.use(express.json());

//TO GET DATA (FORM FORMAT)
app.use(express.urlencoded({ extended: true }));

//SERVE STATIC FILES (HTML, CSS, JS)
app.use(express.static('public'));

//ROUTER FOR USER HANDLING
app.use("/users/api", user_router);

//ROUTER FOR ADMIN HANDLING
app.use("/admin/api", admin_router);

app.use('/news/api', news_router)

//ROUTER FOR MESSAGE HANDLING
app.use("/message/api", message_router);

// Health check endpoint for Docker
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Homepage is served from public/index.html
mongoose
  .connect(
    process.env.DATABASE_URL
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
