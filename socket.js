const publicRoom = 1709
function listen(io) {
    const parkourGame = io.of('/parkourgame')
    console.log('Setting...')

    parkourGame.on('connection', (socket) => {
        console.log('A user has connected!', socket.id);
        socket.on('ready', () => {

            socket.join(publicRoom);
            console.log('Player ready', socket.id, ' In room ', publicRoom)
        })
        socket.on('disconnect', (reason) => {
            socket.to(publicRoom).emit('playerleft', (socket.id))
            console.log(`Client ${socket.id} disconnected ${reason}`)
            socket.leave(publicRoom)
        })

        socket.on('playerMove', (playerInfo) => {

            socket.to(publicRoom).emit('playerMove', (playerInfo))
        })

    })

}

module.exports = {
    listen,
}