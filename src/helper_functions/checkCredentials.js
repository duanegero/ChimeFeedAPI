const pool = require("../db"); //creating varible used to connect to database

//defining async function to use in app, with passed in variables
const checkCredentials = async (username, password) => {
  //creating a variable to handle query to database
  const query = `SELECT * FROM users
    WHERE username = $1 AND password = $2;`;

  //sending query to database, creating variable for results
  const result = await pool.query(query, [username, password]);

  //return result to use in app
  return result;
};

//export function to use else where
module.exports = { checkCredentials };
