const api = require('./api.js');

const server = require('https').createServer(api);
const PORT = 3000;
const sockets = require('./socket.js')


const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    },
    transports: ['websocket'],

});

sockets.listen(io)

server.listen(PORT, () => {
    console.log('Listening on PORT ' + PORT);
})