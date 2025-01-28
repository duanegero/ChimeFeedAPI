const pool = require("../db"); //creating varible used to connect to database

//defining async function to use in app, with passed in variables
const getAllFrinedshipsById = async (userId) => {
  //creating a variable to handle query to database
  const query = `SELECT 
    CASE 
        WHEN f.user_id1 = $1 THEN u2.id
        WHEN f.user_id2 = $1 THEN u1.id
    END AS friend_id,
    CASE 
        WHEN f.user_id1 = $1 THEN u2.username
        WHEN f.user_id2 = $1 THEN u1.username
    END AS friend_username,
    f.created_at
FROM friendships f
JOIN users u1 ON f.user_id1 = u1.id
JOIN users u2 ON f.user_id2 = u2.id
WHERE f.user_id1 = $1 OR f.user_id2 = $1;`;

  //sending query to database, creating variable for results
  const result = await pool.query(query, [userId]);

  //return result to use in app
  return result;
};

//defining async function to use in app, with passed in variables
const getUserPosts = async (userId) => {
  //creating a variable to handle query to database
  const query = `SELECT * 
    FROM posts
    WHERE user_id = $1
    ORDER BY created_at DESC`;

  //sending query to database, creating variable for results
  const result = await pool.query(query, [userId]);

  //return result to use in app
  return result;
};

//defining async function to use in app, with passed in variables
const getUser = async (userId) => {
  //creating a variable to handle query to database
  const query = `SELECT * FROM users
    WHERE id = $1`;

  //sending query to database, creating variable for results
  const result = await pool.query(query, [userId]);

  //return result to use in app
  return result;
};

//defining async function to use in app, with passed in variables
const getUserFriendsPosts = async (userId) => {
  //creating a variable to handle query to database
  const query = `SELECT posts.id, posts.content, posts.created_at, users.username
    FROM posts
    JOIN users ON posts.user_id = users.id
    JOIN friendships f ON (f.user_id1 = posts.user_id AND f.user_id2 = $1)
                     OR (f.user_id2 = posts.user_id AND f.user_id1 = $1)
    WHERE f.user_id1 = $1 OR f.user_id2 = $1
    ORDER BY posts.created_at DESC;`;

  //sending query to database, creating variable for results
  const result = await pool.query(query, [userId]);

  //return result to use in app
  return result;
};

//defining async function to use in app, with passed in variables
const getAllNonFriends = async (userId) => {
  //creating a variable to handle query to database
  const query = `SELECT u.username, u.id
    FROM users u
    WHERE u.id != $1 
      AND u.id NOT IN (
        SELECT 
          CASE 
            WHEN f.user_id1 = $1 THEN f.user_id2
            WHEN f.user_id2 = $1 THEN f.user_id1
          END AS friend_id
        FROM friendships f
        WHERE f.user_id1 = $1 OR f.user_id2 = $1
  );`;

  //sending query to database, creating variable for results
  const result = await pool.query(query, [userId]);

  //return result to use in app
  return result;
};

const getPostLikes = async (postId) => {
  const query = ` SELECT 
      users.username, 
      post_likes.post_id, 
      post_likes.created_at 
    FROM 
      post_likes
    JOIN 
      users
    ON 
      post_likes.user_id = users.id
    WHERE 
      post_likes.post_id = $1;`;

  const result = await pool.query(query, [postId]);

  return result;
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
