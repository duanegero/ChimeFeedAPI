//requiring express and setting router variable
const express = require("express");
const router = express.Router();

//importing helper functions to use in app
const { makeNewUser } = require("../helper_functions/postHelpers");
const { updateUser } = require("../helper_functions/putHelpers");
const { deleteUser } = require("../helper_functions/deleteHelpers");
const { getUser } = require("../helper_functions/getHelpers");

router.get("/:id", async (req, res) => {
  //parsing ID from URL
  const userId = req.params.id;

  try {
    //create varible to handle query from helper function, pass in variable
    const user = await getUser(userId);

    //if nothing found return message
    if (!user) {
      return res.status(500).json({ message: "Unable to fetch user." });
    }

    //return ok status and json results
    res.status(200).json(user);
  } catch (error) {
    //log detailed error for debugging
    console.error(
      "Error occurred while fetching user:",
      error.message,
      error.stack
    );

    //return error status and json message
    res.status(500).json({
      message: "An error occurred while fetching user. Please try again later.",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  //getting the data from the request body
  const { username, password, firstname, lastname, age } = req.body;

  //if all fields aren't completed return error status, and json
  if (!username || !password || !firstname || !lastname || !age) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    //create varible to handle query from helper function, pass in variable
    const result = await makeNewUser(
      username,
      password,
      firstname,
      lastname,
      age
    );

    //vaiable to handle results
    const newUser = result.rows[0];

    //if nothing found return message
    if (!newUser) {
      return res.status(500).json({ message: "Failed to create new user." });
    }

    //return ok status and json results
    res
      .status(201)
      .json({ message: "New user created", newUser: result.rows[0] });
  } catch (error) {
    //log detailed error for debugging
    console.error(
      "Error occurred while making new user:",
      error.message,
      error.stack
    );

    //return error status and json message
    res.status(500).json({
      message:
        "An error occurred while making new user. Please try again later.",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  //parsing ID from URL
  const userId = parseInt(req.params.id);

  //getting the data from the request body
  const { username, password, firstname, lastname, age } = req.body;

  //if all fields aren't completed return error status, and json
  if (!username || !password || !firstname || !lastname || !age) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    //create varible to handle query from helper function, pass in variable
    const result = await updateUser(
      username,
      password,
      firstname,
      lastname,
      age,
      userId
    );

    //vaiable to handle results
    const updatedUserDetails = result.rows[0];

    //if nothing found return message
    if (!updatedUserDetails) {
      return res.status(500).json({ message: "Failed to update user." });
    }

    //return ok status and json results
    res
      .status(200)
      .json({ message: "Updated user.", updatedUserDetails: result.rows[0] });
  } catch (error) {
    //log detailed error for debugging
    console.error(
      "Error occurred while updating user",
      error.message,
      error.stack
    );

    //return error status and json message
    res.status(500).json({
      message: "An error occurred while updating user. Please try again later.",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  //parsing ID from URL
  const userId = parseInt(req.params.id);

  try {
    //create varible to handle query from helper function, pass in variable
    const result = await deleteUser(userId);

    //if nothing found return message
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    //vaiable to handle results
    const deletedUser = result.rows[0];
    //return ok status and json results
    res.status(200).json({ message: "User deleted.", deletedUser });
  } catch (error) {
    //log detailed error for debugging
    console.error(
      "Error occurred while deleting user.",
      error.message,
      error.stack
    );

    //return error status and json message
    res.status(500).json({
      message: "An error occurred while deleting user. Please try again later.",
      error: error.message,
    });
  }
});

module.exports = router;
