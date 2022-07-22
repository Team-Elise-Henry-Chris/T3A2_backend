# Teachyoself Backend

See the [Teachyoself Frontend README](https://github.com/Team-Elise-Henry-Chris/T3A2_frontend) for more information.

## Start Instructions
Navigate to file directory in you terminal and run ```npm install```

Run ```nodemon run start``` to start server

To run tests type ```npm run test```

## API Routes

**Authentication**
Authentication is managed with an access JWT sent as bearer token.
Access tokens can be refreshed by sending the refresh token cookie to ```api/v1/user/refresh``` or by logging in via api



**Topic Routes**

- GET: /api/v1/topic - returns all topics (Home page view)
- GET: /api/v1/topic/:topicId - returns the topic, followed by an array of posts
- POST: /api/v1/topic - takes a topic_name and creates a new topic (requires auth)
- DELETE: /api/v1/topic/:topicId : deletes a topic (requires auth)(must belong to logged in user, or user is admin)

**Post Routes**

- GET: /api/v1/post - returns all posts
- GET: /api/v1/post/postId - returns one post 
- POST: /api/v1/post - recieves a title, link, resource_type and topic (id) as json and creates a new post. (requires auth)
- DELETE: /api/v1/post/:postId - deletes a post (requires auth)(must belong to user, or user is admin)




**Rating Routes**

- POST: /api/v1/rating - takes a postID and a rating score and creates a new rating. (requires auth)
- PATCH: /api/v1/rating/:ratingId - takes a rating score and edits a rating (requires auth)(must belong to user, or user is admin)
- DELETE: /api/v1/rating/:id - deletes a rating (requires auth)(must belong to user, or user is admin)

**User Routes**

- POST: /api/v1/user - takes a username, password and email and creates an account
- PUT: /api/v1/user - takes a username OR email and a password and returns an access token and refresh token (login)
- GET: /api/v1/user/refresh - takes a refresh token (cookie) and grants an access token
- GET:  /api/v1/user/logout - logs out user and removes tokens/cookies from user and database 
- GET /api/v1/user/:userId - Returns ONLY the username if the userId is different from the requesting user. If the page belongs to the user, or the user is an admin, returns their id, username, email and role (requires auth)

