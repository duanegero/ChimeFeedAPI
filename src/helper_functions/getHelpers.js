//import prisma client to connect to data base
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//defining async function to use in app, with passed in variables
const getAllFrinedshipsById = async (userId) => {
  //creating a variable to handle prisma method to database
  const friendships = await prisma.friendships.findMany({
    where: {
      OR: [
        { user_id1: userId }, // User is `user_id1`
        { user_id2: userId }, // User is `user_id2`
      ],
    },
    include: {
      users_friendships_user_id1Tousers: {
        // Relation to `user_id1`
        select: {
          id: true,
          username: true,
        },
      },
      users_friendships_user_id2Tousers: {
        // Relation to `user_id2`
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  const friends = friendships.map((friendship) => {
    const isUser1 = friendship.user_id1 === userId;

    return {
      friend_id: isUser1
        ? friendship.users_friendships_user_id2Tousers.id
        : friendship.users_friendships_user_id1Tousers.id,
      friend_username: isUser1
        ? friendship.users_friendships_user_id2Tousers.username
        : friendship.users_friendships_user_id1Tousers.username,
      created_at: friendship.created_at,
    };
  });

  //return results to use in app
  return friends;
};

//defining async function to use in app, with passed in variables
const getUserPosts = async (userId) => {
  //creating a variable to handle prisma method to database
  const posts = await prisma.posts.findMany({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
  });

  //return results to use in app
  return posts;
};

//defining async function to use in app, with passed in variables
const getUser = async (userId) => {
  //creating a variable to handle prisma method to database
  const user = await prisma.users.findUnique({
    where: { id: Number(userId) },
  });

  //return results to use in app
  return user;
};

//defining async function to use in app, with passed in variables
const getUserFriendsPosts = async (userId) => {
  //creating a variable to handle prisma method to database
  const posts = await prisma.posts.findMany({
    where: {
      OR: [
        {
          users: {
            friendships_friendships_user_id1Tousers: {
              some: { user_id2: userId },
            },
          },
        }, // User is user_id1 in friendship
        {
          users: {
            friendships_friendships_user_id2Tousers: {
              some: { user_id1: userId },
            },
          },
        }, // User is user_id2 in friendship
      ],
    },
    include: {
      users: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  //return result to use in app
  return posts;
};

//defining async function to use in app, with passed in variables
const getAllNonFriends = async (userId) => {
  //creating a variable to handle prisma method to database
  const users = await prisma.users.findMany({
    where: {
      NOT: { id: userId }, // Exclude the user with the given `userId`
      AND: {
        NOT: {
          friendships_friendships_user_id1Tousers: {
            some: { user_id2: userId }, // Exclude friends where `user_id2` is the provided `userId`
          },
        },
        NOT: {
          friendships_friendships_user_id2Tousers: {
            some: { user_id1: userId }, // Exclude friends where `user_id1` is the provided `userId`
          },
        },
      },
    },
    select: {
      id: true,
      username: true,
    },
  });

  //return results to use in app
  return users;
};

//defining async function to use in app, with passed in variables
const getPostLikes = async (postId) => {
  //creating a variable to handle prisma method to database
  const postLikes = await prisma.post_likes.findMany({
    where: {
      post_id: postId,
    },
    select: {
      created_at: true,
      post_id: true,
      users: {
        select: {
          username: true,
        },
      },
    },
  });

  //return results to use in app
  return postLikes.map((like) => ({
    username: like.users.username,
    post_id: like.post_id,
    created_at: like.created_at,
  }));
};

//export function to use else where
module.exports = {
  getAllFrinedshipsById,
  getUserPosts,
  getUser,
  getUserFriendsPosts,
  getAllNonFriends,
  getPostLikes,
};
