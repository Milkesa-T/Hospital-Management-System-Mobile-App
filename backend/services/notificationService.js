let io;

const init = (socketIoInstance) => {
  io = socketIoInstance;
};

const notifyUser = (userId, event, data) => {
  if (io) {
    io.to(userId.toString()).emit(event, data);
    console.log(`Notification sent to user ${userId}: ${event}`);
  } else {
    console.warn('Socket.io not initialized in notificationService');
  }
};

const notifyAll = (event, data) => {
  if (io) {
    io.emit(event, data);
  }
};

module.exports = {
  init,
  notifyUser,
  notifyAll
};
