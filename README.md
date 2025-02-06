# **React Authentication State Demo**
![image](https://github.com/user-attachments/assets/4be5196b-c719-4bda-bb03-ceac7fcf99e2)

## **Introduction**

This project is a simple **authentication system** built using **React** and **SQLite**, designed to handle user registration, login, and profile management. The app stores user credentials securely and handles session management for authenticated users. It is built to work on both **web and mobile platforms** using **React Native Web**.

The authentication system ensures user data is securely stored and verified through a MySQL database, and the session is maintained via authentication tokens.

## **Technologies Used**

We’ve utilized the following technologies for this project:

- **React**: A JavaScript library for building user interfaces. It allows us to create a dynamic and responsive app with reusable components.
- **React Native Web**: This enables us to use React Native components in the browser, making our app compatible with both mobile and web devices.
- **SQLite**: A serverless, self-contained SQL database engine used to manage user authentication data locally on the device.
- **MySQL**: A relational database management system used to store user registration data (username, password, etc.) securely on the server side.
- **PHP**: Used for server-side scripts to handle API requests like user registration, login, profile updates, and session management.
- **CORS**: Handling Cross-Origin Resource Sharing (CORS) to allow communication between the frontend (React) and the backend (PHP).
- **JWT (JSON Web Tokens)**: Used for managing authentication tokens to ensure secure communication between the frontend and the backend.
- **HTML & CSS**: For structuring and styling the app's user interface.
- **Babel**: A JavaScript compiler that helps ensure compatibility across browsers by transpiling modern JavaScript syntax.
- **Fetch API**: Used for making HTTP requests from the frontend to the backend for user authentication and data handling.

## **What This App Does**

- **User Registration**: Allows users to create a new account by providing a username, email, and password. The password is securely hashed and stored in the MySQL database.
- **User Login**: Authenticated users can log in by providing their credentials. Upon successful login, a session is created using a JWT token, ensuring the user stays logged in.
- **Profile Management**: Users can update their account details, such as username and password, with proper validation and secure data handling.
- **Session Management**: The app uses JWT for maintaining sessions and ensures that users are redirected if their session has expired.
- **Mobile & Web Compatibility**: The app works seamlessly across both mobile and desktop browsers, leveraging React Native Web for cross-platform compatibility.

## **Development Timeline**

- **Start Date**: February 5, 2025 at 2:50pm CST
- **End Date**: February 5, 2025 at 4:30pm CST
- **Time Taken**: Approximately 90 minutes to develop, debug, and deploy to a shared hosting server.

## **Demo**

View an online demo here: [Demo Link](https://erinskidds.com/reactauthstatedemo/)
