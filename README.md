[News Aggregator API]

A simple Node.js REST API for user authentication, preferences management, and news aggregation.

## Features
- **User Registration & Login**: Secure authentication using JWT and bcrypt.
- **User Preferences**: Save and update user news preferences.
- **News Aggregation**: Fetch news articles from an external API.

## Endpoints

### User Endpoints
- `POST /signup` — Register a new user
- `POST /login` — Login and receive a JWT token
- `GET /preferences` — Get user preferences (JWT required)
- `PUT /preferences` — Update user preferences (JWT required)

### News Endpoint
- `GET /news` — Get aggregated news articles

## Project Structure
```
app.js
package.json
controllers/
	newsController.js
	usersController.js
middelware/
	authenticationMiddleware.js
models/
	usersModel.js
routes/
	usersRout.js
test/
	server.test.js
```

## Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set environment variables in a `.env` file:
	 - `JWT_SECRET` — Secret key for JWT
	 - `NEWS_API_URL` — URL for the news API
4. Start the server: `node app.js`

## Testing
Run tests with:
```
npm run test
```

## Dependencies
- express
- mongoose
- bcrypt
- jsonwebtoken
- axios


