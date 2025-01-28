//importing the Pool class from 'pg' for database connection
const { Pool } = require("pg");

//creating new connection pool
const pool = new Pool({
  user: "duane",
  host: "localhost",
  database: "ChimeFeed",
  password: "password",
  port: 5432,
});

//export pool to use in app and send queries
module.exports = pool;
