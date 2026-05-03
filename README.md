# FreeAPI Auth App

A simple authentication web app built with vanilla JavaScript and Tailwind CSS.

## Features

- User registration & login
- Session management via JWT (localStorage)
- Current user profile display
- Logout functionality
- Loading states & error messages

## Tech Stack

- HTML, CSS, JavaScript (no frameworks)
- Tailwind CSS (CDN)
- FreeAPI Authentication Module

## API Endpoints Used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/v1/users/register` | Register new user |
| POST | `/api/v1/users/login` | Login & receive token |
| POST | `/api/v1/users/logout` | Logout user |
| GET | `/api/v1/users/current-user` | Fetch logged-in user |

## Live Demo

[View Live](https://freeapi-auth-app.vercel.app/)

## Run Locally

```bash
npx serve .
```

Open `http://localhost:3000`