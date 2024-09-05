const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./config/dbConfig');
const contactRoutes = require('./routes/contactRoutes');
const http = require('http');  // Import http for the server
const { Server } = require('socket.io'); // Import socket.io

// Middleware
const app = express();
const port = 3000;

// Create an HTTP server
const server = http.createServer(app);

// Set up socket.io on the HTTP server
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
  }
});

app.use(bodyParser.json());
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

// Connect to MongoDB
dbConfig();

// Use routes
app.use('/contacts', contactRoutes);

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for messages from the client
  socket.on('message', (data) => {
    console.log('Message received:', data);

    // Send a message back to the client
    socket.emit('message', `Hello from server! Received your message: ${data}`);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server with socket.io
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
