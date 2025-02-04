//require and create a variable for prisma to send requests to database
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//defining async function to use in app, with passed in variables
const updateUser = async (
  username,
  password,
  firstname,
  lastname,
  age,
  userId
) => {
  //converting passed in ID to int
  const userIdInt = parseInt(userId, 10);

  //creating a variable to handle query to database
  const updatedUser = await prisma.users.update({
    where: { id: userIdInt },
    data: {
      username: username,
      password: password, // Store the hashed password
      first_name: firstname,
      last_name: lastname,
      age: parseInt(age, 10), // Ensure age is an integer
    },
  });

  //return result to use in app
  return updatedUser;
};

//defining async function to use in app, with passed in variables
const updatePost = async (content, userId) => {
  //converting passed in ID to int
  const postIdInt = parseInt(userId, 10);

  //creating a variable to handle query to database
  const updatedPost = await prisma.posts.update({
    where: { id: postIdInt },
    data: {
      content: content,
      created_at: new Date(),
    },
  });

  //return result to use in app
  return updatedPost;
};

//export function to use else where
module.exports = { updateUser, updatePost };
