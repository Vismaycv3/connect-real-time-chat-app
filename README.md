# Connect - Real-Time Chat Application

A full-stack real-time chat application built using the MERN Stack, Socket.IO, JWT Authentication, and MongoDB Atlas.

## Features

* User Registration and Login
* Secure JWT Authentication
* Real-Time Messaging with Socket.IO
* Online User Tracking
* Persistent Chat Storage with MongoDB
* Responsive and Modern User Interface
* Protected Routes

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Socket.IO Client

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Bcrypt.js
* Socket.IO

## Screenshots

### Home Page

![Home Page](./screenshots/home.png)

### Login Page

![Login Page](./screenshots/login.png)

### Register Page

![Register Page](./screenshots/Register.png)

### Chat Interface

![Chat Interface](./screenshots/chat.png)

## Installation

### Clone Repository

```bash
git clone https://github.com/Vismaycv3/connect-real-time-chat-app.git
```

### Backend Setup

```bash
cd Backend
npm install
npm start
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the Backend folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=8000
```

## Project Structure

```text
RealTimeChatApp
│
├── Backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── sockets
│   └── server.js
│
├── Frontend
│   ├── src
│   ├── pages
│   └── components
│
└── screenshots
```

## Resume Highlights

* Developed a real-time chat application featuring instant messaging, secure user authentication, and online/offline status tracking.
* Integrated Socket.IO for low-latency communication and MongoDB for efficient storage and retrieval of chat data.
* Designed a responsive user interface and optimized application performance to deliver a seamless user experience.

## Author

**Vismay C V**

GitHub: https://github.com/Vismaycv3
