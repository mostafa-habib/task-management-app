# Task Management App

This project is a task management application that allows users to manage tasks, perform CRUD operations on tasks, and includes user authentication for sign-in and sign-up.

## Features

- User Sign Up: Allows users to register/signup.
- User Sign In: Enables registered users to log in/sign in.
- Task Management: CRUD operations for tasks (Create, Read, Update, Delete).
- Routing: Navigation between different sections using React Router.
- UI Components: Utilizes Material-UI (MUI) for the user interface.
- Icons: Utilizes Font Awesome for icons.

## Technologies Used

- React: JavaScript library for building user interfaces.
- React Router: For handling routing within the application.
- Material-UI (MUI): React components for faster and easier web development.
- Font Awesome: Icon set and toolkit.
- Json-server: simulates backend.

## How to Run Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/task-management-app.git
   cd task-management-app
   npm install
   npm install -g json-server (if you encounter any probelm with command run it in cmd as admin)
   json-server --watch public/db.json --port 3001
   npm start

## Contributions
Contributions are welcome! If you'd like to contribute to this project, please follow the guidelines outlined in CONTRIBUTING.md.

## License
This project is licensed under the MIT License.
