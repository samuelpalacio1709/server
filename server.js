const api = require('./api.js');
const fs = require('fs')
const options = {
    key: fs.readFileSync('/opt/opt/bitnami/apache/conf/servers-sam.space.key'),
    cert: fs.readFileSync('/opt/bitnami/apache/conf/servers-sam.space.crt'),
};

const server = require('https').createServer(options, api);
const PORT = 3000;
const sockets = require('./socket.js')


const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    },
    transports: ['websocket'], // specify WebSocket as the transport

});

sockets.listen(io)

server.listen(PORT, () => {
    console.log('Listening on PORT ' + PORT);
})