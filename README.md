# Lead Manager – Full Stack Developer Assignment

A full-stack Lead Management application built as part of the Full Stack Developer screening assignment for **Meru Technosoft Pvt. Ltd.** The application allows users to register, log in, and manage leads through a simple dashboard.

## Live Demo

- **Frontend:** https://lead-manager-green-ten.vercel.app
- **Backend API:** https://lead-manager-api-e4zw.onrender.com

## Features

- User registration and login
- JWT authentication using HTTP-only cookies
- Protected routes and user-specific lead management
- Add, view, edit and delete leads
- Lead status management (New, Contacted, Qualified, Lost)
- Search and filter leads
- Dashboard with lead status counts
- Input validation
- Responsive interface
- REST API
- Automated backend tests

## Tech Stack

### Frontend
- React.js
- Vite
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Cookie-parser

### Testing
- Jest
- Supertest
- MongoDB Memory Server

### Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

## Assumptions

- Each user should only be able to access and manage their own leads.
- Authentication is required to access lead management features.
- Lead status is limited to New, Contacted, Qualified, and Lost.
- Lead information is stored in MongoDB and persists between sessions.
- Basic validation is applied to incoming data before processing it.

## Run Locally

### Prerequisites

- Node.js
- npm
- MongoDB database

### 1. Clone the repository

```bash
git clone https://github.com/krishnavro/lead-manager.git
cd lead-manager
```

### 2. Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside the Backend directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Start the backend server:

```bash
node server.js
```

### 3. Setup Frontend

Open a separate terminal from the project root:

```bash
cd lead-manager/Frontend
npm install
```

Create a `.env` file inside the Frontend directory:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed in the terminal to access the application.

## Testing

Backend API tests are implemented using Jest and Supertest, with MongoDB Memory Server for testing database operations without using the production database.

Run tests from the Backend directory:

```bash
npm test
```

## What I Would Improve With More Time

- Improve the UI with better visual feedback and loading states.
- Add more comprehensive API tests covering lead CRUD operations and validation errors.
- Improve error handling and user feedback for network failures.
- Add more advanced sorting and filtering options.
- Further optimize the application for accessibility and different screen sizes.

## What I Am Proud Of

I built a complete full-stack application connecting React, Express, and MongoDB, including authentication, protected routes, and lead management. Deploying the application and debugging real-world issues such as CORS and cross-origin cookie authentication was a valuable learning experience.
