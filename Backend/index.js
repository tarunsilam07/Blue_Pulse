const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const cookieParser = require('cookie-parser');
const dataRoute = require('./routes/dataRoute');
const http = require('http');
const socketIo = require('socket.io');
const pastRoute=require('./routes/pastRoute')
const bodyParser=require('body-parser')

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/BluePulse')
  .then(() => console.log(`MongoDB connected Successfully`))
  .catch((err) => console.log('error', err));

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}));

app.use('/', authRoute);
app.use('/', dataRoute); 
app.use('/api',pastRoute);

app.set('io', io);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});