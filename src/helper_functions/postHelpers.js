const pool = require("../db"); //creating varible used to connect to database

//defining async function to use in app, with passed in variables
const makeNewFriendship = async (userId, selectedUserId) => {
  //creating a variable to handle query to database
  const query = `INSERT INTO friendships (user_id1, user_id2)
    VALUES (LEAST($1::int, $2::int), GREATEST($1::int, $2::int))
    RETURNING *;`;

  //sending query to database, creating variable for results
  const result = await pool.query(query, [userId, selectedUserId]);

  //return result to use in app
  return result;
};

//defining async function to use in app, with passed in variables
const makeNewPost = async (userId, content) => {
  //creating a variable to handle query to database
  const query = `
      INSERT INTO posts (user_id, content)
      VALUES ($1, $2)
      RETURNING *;
    `;

  //sending query to database, creating variable for results
  const result = await pool.query(query, [userId, content]);

  //return result to use in app
  return result;
};

//defining async function to use in app, with passed in variables
const makeNewUser = async (username, password, firstname, lastname, age) => {
  //creating a variable to handle query to database
  const query = `INSERT INTO users (username, password, first_name, last_name, age)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`;

  //sending query to database, creating variable for results
  const result = await pool.query(query, [
    username,
    password,
    firstname,
    lastname,
    age,
  ]);

  //return result to use in app
  return result;
};

const makeNewPostLike = async (userId, postId) => {
  const query = `INSERT INTO post_likes(user_id, post_id)
  VALUES($1, $2)
  RETURNING *;`;

  const result = await pool.query(query, [userId, postId]);

  return result;
};

const checkIfUserLikedPost = async (userId, postId) => {
  try {
    const query = `SELECT 1 FROM post_likes WHERE user_id = $1 AND post_id = $2;`;

    const result = await pool.query(query, [userId, postId]);

    return result.rows.length > 0;
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
