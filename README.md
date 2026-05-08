# Hospital Management System (HQMS)

A modern, full-stack Hospital Management System implemented with Express.js, MongoDB, and Flutter .

## 🏗️ Architecture

- **Frontend**: Flutter (Mobile App) located in `/frontend`
- **Backend**: Express.js (Service Oriented Architecture) located in `/backend`
- **Database**: MongoDB (Local or Atlas)
- **Real-time**: Socket.io for live notifications
- **Security**: JWT (JSON Web Tokens) for protected API access

## 📂 Project Structure

```text
HQMS/
├── backend/            # Express.js Server
│   ├── controllers/    # Request handlers
│   ├── services/       # Business logic (SOA)
│   ├── models/         # Mongoose schemas
│   ├── middleware/     # Auth & security
│   └── routes/         # RESTful endpoints
└── frontend/           # Flutter Mobile App
    ├── lib/            # Dart source code
    ├── assets/         # Images, fonts, etc.
    └── ...             # Platform specific files
```

## 🚀 Getting Started

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/hospital_ms
   JWT_SECRET=your_super_secret_key
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Get Flutter dependencies:
   ```bash
   flutter pub get
   ```
3. Run the app:
   ```bash
   flutter run
   ```

## 🛠️ Key Features

- **Secure Authentication**: JWT-based login and registration.
- **Appointment Management**: Patients can book, update, and cancel appointments.
- **Medical Records**: Access lab tests and prescriptions securely.
- **Payments**: Integrated Stripe-ready payment logic.
- **Real-time Alerts**: Socket.io rooms for instant doctor/patient notifications.
