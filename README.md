# **React Authentication State Demo**

![image](https://github.com/user-attachments/assets/4be5196b-c719-4bda-bb03-ceac7fcf99e2)

[Demo Link](https://erinskidds.com/reactauthstatedemo/)

## **Introduction**

This project is a simple **authentication system** built using **React** and **SQLite**, designed to handle user registration, login, and profile management. The app stores user credentials securely and handles session management for authenticated users. It is built to work on both **web and mobile platforms** using **React Native Web**.

The authentication system ensures user data is securely stored and verified through a MySQL database, and the session is maintained via authentication tokens.

## **Technologies Used**

We've utilized the following technologies for this project:

### Frontend

- **React**: JavaScript library for building user interfaces
- **React Native Web**: Cross-platform compatibility layer
- **React Navigation**: Navigation library for screen management
- **TypeScript**: Typed superset of JavaScript
- **Context API**: State management for authentication
- **AsyncStorage**: Local storage management
- **Fetch API**: HTTP request handling

### Backend

- **PHP**: Server-side scripting language
- **MySQL**: Relational database for user data
- **PDO**: PHP Data Objects for database connection
- **BCrypt**: Password hashing

### Development Tools

- **Visual Studio Code**: IDE
- **Git**: Version control
- **npm**: Package management
- **TypeScript Compiler**: Type checking and compilation
- **ESLint**: Code linting
- **Prettier**: Code formatting

### Infrastructure

- **Apache**: Web server
- **CORS**: Cross-Origin Resource Sharing
- **SSL**: Secure communication layer
- **REST API**: API architectural style

## **Pages and Routes**

### Authentication Flow

- **Login** (`/login`)
  - Main login form
  - Forgot password link
  - Register account link
- **Register** (`/register`)
  - New user registration form
- **Forgot Password** (`/forgot-password`)
  - Password reset form

### Protected Routes

- **Account** (`/account`)
  - Profile management
  - Change username
  - Change password
  - Delete account

### API Endpoints

- `/api/login.php`
- `/api/register.php`
- `/api/update_username.php`
- `/api/update_password.php`
- `/api/reset_password.php`
- `/api/delete_account.php`

## **What This App Does**

- **User Registration**: Allows users to create a new account by providing a username, email, and password. The password is securely hashed and stored in the MySQL database.
- **User Login**: Authenticated users can log in by providing their credentials. Upon successful login, a session is created using a JWT token, ensuring the user stays logged in.
- **Profile Management**: Users can update their account details, such as username and password, with proper validation and secure data handling.
- **Session Management**: The app uses JWT for maintaining sessions and ensures that users are redirected if their session has expired.
- **Mobile & Web Compatibility**: The app works seamlessly across both mobile and desktop browsers, leveraging React Native Web for cross-platform compatibility.

## **Deployment Requirements**

### Server Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache web server
- SSL certificate (for HTTPS)

### Database Setup

1. Create MySQL database
2. Import schema from `database.sql`
3. Configure `config.php` with database credentials

## **Development Timeline**

- **Start Date**: February 5, 2025 at 3pm CST
- **End Date**: February 6, 2025 at 5pm CST
- **Time Taken**: Approximately 26 hours to develop, debug, and deploy to a shared hosting server.
