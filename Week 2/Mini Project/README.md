# Notes App Backend

A simple Node.js and Express REST API for managing notes with JWT-based authentication and user-specific ownership rules.

## Features

- User registration
- User login
- JWT authentication
- Create notes
- Read all notes for the logged-in user
- Read a single note
- Update notes
- Delete notes
- User-specific note ownership enforcement

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Postman

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file in the project root and set the following values:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/notes_app
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=1d
```

Important:

- Never commit `.env` to version control.
- Make sure MongoDB is running before starting the API.

## Run

```bash
npm run dev
```

The server starts at `http://localhost:5000`.

## API Endpoints

### Health

- GET `/api/health`
- No authentication required

### Register User

- POST `/api/auth/register`
- No authentication required
- Request body:

```json
{
  "name": "Krishnendu Das",
  "email": "krishnendu@example.com",
  "password": "Password123"
}
```

### Login User

- POST `/api/auth/login`
- No authentication required
- Request body:

```json
{
  "email": "krishnendu@example.com",
  "password": "Password123"
}
```

### Create Note

- POST `/api/notes`
- Authentication required
- Request body:

```json
{
  "title": "React Practice",
  "content": "Practice useState and useEffect."
}
```

### Get All Notes

- GET `/api/notes`
- Authentication required

### Get Single Note

- GET `/api/notes/:id`
- Authentication required

### Update Note

- PUT `/api/notes/:id`
- Authentication required
- Request body:

```json
{
  "title": "Updated React Notes",
  "content": "Updated content for React practice."
}
```

### Delete Note

- DELETE `/api/notes/:id`
- Authentication required

## Security

- Passwords are hashed with bcrypt before storage.
- JWTs are required for all protected note routes.
- The auth middleware checks the `Authorization: Bearer <token>` header.
- Every note query, update, and delete operation checks that the note belongs to the authenticated user before returning or modifying it.

## Example Responses

### Register

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "64c9d6a3e7f0d236e11c4a01",
    "name": "Krishnendu Das",
    "email": "krishnendu@example.com"
  }
}
```

### Login

```json
{
  "success": true,
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

### Create Note

```json
{
  "success": true,
  "message": "Note created successfully",
  "note": {
    "_id": "65d5f6d3b3c3d2a9d4e82f10",
    "title": "React Practice",
    "content": "Practice useState and useEffect.",
    "user": "64c9d6a3e7f0d236e11c4a01"
  }
}
```

## Notes

This project is intentionally kept beginner-friendly and focuses on CRUD, MongoDB, JWT authentication, middleware, and ownership validation.
