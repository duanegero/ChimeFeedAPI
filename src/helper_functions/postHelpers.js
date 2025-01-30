const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//defining async function to use in app, with passed in variables
const makeNewFriendship = async (userId, selectedUserId) => {
  const user1 = Math.min(userId, selectedUserId);
  const user2 = Math.max(userId, selectedUserId);

  //creating a variable to handle query to database

  const newFriendship = await prisma.friendships.create({
    data: {
      user_id1: user1,
      user_id2: user2,
    },
  });

  // //return result to use in app
  return newFriendship;
};

//defining async function to use in app, with passed in variables
const makeNewPost = async (userId, content) => {
  //creating a variable to handle query to database
  const newPost = await prisma.posts.create({
    data: {
      user_id: userId,
      content: content,
    },
  });

  //return result to use in app
  return newPost;
};

//defining async function to use in app, with passed in variables
const makeNewUser = async (username, password, firstname, lastname, age) => {
  //creating a variable to handle query to database

  const ageInt = parseInt(age, 10);

  const newUser = await prisma.users.create({
    data: {
      username: username,
      password: password,
      first_name: firstname,
      last_name: lastname,
      age: ageInt,
    },
  });

  //return result to use in app
  return newUser;
};

const makeNewPostLike = async (userId, postId) => {
  const userIdInt = parseInt(userId, 10);
  const postIdInt = parseInt(postId, 10);
  const newPostLike = await prisma.post_likes.create({
    data: {
      user_id: userIdInt,
      post_id: postIdInt,
    },
  });

  return newPostLike;
};

const checkIfUserLikedPost = async (userId, postId) => {
  try {
    const userIdInt = parseInt(userId, 10);
    const postIdInt = parseInt(postId, 10);

    const existingLike = await prisma.post_likes.findFirst({
      where: {
        user_id: userIdInt,
        post_id: postIdInt,
      },
      select: {
        id: true,
      },
    });

    return existingLike ? true : false;
  } catch (error) {
    console.error("Error checking if user like the post", error.message);
    throw error;
  }
};

//export function to use else where
module.exports = {
  makeNewFriendship,
  makeNewPost,
  makeNewUser,
  makeNewPostLike,
  checkIfUserLikedPost,
};
