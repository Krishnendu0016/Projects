# Task Manager Application

A simple full-stack task manager built with React, Express, MongoDB, and JWT authentication.

## Overview

This project demonstrates how a React frontend communicates with an Express backend using MongoDB for persistence and JWT tokens for user authentication. It allows users to register, log in, create tasks, update task status, filter tasks, search tasks, and manage their own data securely.

## Features

- User authentication
- JWT authorization
- Task CRUD operations
- Task status tracking
- Task priority management
- Search and filtering
- Protected dashboard routes
- User-specific task ownership

## Technologies

- React.js
- React Router
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

## Installation

```bash
cd server
npm install

cd ../client
npm install
```

## Run Backend

```bash
cd server
npm run dev
```

## Run Frontend

```bash
cd client
npm run dev
```

## API Documentation

### Authentication

#### POST /api/auth/register
Create a new user account.

Request body:

```json
{
  "name": "Krishnendu Das",
  "email": "krishnendu@example.com",
  "password": "secret123"
}
```

#### POST /api/auth/login
Log in and receive a JWT token.

Request body:

```json
{
  "email": "krishnendu@example.com",
  "password": "secret123"
}
```

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "user": {
    "id": "user_id",
    "name": "Krishnendu Das",
    "email": "krishnendu@example.com"
  }
}
```

### Tasks

All task routes require a valid JWT in the Authorization header:

```http
Authorization: Bearer <JWT_TOKEN>
```

#### GET /api/tasks
Get all tasks for the logged-in user.

#### GET /api/tasks/:id
Get a single task by ID.

#### POST /api/tasks
Create a task.

Request body:

```json
{
  "title": "Learn React",
  "description": "Practice React hooks",
  "priority": "high",
  "dueDate": "2026-10-01"
}
```

#### PUT /api/tasks/:id
Update a task.

#### DELETE /api/tasks/:id
Delete a task.

## Notes

- The backend stores hashed passwords only.
- Users can only access their own tasks.
- Frontend routes are protected when no valid token is available.
