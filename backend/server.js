const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const notificationService = require('./services/notificationService');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected Locally'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Initialize Notification Service
notificationService.init(io);

// Socket.io Logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // User joins a room based on their ID for targeted notifications
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their notification room`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Clean RESTful Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/lists', require('./routes/listRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/lab-tests', require('./routes/labTestRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/prescriptions', require('./routes/prescriptionRoutes'));

app.get('/', (req, res) => {
  res.send('Hospital Management System API (Express) is running...');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.set('socketio', io);
