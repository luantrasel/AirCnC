const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');

const app = express();

mongoose.connect('mongodb+srv://aircnc:aircnc@aircnc-ggkux.mongodb.net/AirCnC?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors()); //pode-se determinar aqui, nos parametros do cors, quem pode acessar a API
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333); //porta onde esta rodando -> localhost:3333 para testar