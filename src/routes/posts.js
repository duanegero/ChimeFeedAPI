//requiring express and setting router variable
const express = require("express");
const router = express.Router();

//importing helper functions to use in app
const { makeNewPost } = require("../helper_functions/postHelpers");
const {
  getUserPosts,
  getUserFriendsPosts,
} = require("../helper_functions/getHelpers");
const { deletePost } = require("../helper_functions/deleteHelpers");
const { updatePost } = require("../helper_functions/putHelpers");

router.post("/", async (req, res) => {
  //getting data from request body
  const { userId, content } = req.body;

  //if no data in request body return error status, json
  if (!userId || !content) {
    return res.status(400).json({ message: "User ID and Content required." });
  }

  try {
    //create varible to handle query from helper function, pass in variable
    const newPost = await makeNewPost(userId, content);

    //vaiable to handle results
    // const newPost = result.rows[0];

    //if nothing found return message
    if (!newPost) {
      return res.status(500).json({ message: "Failed to make new post." });
    }

    //return ok status and json results
    res.status(201).json({ message: "Successful new post", newPost });
  } catch (error) {
    //log detailed error for debugging
    console.error(
      "Error occurred while making new post",
      error.message,
      error.stack
    );

    //return error status and json message
    res.status(500).json({
      message:
        "An error occurred while making new post. Please try again later.",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  //parsing ID from URL
  const userId = parseInt(req.params.id);

  try {
    //create varible to handle query from helper function, pass in variable
    const result = await getUserPosts(userId);

    //return success status
    res.status(200).json(result);
  } catch (error) {
    //log detailed error for debugging
    console.error(
      "Error occurred while fetching user posts",
      error.message,
      error.stack
    );

    //return error status and json message
    res.status(500).json({
      message: "An error occurred while fetching user posts, Please try again.",
      error: error.message,
    });
  }
});

router.get("/:id/friends-posts", async (req, res) => {
  //parsing ID from URL
  const userId = parseInt(req.params.id);

  try {
    //create varible to handle query from helper function, pass in variable
    const posts = await getUserFriendsPosts(userId);

    //if nothing found return message
    if (!posts) {
      return res
        .status(500)
        .json({ message: "Unable to fetch frineds posts." });
    }

    //return ok status and json results
    res.status(200).json(posts);
  } catch (error) {
    //log detailed error for debugging
    console.error(
      "Error occurred while fetching user friends posts",
      error.message,
      error.stack
    );

    //return error status and json message
    res.status(500).json({
      message:
        "An error occurred while fetching user friends posts, Please try again.",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  //parsing ID from URL
  const userId = parseInt(req.params.id);

  //getting data from request body
  const { content } = req.body;

  //if no data in request body return error status
  if (!content) {
    return res.status(400).json({ message: "Content is required." });
  }

  try {
    //create varible to handle query from helper function, pass in variable
    const updatedPost = await updatePost(content, userId);

    //if nothing found return message
    if (!updatedPost) {
      return res.status(500).json({ message: "Failed to update post." });
    }

    //return ok status and json results
    res.status(200).json({ message: "Updated post.", updatedPost });
  } catch (error) {
    //log detailed error for debugging
    console.error(
      "Error occurred while updating post",
      error.message,
      error.stack
    );

    //return error status and json message
    res.status(500).json({
      message: "An error occurred while updating post. Please try again later.",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  //parsing ID from URL
  const postId = parseInt(req.params.id);

  try {
    //create varible to handle query from helper function, pass in variable
    const postToDelete = await deletePost(postId);

    //respond success message and status
    res
      .status(200)
      .json({ message: "Post deleted successfully.", postToDelete });
  } catch (error) {
    //log detailed error for debugging
    console.error(
      "Error occurred while deleting post.",
      error.message,
      error.stack
    );

    //return error status and json message
    res.status(500).json({
      message: "An error occurred while deleting post. Please try again later.",
      error: error.message,
    });
  }
});

//export router to use else where
module.exports = router;
