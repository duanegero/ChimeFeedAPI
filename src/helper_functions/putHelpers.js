const pool = require("../db"); //creating varible used to to connect to database

//defining async function to use in app, with passed in variables
const updateUser = async (
  username,
  password,
  firstname,
  lastname,
  age,
  userId
) => {
  //creating a variable to handle query to database
  const query = `UPDATE users
    SET username = $1, password = $2, first_name = $3, last_name = $4, age = $5
    WHERE id = $6
    RETURNING *;`;

  //sending query to database, creating variable for results
  const result = await pool.query(query, [
    username,
    password,
    firstname,
    lastname,
    age,
    userId,
  ]);

  //return result to use in app
  return result;
};

//defining async function to use in app, with passed in variables
const updatePost = async (content, userId) => {
  //creating a variable to handle query to database
  const query = `UPDATE posts
    SET content = $1,
    created_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *;`;

  //sending query to database, creating variable for results
  const result = await pool.query(query, [content, userId]);

  //return result to use in app
  return result;
};

//export function to use else where
module.exports = { updateUser, updatePost };
