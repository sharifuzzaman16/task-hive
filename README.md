# TaskHive

## Overview
TaskHive provides a system where users can complete small tasks and earn rewards. It supports three roles: **Worker**, **Buyer**, and **Admin**, each with distinct functionalities. The platform incorporates task management, payment systems, user authentication, and notifications.

---

## Key Functionalities

### 1. Authentication
- **Registration**: Form validation for email and password.
- **Login**: Supports email-password and Google Sign-In.
- **Token Storage**: Access token stored in local storage.

### 2. Dashboard
- Role-specific navigation and states.
- Data presented dynamically using REST API calls.

### 3. Task Management
- Buyers can create, update, and delete tasks.
- Workers can view and submit tasks.
- Admins can manage all tasks.

### 4. Payment System
- Stripe integration for coin purchases.
- Withdrawal system for workers based on coin balance.

### 5. Notifications
- Real-time notifications for task submissions, approvals, and withdrawals.

## Admin Credentials
- **Email**: admin@taskhive.com
- **Password**: strongpassword

---

## Live Links
- **Live Site**: [https://task-hive-93f07.web.app/](https://task-hive-93f07.web.app/)
- **Backend API**: [https://task-hive-server-two.vercel.app/](https://task-hive-server-two.vercel.app/)

---

## Features

### General Features
- **Responsive Design**: Built with modern frameworks for seamless performance across devices.
- **User Authentication**: Secure login and registration with form validation and Google Sign-In.
- **Role-Based Authorization**: Separate dashboards and permissions for Worker, Buyer, and Admin roles.
- **Notifications**: Alerts for actions like task approvals, submissions, and withdrawals.
- **Stripe Integration**: Secure payment system for purchasing coins (fallback to dummy payment if needed).

### Worker Features
- View available tasks with details.
- Submit task proofs for review.
- Track total submissions, pending submissions, and earnings.
- Withdraw coins to selected payment systems (e.g., Bkash, Rocket).

### Buyer Features
- Create and manage tasks.
- Review task submissions with approve/reject actions.
- Track payment history and manage coins.

### Admin Features
- Manage users, tasks, and withdrawal requests.
- View platform statistics such as total users and coins.

---

## Future Enhancements
- Implement a real-time messaging system between Workers and Buyers.
- Add dark mode for better user experience.
- Integrate advanced analytics for Admin dashboards.