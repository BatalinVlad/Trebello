// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');

// const app = express()
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

// const authRoutes = require('./api/auth/auth.routes')
// const userRoutes = require('./api/user/user.routes')
// const boardRoutes = require('./api/board/board.routes')
// const connectSockets = require('./api/socket/socket.routes')


// app.use(cookieParser())
// app.use(bodyParser.json());
// app.use(session({
//     secret: 'sxjbijxixszaixsax76x87a6sxbash',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }))



// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.resolve(__dirname, 'public')));
// } else {
//     const corsOptions = {
//         origin: ['trebello-production.up.railway.app', 'http://localhost:8080','http://localhost:3000'],
//         credentials: true
//     };
//     app.use(cors(corsOptions));
// }



// // routes
// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes)
// app.use('/api/board', boardRoutes)
// app.get('/*', function (req, res) {
//     res.sendFile(path.resolve(__dirname, 'public/index.html'))
// })

// connectSockets(io)

// const logger = require('./services/logger.service')
// const port = process.env.PORT || 3030;
// http.listen(port, () => {
//     logger.info('Server is running on port: ' + port)
// });




// ------------------------------------------------------


require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

// const mongoose = require('mongoose');

// routes
// const reviewsRoutes = require('./routes/reviews-routes');
// const usersRoutes = require('./routes/users-routes');
// const mainChatRoutes = require('./routes/mainchat-routes');
// const productsRoutes = require('./routes/products-routes');
// const openaiRoutes = require('./routes/openai-routes');
// const dietPlanRoutes = require('./routes/dietplan-routes');

// const HttpError = require('./models/http-error');

// sockets
// const http = require('http');
// const { Server } = require('socket.io');


app.use(bodyParser.json());

app.use(cors({
    origin: ['https://fitkit-app.netlify.app', 'http://localhost:3000']
}));

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: ['https://fitkit-app.netlify.app', 'http://localhost:3000'],
//     methods: ['GET', 'POST'],
//   }
// });

// io.on("connection", (socket) => {
//   // console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     // console.log(`User with ID: ${socket.id} joined room: ${data}`);
//   });

//   socket.on("add_review", (data) => {
//     socket.to("reviews_room").emit("receive_review", data);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.chat).emit("receive_message", data);
//   });

//   socket.on("disconnect", () => {
//     // console.log("User Disconnected", socket.id);
//   });
// });

// app.use('/api/reviews', reviewsRoutes);
// app.use('/api/users', usersRoutes);
// app.use('/api/mainchat', mainChatRoutes);
// app.use('/api/openai', openaiRoutes);
// app.use('/api/products', productsRoutes);
// app.use('/api/dietPlan', dietPlanRoutes);

// app.use((req, res, next) => {
//   const error = new HttpError('Could not find this route.', 404);
//   throw error;
// });

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});


// mongoose
//     .connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.0qc0rdq.mongodb.net/${process.env.MONGO_NAME}?retryWrites=true&w=majority`)
//     .then(() => {
//         server.listen(process.env.PORT || 3001, () => {
//             console.log('SERVER IS RUNNING ON PORT:', process.env.PORT || 3001);
//         });
//     })
//     .catch(err => console.log(err));

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});