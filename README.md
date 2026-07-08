# ShopSphere Analytics Dashboard

A full-stack analytics dashboard developed using the MERN stack to monitor sales, customers, revenue, and orders in real time. This project was created to practice full-stack web development by integrating React, Node.js, Express.js, MongoDB Atlas, and Socket.IO.

## Features

- Admin Login Authentication
- Sales Analytics Dashboard
- Total Revenue Display
- Monthly Sales Overview
- Top Customers List
- Recent Orders
- Real-time Updates using Socket.IO
- MongoDB Atlas Database Integration
- Responsive User Interface

## Tech Stack

### Frontend
- React.js
- Vite
- Axios
- CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- Socket.IO

### Database
- MongoDB Atlas
- Mongoose

## Project Structure

```
shopsphere-analytics
│
├── backend
│   ├── config
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── styles
│   └── package.json
```

## Installation

### Clone the repository

```bash
git clone https://github.com/tulasip682-wq/shopsphere-analytics.git
```

Move into the project folder.

```bash
cd shopsphere-analytics
```

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

## Frontend Setup

Open another terminal.

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

```
http://localhost:5173
```

The backend will run on:

```
http://localhost:3000
```

## Environment Variables

Create a `.env` file inside the **backend** folder.

```
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

## Login Credentials

```
Email:
admin@shopsphere.com

Password:
admin123
```

## Dashboard Modules

- Revenue Summary
- Monthly Sales Report
- Top Customers
- Recent Orders
- Order Management
- Admin Authentication

## Screenshots

### Login Page

(Add screenshot here)

### Dashboard

(Add screenshot here)

### Monthly Sales

(Add screenshot here)

### Top Customers

(Add screenshot here)

## What I Learned

During this project, I learned:

- Building REST APIs using Express.js
- Connecting MongoDB Atlas with Mongoose
- Implementing JWT Authentication
- Creating responsive React components
- Managing frontend and backend integration
- Using Socket.IO for real-time updates
- Working with Git and GitHub
- Deploying and managing a MERN project

## Future Improvements

- Customer Management Module
- Product Management
- Sales Charts using Chart.js
- Search and Filter Options
- Export Reports as PDF/Excel
- Role-based Authentication
- Dashboard Notifications

## Author

**Tulasi Priya**

GitHub:
https://github.com/tulasip682-wq
