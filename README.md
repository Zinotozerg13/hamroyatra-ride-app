 HamroYatra Ride App

A full-stack Uber-like ride-hailing application built with **React**, **Node.js**, **Express**, **MongoDB**, and **Socket.IO** for real-time features.

---

## Features

- User and Captain (Driver) authentication
- Location search with suggestions
- Real-time ride requests and notifications (Socket.IO)
- Live ride tracking
- Ride confirmation, start, and end flows
- Responsive UI with Tailwind CSS
-**Socket.IO** used for all real-time communication between users and captains
---

## Folder Structure

```
uber-app/
├── backend/
│   ├── controller/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── router/
│   ├── services/
│   ├── app.js
│   ├── server.js
│   ├── socket.js
│   └── .env
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── ...
    ├── .env
    └── ...
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/uber-app.git
cd uber-app
```

### 2. Setup Backend

```bash
cd backend
npm install
```

- Create a `.env` file in `/backend` with the following (example):

  ```
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/uber-app
  JWT_SECRET=your_jwt_secret
  ```

- Start the backend server:

  ```bash
  npm start
  ```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

- Create a `.env` file in `/frontend` with the following (example):

  ```
  VITE_BASE_URL=http://localhost:5000
  ```

- Start the frontend dev server:

  ```bash
  npm run dev
  ```

---

## Usage

- Open [http://localhost:5173](http://localhost:5173) in your browser.
- Register as a user or captain.
- As a user, search for locations, request rides, and track your ride.
- As a captain, receive ride requests in real-time and accept/complete rides.

---

## Technologies Used

- **Frontend:** React, Tailwind CSS, Axios, GSAP, Socket.IO-client
- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.IO
- **Real-time:** Socket.IO

---

## Development Notes

- All environment variables are managed via `.env` files (see above).
- Real-time events are handled via Socket.IO for both user and captain.
- For production, configure CORS and environment variables appropriately.

---

## License

MIT

---

## Author

- [Ronish Ranjit]((https://github.com/Zinotozerg13))
