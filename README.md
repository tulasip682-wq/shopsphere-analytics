# ShopSphere Analytics Dashboard

A full-stack sales analytics dashboard developed using the MERN stack. This project helps monitor sales performance, revenue, customer details, and order analytics in real time. It was built to practice full-stack web development, API integration, authentication, database management, and deployment.

---

## Live Demo

**Frontend:**  
https://shopsphere-analytics.vercel.app

**Backend API:**  
https://shopsphere-analytics-iyfq.onrender.com

---

## Features

- Admin Login Authentication
- JWT Authentication
- Sales Analytics Dashboard
- Revenue Summary
- Monthly Sales Analytics
- Top Customers Analytics
- Order Management
- Real-time Updates using Socket.IO
- Responsive User Interface
- MongoDB Atlas Integration

---

## Tech Stack

### Frontend
- React
- Vite
- Axios
- CSS

### Backend
- Node.js
- Express.js
- Socket.IO
- JWT
- Bcrypt.js

### Database
- MongoDB Atlas
- Mongoose

### Deployment
- Vercel
- Render

---

## Project Structure

```
shopsphere-analytics
│
├── frontend
│   ├── public
│   ├── src
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── config
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/tulasip682-wq/shopsphere-analytics.git
```

Move into the project folder.

```bash
cd shopsphere-analytics
```

---

## Backend Setup

Move to the backend folder.

```bash
cd backend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend.

```bash
npm start
```

---

## Frontend Setup

Open another terminal.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```env
VITE_API_URL=http://localhost:3000
```

Run the frontend.

```bash
npm run dev
```

---

## Demo Login

**Email**

```
admin@shopsphere.com
```

**Password**

```
admin123
```

---

## API Endpoints

### Authentication

```
POST /auth/login
POST /auth/create-admin
```

### Orders

```
GET /orders
POST /orders
POST /orders/bulk
GET /orders/count
```

### Analytics

```
GET /analytics/revenue
GET /analytics/monthly-sales
GET /analytics/top-customers
```

---

## What I Learned

- Building a full-stack MERN application
- Creating REST APIs with Express.js
- Connecting MongoDB Atlas using Mongoose
- Implementing JWT Authentication
- Using Socket.IO for real-time updates
- Connecting frontend and backend using Axios
- Managing environment variables
- Deploying backend on Render
- Deploying frontend on Vercel
- Using Git and GitHub for version control

---

## Future Improvements

- Product Management
- User Management
- Export Reports
- Search and Filter Options
- Charts with More Analytics
- Role-Based Access Control

---

## Author

**Tulasi Priya G**

B.Sc. Computer Science with Data Analytics

GitHub: https://github.com/tulasip682-wq

---

## License

This project is created for learning and educational purposes.
