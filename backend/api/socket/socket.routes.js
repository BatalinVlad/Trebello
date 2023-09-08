
// module.exports = connectSockets

// function connectSockets(io) {
//     io.on('connection', socket => {
//         console.log('here');

//         socket.on("disconnect", () => {
//             // console.log("User Disconnected", socket.id);
//         });
//     })

//     // console.log(`User Connected: ${socket.id}`);
//     //     socket.on('boardUpdate', (board) => {
//     //         socket.broadcast.to(socket.boardId).emit('updateBoard', board);
//     //     })
//     //     socket.on('boardId', boardId => {
//     //         if (socket.boardId) {
//     //             socket.leave(socket.boardId)
//     //         }
//     //         socket.join(boardId)
//     //         socket.boardId = boardId;
//     //     })
//     //     socket.on('sendNotification', (notification) => {
//     //         socket.broadcast.to(socket.boardId).emit('getNotification', notification);
//     //     })
//     // })
// }

const connectSockets = (io) => {
    io.on('connection', socket => {
        console.log(`User Connected: ${socket.id}`);

        socket.on("disconnect", () => {
            // console.log("User Disconnected", socket.id);
        });
        socket.on('boardUpdate', (board) => {
            console.log(`User with id: ${socket.id} updated board`);
            socket.to(socket.boardId).emit('updateBoard', board);
        })
        socket.on('boardId', boardId => {
            console.log(`User: ${socket.id} joined to board with id: ${boardId}`);
            if (socket.boardId) {
                socket.leave(socket.boardId)
            }
            socket.join(boardId)
            socket.boardId = boardId;
        })
        socket.on('sendNotification', (notification) => {
            socket.broadcast.to(socket.boardId).emit('getNotification', notification);
        })
    })
}

exports.connectSockets = connectSockets