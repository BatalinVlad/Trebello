require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// cookies
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);


// routes
const authRoutes = require('./api/auth/auth.routes');
const userRoutes = require('./api/user/user.routes');
const boardRoutes = require('./api/board/board.routes');

// sockets with server
const { connectSockets } = require('./api/socket/socket.routes')
const http = require('http');
const { Server } = require('socket.io');

const app = express()

app.use(bodyParser.json());
app.use(cookieParser())
app.use(session({
    secret: 'sxjbijxixszaixsax76x87a6sxbash',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 86400000 },
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
    }),
}))

// cors
app.use(cors({
    origin: ['https://trebello.netlify.app', 'http://localhost:3000'],
    credentials: true
}));

const server = http.createServer(app);

// creating server with io
const io = new Server(server, {
    cors: {
        origin: ['https://trebello.netlify.app', 'http://localhost:3000'],
        methods: ['GET', 'POST'],
    }
});

connectSockets(io)

// routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/board', boardRoutes)



const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;
server.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});
