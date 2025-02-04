const express = require("express"); //importing express from npm
const router = express.Router(); //creating a router variable to handle the route
const jwt = require("jsonwebtoken"); //importing jwt from npm
require("dotenv").config();

//importing helper function to use in app
const { checkCredentials } = require("../helper_functions/checkCredentials");

//get key from evn
const myKey = process.env.API_KEY;
//log for testing
console.log("API Key: ", myKey);

router.post("/", async (req, res) => {
  //getting username and password from body
  const { username, password } = req.body;

  //if no username or password return error
  if (!username || !password) {
    return res.status(401).json({ message: "Username and Password required" });
  }

  try {
    //create varible to handle query from helper function, pass in variable
    const checkUser = await checkCredentials(username, password);

    //if nothing found return invalid
    if (!checkUser) {
      return res.status(401).json({ message: "Invalid Username or Password" });
    }

    //assgin returned result to variable
    const userId = checkUser.id;
    console.log(userId);
    //create payload
    const payload = { userID: userId };

    //create toke with jwt, payload and key
    const token = jwt.sign(payload, myKey);

    //responsed with token, and user ID
    return res.json({ token, userId });
  } catch (error) {
    // Log the detailed error for debugging
    console.error("Error occurred during login:", error.message, error.stack);

    // Respond with a user-friendly message
    res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
      ...(process.env.NODE_ENV !== "production" && { error: error.message }), // Include error details in non-production environments
    });
  }
});

//export router and key to use else where
module.exports = router;
module.exports.myKey = myKey;
