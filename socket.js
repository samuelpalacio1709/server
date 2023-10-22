const publicRoom = "170901"
function listen(io) {
    const parkourGame = io.of('/parkourgame')
    console.log('Setting...')

    parkourGame.on('connection', (socket) => {
        console.log('A user has connected!', socket.id);
        socket.on('ready', (data) => {
            if (data.publicRoom) {
                socket.join(publicRoom);
                socket.roomID = publicRoom

                console.log('Player ready', socket.id, ' In room ', publicRoom)
            }
            else {
                if (data.customRoom === '') {
                    socket.join(data.room);
                    socket.roomID = data.room
                }
                else {
                    socket.join(data.customRoom);
                    socket.roomID = data.customRoom
                }

                console.log('Player ready', socket.id, ' In room ', data.room)
            }
        })
        socket.on('disconnect', (reason) => {

            socket.to(socket.roomID).emit('playerleft', (socket.id))
            console.log(`Client ${socket.id} disconnected ${reason}`)
            socket.leave(socket.roomID)
        })

        socket.on('playerMove', (playerInfo) => {
            socket.to(socket.roomID).emit('playerMove', (playerInfo))
        })

        socket.on('playerWon', (playerInfo) => {
            console.log('Player won!' + playerInfo.name)
            parkourGame.to(socket.roomID).emit("playerWon", playerInfo);
        })

    })

    parkourGame.adapter.on("join-room", (room, id) => {
        console.log(`socket ${id} has joined room ${room}`);
        parkourGame.to(room).emit("player-joined", { room, id });
    });

}

module.exports = {
    listen,
}