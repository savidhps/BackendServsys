# Backend README

## Project Overview

This is the backend for the Expenses Management application.
Built with Node.js, Express, and MongoDB. It provides authentication, user management, and expense CRUD APIs.

---

## Prerequisites

* Node.js (v16+)
* npm or yarn
* MongoDB (local or Atlas)

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <backend-repo-url>
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory with the following:

```
PORT=4000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

### 4. Run the server

For development with auto-reload:

```bash
npm run dev
```

For production:

```bash
npm start
```

The server should run on `http://localhost:4000`.

---

## API Endpoints

### Auth

* `POST /api/auth/register` - Register a new user
* `POST /api/auth/login` - Login and get JWT token

### Users (Admin only)

* `GET /api/users` - Get all users
* `POST /api/users` - Create a new user
* `DELETE /api/users/:id` - Delete a user

### Expenses

* `GET /api/expenses` - Get all expenses
* `POST /api/expenses` - Add a new expense
* `PUT /api/expenses/:id` - Update an expense
* `DELETE /api/expenses/:id` - Delete an expense

---

## Notes

* Use a tool like Postman to test all API endpoints.
* For protected routes, include `Authorization: Bearer <token>` header.
* Ensure MongoDB is running and `.env` variables are correctly set.



# Expense Tracker Backend (saviCodeBackend)

Minimal Node.js + Express + MongoDB backend for the Expense Tracker.
Structure:
- server.js
- config/db.js
- models/ (User, Expense)
- controllers/ (auth, expense, user)
- routes/ (auth, expenses, users)
- middleware/ (auth)
- utils/seed.js

Quick start:
1. Copy `.env.example` to `.env` and update values.
2. `npm install`
3. `npm run seed` (optional) // creates admin and sample users/expenses (only if you are using new db)
4. `npm run dev`
5. API base: `http://localhost:4000/api`

Default seeded users:
- admin@mail.com / 1234  (role: admin)
- user@mail.com / 1234   (role: user)
