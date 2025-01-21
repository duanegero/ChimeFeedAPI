//requiring express and setting router variable
const express = require("express");
const router = express.Router();

//importing helper functions to use in app
const { getAllFrinedshipsById } = require("../helper_functions/getHelpers");
const { makeNewFriendship } = require("../helper_functions/postHelpers");
const { deleteFriendship } = require("../helper_functions/deleteHelpers");

router.get("/:id", async (req, res) => {
  //parsing ID from URL
  const userId = parseInt(req.params.id);

  try {
    //create varible to handle query from helper function, pass in variable
    const result = await getAllFrinedshipsById(userId);

    //vaiable to handle results
    const friendships = result.rows;

    //if nothing found return message
    if (!friendships) {
      return res.status(500).json({ message: "Unable to fetch friendships." });
    }

    //return ok status and json results
    res.status(200).json(result.rows);
  } catch (error) {
    //log detailed error for debugging
    console.error(
      "Error occurred while fetching friendships:",
      error.message,
      error.stack
    );

    //return error status and json message
    res.status(500).json({
      message:
        "An error occurred while fetching friendships. Please try again later.",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  //getting the data from the request body
  const { userId, selectedUserId } = req.body;

  //if all fields aren't completed return error status, and json
  if (!userId || !selectedUserId) {
    return res
      .status(400)
      .json({ message: "User ID and selected ID are required" });
  }

  try {
    //create varible to handle query from helper function, pass in variable
    const result = await makeNewFriendship(userId, selectedUserId);

    //vaiable to handle results
    const newFriendship = result.rows[0];

    //if nothing found return message
    if (!newFriendship) {
      return res.status(500).json({ message: "Failed to make new friendship" });
    }

    //return ok status and json results
    res.status(201).json({
      message: "Successful friendship",
      newFriendship: result.rows[0],
    });
  } catch (error) {
    // Log detailed error for debugging
    console.error(
      "Error occurred while making new friendship:",
      error.message,
      error.stack
    );

    //return error status and json message
    res.status(500).json({
      message:
        "An error occurred while making new friendship. Please try again later.",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  //parsing ID from URL
  const friendshipId = parseInt(req.params.id);

  try {
    //create varible to handle query from helper function, pass in variable
    const result = await deleteFriendship(friendshipId);

    //if nothing found return message
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Frinedship not found." });
    }

    //vaiable to handle results
    const deletedFriendship = result.rows[0];

    //return ok status and json results
    res.status(200).json({ message: "Friendship deleted.", deletedFriendship });
  } catch (error) {
    //log detailed error for debugging
    console.error(
      "Error occurred while deleting friendship.",
      error.message,
      error.stack
    );

    //return error status and json message
    res.status(500).json({
      message:
        "An error occurred while deleting friendship. Please try again later.",
      error: error.message,
    });
  }
});

module.exports = router;
