# Full Stack To-Do Application

A minimal full-stack task manager built with React, Node.js, Express, MongoDB, and JWT authentication.

## Project overview

This project combines a React frontend with a Node/Express REST API and a MongoDB database to provide secure user authentication and task management. Users can register, log in, manage their own to-dos, and access protected dashboard routes using a JSON Web Token.

## Frontend architecture

The frontend lives in the `client` folder and uses:

- React
- React Router
- Context API for authentication
- Native `fetch()` for API requests
- CSS for styling

The app is organized into reusable components for navigation, forms, task lists, and auth pages.

## Backend architecture

The backend lives in the `server` folder and uses:

- Express.js for the REST API
- MongoDB with Mongoose for persistence
- JWT for auth
- bcryptjs for hashing passwords
- Middleware for route protection

The API exposes authentication and task routes used by the React client.

## Authentication flow

1. A user registers through `/api/auth/register`.
2. The password is hashed before saving.
3. The user logs in through `/api/auth/login`.
4. The server returns a JWT.
5. The frontend stores the token in `localStorage`.
6. Protected routes and API requests send the token in the `Authorization` header.

## JWT handling

The application uses JWT-based auth for secure access to protected routes and task endpoints.

- On successful login, the token is saved in local storage.
- Protected requests include: `Authorization: Bearer <token>`
- If a request responds with `401 Unauthorized`, the app clears auth data and sends the user to the login page.

## API endpoints

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`

### Tasks

- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## React routing

The frontend has the following routes:

- `/login` → public
- `/register` → public
- `/dashboard` → protected
- `/*` → not found page

`ProtectedRoute` guards the dashboard and redirects guests to login.

## CRUD flow

- Create: the user enters a title and description, then submits the form.
- Read: the dashboard fetches the logged-in user's tasks.
- Update: the user edits a task and saves changes.
- Delete: the user removes a task from the list.
- Complete: the task is updated with `completed: true` using the same update endpoint.

## Installation instructions

### 1. Install backend dependencies

```bash
cd server
npm install
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

## Environment setup

Create a `server/.env` file with values like:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/todo_app
JWT_SECRET=super-secret-key
```

Create a `client/.env` file with:

```env
VITE_API_URL=http://localhost:5000/api
```

## How to run frontend and backend

### Start the backend

```bash
cd server
npm run dev
```

### Start the frontend

```bash
cd client
npm run dev
```

Then open the frontend URL shown by Vite (typically http://localhost:5173).

## Notes

- MongoDB must be running locally.
- Each user can only access their own tasks.
- The frontend updates the UI without reloading the page for normal CRUD actions.
