//import prisma client to connect to data base
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//defining async function to use in app, with passed in variables
const deleteUser = async (userId) => {
  //defining a prisma method
  const userToDelele = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  //if nothing found return error
  if (!userToDelele) {
    throw new Error("User not found");
  }

  //Delete related frinedships
  await prisma.friendships.deleteMany({
    where: {
      OR: [{ user_id1: userId }, { user_id2: userId }],
    },
  });

  // Delete the related post_likes records first
  await prisma.post_likes.deleteMany({
    where: {
      user_id: userId, // Delete all likes by the user
    },
  });

  // Delete the related user
  await prisma.users.delete({
    where: {
      id: userId,
    },
  });

  //return to use in app
  return userToDelele;
};

//defining async function to use in app, with passed in variables
const deletePost = async (postId) => {
  //creating a variable to handle query to database
  const postToDelete = await prisma.posts.delete({
    where: {
      id: postId,
    },
  });

  //return to use in app
  return postToDelete;
};

//defining async function to use in app, with passed in variables
const deleteFriendship = async (user_Id1, user_Id2) => {
  //making input a int to use in prsima
  const user1 = parseInt(user_Id1, 10);
  const user2 = parseInt(user_Id2, 10);

  //defining a prisma method to delete frinedship
  const friendshipToDelete = await prisma.friendships.deleteMany({
    where: {
      OR: [
        { user_id1: user1, user_id2: user2 },
        { user_id1: user2, user_id2: user1 },
      ],
    },
  });

  //return result to use in app
  return friendshipToDelete;
};

//export function to use else where
module.exports = { deleteUser, deletePost, deleteFriendship };
