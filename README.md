# Teachyoself Backend

See the [Teachyoself Frontend](https://github.com/Team-Elise-Henry-Chris/T3A2_frontend) for full project documentation.

## Start Instructions
Navigate to file directory in you terminal and run ```npm install```

Run ```nodemon run start``` to start server

To run tests type ```npm run test```

## API Routes

**Authentication**
Authentication is managed with an access JWT sent as bearer token.
Access tokens can be refreshed by sending the refresh token cookie to ```api/v1/user/refresh``` or by logging in via api



**Topic Routes**

- GET: /api/v1/topic - Returns all topics (home page view)
- GET: /api/v1/topic/:topicId - Returns the topic, followed by an array of posts
- POST: /api/v1/topic - Receives a topic_name and creates a new topic (requires auth)
- DELETE: /api/v1/topic/:topicId : Deletes a topic (requires auth) (must belong to logged in user, or user is admin)

**Post Routes**

- GET: /api/v1/post - Returns all posts
- GET: /api/v1/post/postId - Returns one post 
- POST: /api/v1/post - Recieves a title, link, resource_type and topicId and creates a new post (requires auth)
- DELETE: /api/v1/post/:postId - Deletes a post (requires auth) (must belong to user, or user is admin)




**Rating Routes**

- POST: /api/v1/rating - Receives a postID and a rating score and creates a new rating (requires auth)
- PATCH: /api/v1/rating/:ratingId - Receives a rating score and edits a rating (requires auth) (must belong to user, or user is admin)
- DELETE: /api/v1/rating/:id - Deletes a rating (requires auth)(must belong to user, or user is admin)

**User Routes**

- POST: /api/v1/user - Receives a username, password and email and creates an account
- PUT: /api/v1/user - Logs in user. Takes a username OR email and a password and returns an access token and refresh token
- GET: /api/v1/user/refresh - Receives a refresh token (cookie) and grants an access token
- GET:  /api/v1/user/logout - Logs out user and removes tokens/cookies from user and database 
- GET /api/v1/user/:userId - Returns only the username if the userId is different from the requesting user. If the page belongs to the user, or the user is an admin, returns their id, username, email and role (requires auth)

