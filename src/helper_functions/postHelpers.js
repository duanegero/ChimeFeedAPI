const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//defining async function to use in app, with passed in variables
const makeNewFriendship = async (userId, selectedUserId) => {
  //finding the smaller number and assinging to user1
  const user1 = Math.min(userId, selectedUserId);
  const user2 = Math.max(userId, selectedUserId);

  //creating a variable to handle prisma method to database
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
  //converting id into an int
  const userIdInt = parseInt(userId, 10);

  //creating a variable to handle prisma method to database
  const newPost = await prisma.posts.create({
    data: {
      user_id: userIdInt,
      content: content,
    },
  });

  //return result to use in app
  return newPost;
};

//defining async function to use in app, with passed in variables
const makeNewUser = async (username, password, firstname, lastname, age) => {
  //converting the age into a int
  const ageInt = parseInt(age, 10);

  //creating a variable to handle prisma method to database
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

//defining async function to use in app, with passed in variables
const makeNewPostLike = async (userId, postId) => {
  //converting id's into a ints
  const userIdInt = parseInt(userId, 10);
  const postIdInt = parseInt(postId, 10);

  //creating a variable to handle prisma method to database
  const newPostLike = await prisma.post_likes.create({
    data: {
      user_id: userIdInt,
      post_id: postIdInt,
    },
  });

  //return results to use in app
  return newPostLike;
};

//defining async function to use in app, with passed in variables
const checkIfUserLikedPost = async (userId, postId) => {
  try {
    //converting id's into ints
    const userIdInt = parseInt(userId, 10);
    const postIdInt = parseInt(postId, 10);

    //creating a variable to handle prisma method to database
    const existingLike = await prisma.post_likes.findFirst({
      where: {
        user_id: userIdInt,
        post_id: postIdInt,
      },
      select: {
        id: true,
      },
    });

    //returning results to use in app
    return existingLike ? true : false;
  } catch (error) {
    //catach and log any errors
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
