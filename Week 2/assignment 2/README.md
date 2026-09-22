# User Authentication REST API

A simple and secure authentication API built with Node.js, Express.js, MongoDB, Mongoose, bcrypt, and JWT.

## Project Overview

This project demonstrates how to build a backend authentication flow for learning purposes. It includes user registration, login, JWT token generation, protected route protection, and profile access using a middleware-based auth system.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- JWT
- Postman

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root with the following values:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/user-auth-api
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=1d
```

### Variable details

- `PORT`: The port on which the API runs.
- `MONGODB_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret used to sign JWT tokens.
- `JWT_EXPIRES_IN`: Expiration time for each JWT token.

## Run

```bash
npm run dev
```

The server starts at:

```text
http://localhost:5000
```

## API Documentation

### 1. Health Check

`GET /api/health`

Response:

```json
{
  "success": true,
  "message": "Authentication API is running"
}
```

### 2. Register User

`POST /api/auth/register`

Request body:

```json
{
  "name": "Krishnendu Das",
  "email": "daskrishnendu441@gmail.com",
  "password": "Password123"
}
```

Example success response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "64d9c...",
    "name": "Krishnendu Das",
    "email": "daskrishnendu441@gmail.com"
  }
}
```

### 3. Login User

`POST /api/auth/login`

Request body:

```json
{
  "email": "daskrishnendu441@gmail.com",
  "password": "Password123"
}
```

Example success response:

```json
{
  "success": true,
  "message": "Login successful",
  "token": "JWT_TOKEN_HERE",
  "user": {
    "id": "64d9c...",
    "name": "Krishnendu Das",
    "email": "daskrishnendu441@gmail.com"
  }
}
```

### 4. Get Authenticated Profile

`GET /api/auth/profile`

Headers:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Example success response:

```json
{
  "success": true,
  "user": {
    "id": "64d9c...",
    "name": "Krishnendu Das",
    "email": "daskrishnendu441@gmail.com"
  }
}
```

## Authentication Flow

```text
Registration → Password Hashing → MongoDB
Login → Password Verification → JWT
Protected Request → JWT Verification → User
```

## Notes

- Passwords are hashed before saving.
- Passwords are never returned in API responses.
- JWT is used in the `Authorization: Bearer <token>` header.
- Invalid or missing tokens are rejected with HTTP 401.
