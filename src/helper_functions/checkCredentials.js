//import prisma client to connect to data base
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//defining async function to use in app, with passed in variables
const checkCredentials = async (username, password) => {
  //creating a variable to handle query to database
  const checkUser = await prisma.users.findFirst({
    where: {
      username: username,
      password: password,
    },
  });

  //return result to use in app
  return checkUser;
};

//export function to use else where
module.exports = { checkCredentials };
