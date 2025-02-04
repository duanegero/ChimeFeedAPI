//requiring express and setting router variable
const express = require("express");
const router = express.Router();

//import helper functions to use in app
const {
  makeNewPostLike,
  checkIfUserLikedPost,
} = require("../helper_functions/postHelpers");

const { getPostLikes } = require("../helper_functions/getHelpers");

router.post("/", async (req, res) => {
  //getting the IDs from the request body, assigning to variables
  const { userId, postId } = req.body;

  //if both IDs aren't in body return error
  if (!userId || !postId) {
    return res.status(400).json({ message: "User ID and Post ID required." });
  }

  try {
    //create a varible to handle helper function returns
    const checkForLike = await checkIfUserLikedPost(userId, postId);

    //if helper returns true alert user
    if (checkForLike) {
      return res.status(400).json({ message: "User already liked this post." });
    }

    //else create a varible to handle helper function returns
    const newLike = await makeNewPostLike(userId, postId);

    //if nothing return error status
    if (!newLike) {
      return res.status(500).json({ message: "Failed to make new like." });
    }

    //else return success message
    res.status(201).json({ message: "Seccessful new like", newLike });
  } catch (error) {
    //log detailed error for debugging
    console.error(
      "Error occurred while liking post.",
      error.message,
      error.stack
    );

    //return error status and json message
    res.status(500).json({
      message: "An error occurred while liking post. Please try again later.",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  //parse the ID from the URL
  const postId = parseInt(req.params.id);

  try {
    //create varible to handle helper function call
    const postLikes = await getPostLikes(postId);

    //if nothing returned return error message
    if (!postLikes) {
      return res.status(500).json({ message: "unable to fetch post likes." });
    }

    //else return results
    res.status(200).json(postLikes);
  } catch (error) {
    //log detailed error for debugging
    console.error(
      "Error occurred while fetching post likes",
      error.message,
      error.stack
    );

    //return error status and json message
    res.status(500).json({
      message: "An error occurred while fetching post likes, Please try again.",
      error: error.message,
    });
  }
});

//export router to use else where
module.exports = router;
