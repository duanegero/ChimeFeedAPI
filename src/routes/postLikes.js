//requiring express and setting router variable
const express = require("express");
const router = express.Router();

const {
  makeNewPostLike,
  checkIfUserLikedPost,
} = require("../helper_functions/postHelpers");

const { getPostLikes } = require("../helper_functions/getHelpers");

router.post("/", async (req, res) => {
  const { userId, postId } = req.body;

  if (!userId || !postId) {
    return res.status(400).json({ message: "User ID and Post ID required." });
  }

  try {
    const checkForLike = await checkIfUserLikedPost(userId, postId);

    if (checkForLike) {
      return res.status(400).json({ message: "User already liked this post." });
    }

    const result = await makeNewPostLike(userId, postId);

    const newLike = result.rows[0];

    if (!newLike) {
      return res.status(500).json({ message: "Failed to make new like." });
    }

    res
      .status(201)
      .json({ message: "Seccessful new like", newLike: result.rows[0] });
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
  const postId = parseInt(req.params.id);

  try {
    const result = await getPostLikes(postId);

    const postLikes = result.rows;

    if (!postLikes) {
      return res.status(500).json({ message: "unable to fetch post likes." });
    }

    res.status(200).json(result.rows);
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
