# ChimeFeed API

This restful API is designed to handle requests made from ChimeFeed frontend app, Postman, or CURL.

- [Installation](#installation)
- [Frontend Repository](#frontend)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [License](#license)

## Installation

1. Clone Repository:<br>
   `git clone https://github.com/duanegero/ChimeFeedAPI.git`
2. Navigate to the Project Directory
3. Install Dependencies:<br>
   `npm install`
4. Start Server<br>
   `node index.js`

## Frontend

### React App

https://github.com/duanegero/ChimeFeed-Frontend.git

## API Endpoints

- GET `/friendships/:id` - Get all friendship by user ID
- GET `/friendships/:id/find-frineds` - Get all users that aren't ID friends
- GET `/post-likes/:id` - Get all likes on a single post ID
- GET `/posts/:id` - Get all post from user ID
- GET `/posts/:id/friends-posts` - Get all post from user ID friendships
- GET `/users/:id` - Get user by ID

- POST `/friendships` - Create new friendship with two IDs
- POST `/post-likes` - Create new like on a post
- POST `/posts` - Create a new post
- POST `/users` - Create a new user
- POST `/login` - Endpoint for loging into frontend

- PUT `/posts/:id` - Update an existing post by ID
- PUT `/users/:id` - Update an existing user by ID

- DELETE `/friendships` - Delete an existing friendship
- DELETE `/posts/:id` - Delete an existing post by ID
- DELETE `/users/:id` - Delete an existing user by ID

## Usage

Once the server is running you can interact with the API through the available endpoints. Here is an example of how to create a new user with `/users` POST endpoint using Postman or any HTTP client:

### Example Request (POST `/users`)

```
{
    "username": "User123",
    "password": "Password123",
    firstname": "John",
    "lastname": "Doe",
    "age": "21"
}
```

The API and Database will add the User ID

## License

This project is licensed under the MIT License.
