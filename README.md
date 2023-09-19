# Blue-Fox-News

The project is a web application for delivering news articles to registered users based on their topic preferences. It provides user authentication, registration, and profile management features. The application periodically sends news emails to users who have subscribed to specific topics. Below are the key features and how the project works:

## Features:

**User Authentication:**
* Users can register and log in to access the application.
* User authentication is handled securely using JSON Web Tokens (JWT).
* Passwords are hashed using MD5 for security.

**User Registration:**
* Users can register by providing their name, email, and password.
* A one-time password (OTP) is sent to the user's email for verification.

**Profile Management:**
* Users can update their news topic preferences (e.g., programming, sports) after registration.
* Profile updates are protected using JWT authentication.

**News Delivery:**
* The application periodically fetches news articles from The Guardian API based on user preferences.
* News articles are sent to users via email.

## How It Works:

**Server Setup:**
* The project is built using Node.js and Express.js.
* MongoDB is used to store user data, and Mongoose is the ODM for database operations.
* EJS is used as a templating engine for rendering dynamic content.
* Cookie parsing is handled using the `cookie-parser` middleware.

**User Authentication:**
* Users can log in using their email and password.
* JWT tokens are created upon successful login and stored as cookies for subsequent authenticated requests.

**User Registration:**
* Users can register with a name, email, and password.
* During registration, a one-time password (OTP) is generated and sent to the user's email for verification.

**Profile Management:**
* Users can update their news topic preferences, such as choosing programming or sports.
* Profile updates are protected by verifying the JWT token.

**News Delivery:**
* The application periodically (every 7 days) fetches news articles from The Guardian API based on user preferences.
* Nodemailer is used to send news articles to users' email addresses.
* The application sends news emails only to users who have subscribed to specific topics.

**Middleware for User Login:**
* A middleware checks if the user is authenticated using JWT and renders the user dashboard if logged in.

## 1. `server.js`
This is the main server file responsible for setting up your Express.js server, connecting to the MongoDB database, defining routes, and starting the server.
* `Express.js`: A web application framework for Node.js that simplifies routing and handling HTTP requests.
* `mongoose`: An ODM (Object Data Modeling) library for MongoDB, used to interact with the database.
* `ejs`: A templating engine for rendering dynamic content in HTML.
* `cookie-parser`: A middleware for handling cookies in Express.
* `USER`: Imports the Mongoose model for users.
* `protected`: Contains sensitive information such as MongoDB connection details, API keys, and email credentials. This file should not be pushed to a public repository.
* `sendNews`: Imports a function responsible for sending news emails to subscribed users.

## 2. `protected.js`
This file contains sensitive information and configuration settings that should not be exposed publicly. It includes:
* `mongoDB_atlas_url`: MongoDB connection URL.
* `SECRET_KEY`: A secret string used for JWT (JSON Web Token) authentication
* `emailAddress`: The email address used for sending emails.
* `password`: The password for the email address.
* `Guardian_API_KEY`: API key for accessing The Guardian API (used for fetching news articles).

**NOTE** : Make sure to create this `protected.js` file in the root of your project's directory.
For more information <a href="https://github.com/adeebjamal/Blue-Fox-News/blob/main/instruction.md">click here</a>.

## 3. `Routes` Folder
### A. `index.js`
This file defines routes for the homepage.
* A GET route for rendering the homepage template.
### B. `users.js`
This file defines routes related to user authentication, registration, and profile management.
**User Authentication Routes:**
<br>
--> GET `/login`: Renders the login page.<br>
--> GET `/register`: Renders the registration page.<br>
--> GET `/logout`: Logs the user out and renders the login page.<br>
<br>

**User Authentication POST Routes:**
<br>
--> POST `/login`: Handles user login, including validation and JWT creation.<br>
--> POST `/register`: Handles user registration, including validation and OTP (One-Time Password) generation.<br>
--> POST `/OTP`: Handles OTP verification during registration.<br>
--> POST `/update`: Handles updating user news preferences.<br>

## 4. `Models` Folder
### A. `user.js`
This file defines the Mongoose schema for user data, including user name, email, password, subscription status, and news topic preferences.

## 5. `Middlewares` Folder
### A. `getLoginMiddleware.js`
This middleware checks whether a user is logged in using a JWT (JSON Web Token) and renders the user dashboard if authenticated.

## 6. `functions` Folder
### A. `send_news.js`
This file contains a function responsible for sending news emails to subscribed users. It uses Nodemailer to send emails and Axios to fetch news articles from The Guardian API.
* `Nodemailer`: A library for sending emails.
* `Axios`: A library for making HTTP requests.
### B. `send_otp.js`
This file contains a function responsible for sending OTP (One-Time Password) emails for email verification during user registration.
* `Nodemailer`: Used for sending OTP emails.

The detailed explanations and dependencies of each file should help you understand the purpose of each component in your project. Be cautious with sensitive information stored in `protected.js`, and make sure it is kept secure and not shared publicly.