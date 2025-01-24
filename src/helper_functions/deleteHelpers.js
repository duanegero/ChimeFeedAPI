const pool = require("../db"); //creating varible used to connect to database

//defining async function to use in app, with passed in variables
const deleteUser = async (userId) => {
  //creating a variable to handle query to database
  const query = `DELETE FROM users
    WHERE id = $1
    RETURNING *;`;

  //sending query to database, creating variable for results
  const result = await pool.query(query, [userId]);

  //return result to use in app
  return result;
};

//defining async function to use in app, with passed in variables
const deletePost = async (postId) => {
  //creating a variable to handle query to database
  const query = `DELETE FROM posts
    WHERE id = $1
    RETURNING *;`;

  //sending query to database, creating variable for results
  const result = await pool.query(query, [postId]);

  //return result to use in app
  return result;
};

//defining async function to use in app, with passed in variables
const deleteFriendship = async (user_id1, user_id2) => {
  //creating a variable to handle query to database
  const query = `DELETE FROM friendships
  WHERE 
  (user_id1 = $1 AND user_id2 = $2)
  OR
  (user_id1 = $2 AND user_id2 = $1)
  RETURNING *`;

  //sending query to database, creating variable for results
  const result = await pool.query(query, [user_id1, user_id2]);

  //return result to use in app
  return result;
};

//export function to use else where
module.exports = { deleteUser, deletePost, deleteFriendship };
