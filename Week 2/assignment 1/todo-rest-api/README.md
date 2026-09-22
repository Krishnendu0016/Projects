# To-Do List REST API

A beginner-friendly REST API for creating, reading, updating, and deleting tasks with Node.js, Express.js, MongoDB, and Mongoose.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- Postman

## Project Structure

```text
src/
├── config/db.js
├── controllers/taskController.js
├── models/Task.js
├── routes/taskRoutes.js
└── server.js
```

## Installation

1. Make sure MongoDB is running locally, or prepare a MongoDB Atlas connection string.
2. Install dependencies:

```bash
npm install
```

## Environment Variables

The `.env` file contains the server port and MongoDB connection string:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/todo_rest_api
```

Replace `MONGODB_URI` with your MongoDB Atlas connection string when needed. The `.env` file is excluded from Git.

## Run

Start the development server with:

```bash
npm run dev
```

For production-style startup:

```bash
npm start
```

The API runs at `http://localhost:5000` after a successful MongoDB connection.

## API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Check whether the API is running |
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get one task |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Create a task

`POST /api/tasks`

```json
{
  "title": "Learn Express.js",
  "description": "Practice building REST APIs"
}
```

### Update a task

`PUT /api/tasks/:id`

```json
{
  "title": "Learn Express and MongoDB",
  "description": "Build REST APIs",
  "completed": true
}
```

Set the request header `Content-Type` to `application/json` for requests with a body.

## Postman Testing

Import `postman/To-Do List REST API.postman_collection.json` into Postman. The collection includes requests for health, create, list, get by ID, update, and delete operations.

For requests containing `:id`, replace the placeholder with an actual task ID returned by the create or list request. Test the following cases:

- Create a valid task, with a missing title, and with an empty title.
- Get all tasks, an existing task, a missing task, and an invalid ID.
- Update title, description, and completion status.
- Update and delete missing tasks.
- Delete an existing task and try invalid IDs.

## API Flow

```text
Postman -> Express route -> Controller -> Mongoose model -> MongoDB
MongoDB -> Controller -> JSON response -> Postman
```
