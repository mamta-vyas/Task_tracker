🗂️ Task Tracker Application
A full-stack task tracker application with user authentication, project & task management, and task update/delete features.

Built with:

Frontend: React.js + Tailwind CSS

Backend: Express.js + MongoDB

Authentication: JWT (JSON Web Token)

State management: React Context API (or Redux if applicable)

Task Features: Create, update, delete tasks, mark tasks completed, edit tasks inline

Project Features: Manage projects with associated tasks


## 📁 Folder Structure

task-tracker/
├── client/         # React frontend app
│   ├── src/
│   │   ├── components/   # UI components like TaskCard, TaskList, Navbar, CreateTaskForm, etc.
│   │   ├── context/      # Auth context provider
│   │   ├── pages/        # Main pages like Dashboard, LoginPage, SignupPage
│   │   ├── services/     # API service layer for auth and task management
│   │   ├── app/          # Store (if using Redux)
│   │   ├── utils/        # Utility functions like token helpers
│   │   └── index.js      # React entry point
│   ├── package.json
│   └── tailwind.config.js
├── server/         # Express backend API
│   ├── controllers/     # Controllers for auth, tasks, projects
│   ├── middleware/      # Middleware like auth verification
│   ├── models/          # Mongoose models for User, Project, Task
│   ├── routes/          # API routes for auth, tasks, projects
│   ├── config/          # DB config
│   ├── package.json
│   └── server.js        # Entry point for backend server
├── README.md         # Project overview and setup


🚀 Features Implemented
User Authentication
User signup and login with JWT token-based authentication

Protected routes for managing projects and tasks

Project Management
Create, view, and manage multiple projects

Each project contains its own set of tasks

Task Management
Create new tasks with title, description, status, and timestamps

Update task status (mark tasks as completed)

Edit existing tasks inline with an edit form UI

Delete tasks from the list

Display task creation and completion dates

UI & UX
Responsive and clean interface built with React and styled with Tailwind CSS

Reusable components: TaskCard, TaskList, CreateTaskForm, ProjectCard, Navbar

Real-time UI updates on task operations (create, update, delete)

Edit form toggle for tasks to update details seamlessly

User-friendly date formatting and status highlights

📦 Getting Started
Prerequisites
Node.js and npm installed

MongoDB running locally or a connection string for a hosted MongoDB cluster

Setup Instructions
Clone the repo

git clone https://github.com/mamta-vyas/Task_tracker.git
cd task-tracker

Setup Backend

cd server
npm install
# Add your MongoDB connection URI in `server/config/db.js`
npm run dev    # Runs the server with nodemon on port 5000 (default)

Setup Frontend

cd ../client
npm install
npm start    # Runs React dev server on port 3000

📂 API Endpoints Overview
Auth: /api/auth/signup, /api/auth/login

Projects: /api/projects (CRUD operations)

Tasks: /api/tasks (CRUD operations, including status updates)

🛠️ How to Use
Sign up or log in to your account

Create new projects or select existing projects

Add tasks to projects, update their details or status

Edit or delete tasks as needed

Monitor task creation and completion dates

📝 Notes
This project uses JWT for session management and secures API endpoints

Task editing happens inline via a toggleable form

All data persists in MongoDB

The UI is responsive and styled with Tailwind CSS

🤝 Contributions
Feel free to fork the repo and submit pull requests if you want to add features or improve the app!