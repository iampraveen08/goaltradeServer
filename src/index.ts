import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Server } from 'ws';
import http from 'http';

import authRoutes from './routes/auth';
import strategyRoutes from './routes/strategies';
import positionRoutes from './routes/positions';
import marketRoutes from './routes/market';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new Server({ server });

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/goaltrade')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/strategies', strategyRoutes);
app.use('/api/positions', positionRoutes);
app.use('/api/market', marketRoutes);

// WebSocket for real-time updates
wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');
  
  ws.on('message', (message) => {
    console.log('Received:', message.toString());
  });

  ws.on('close', () => {
    console.log('Client disconnected from WebSocket');
  });
});

// Broadcast market data to all connected clients
export const broadcastMarketData = (data: any) => {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });
};

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 6000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
