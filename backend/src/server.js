const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

//para funcionar o websocket
const socketio = require('socket.io');
const http = require('http');

const app = express();

//para funcionar o websocket
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://aircnc:aircnc@aircnc-ggkux.mongodb.net/AirCnC?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connectedUsers = {}; //relação de id do socket com id do usuario
io.on('connection', socket =>{
    const user_id = socket.handshake.query.user_id;
    console.log('Socket Conectado: ', socket.id);  
    console.log('Usuario Conectado: ', user_id);      

    //armazena id do socket do usuario
    connectedUsers[user_id] = socket.id;

    //ping-pong para evitar a perda da conexao
    //'pong' é reservado
    socket.on('_pong', data => {
        console.log('Pong received from client', socket.id);
    });
    
});

//envia ping a cada x milisegundos
const pingFrequency = 8000;
function sendPing(){
    console.log('Sending ping to clients');
    setTimeout(sendPing, pingFrequency);
    io.sockets.emit('_ping', { beat : 1 });
}
setTimeout(sendPing, pingFrequency);

//faz com que todas requisicoes tenham as informações io e connectedUsers disponiveis, em todas rotas
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next(); //necessario para nao travar aqui
})

app.use(cors()); //pode-se determinar aqui, nos parametros do cors, quem pode acessar a API
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

//app.listen(3333); //pode ser assim caso nao tenha nada com socket
server.listen(3333); //porta onde esta rodando -> localhost:3333 para testar