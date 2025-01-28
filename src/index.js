const express = require("express"); //importing exprees
const cors = require("cors"); //importing cors
const app = express(); //setting variable to handle express
const PORT = process.env.PORT || 3004; //setting port number for server

//setting variables to handle routes in API, importing routes
const loginRoute = require("./routes/login");
const friendshipsRoute = require("./routes/friendships");
const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");
const postLikesRoute = require("./routes/postLikes");

app.use(express.json()); //middleware to parse and handle json
app.use(cors()); //enable cors for all routes

//setting up rotuing for endpoints, linking them to correct ports
app.use("/login", loginRoute);
app.use("/friendships", friendshipsRoute);
app.use("/posts", postsRoute);
app.use("/users", usersRoute);
app.use("/post-likes", postLikesRoute);

app.get("/", (req, res) => {
  res.send("Welcome To ChimeFeed API");
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
