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
