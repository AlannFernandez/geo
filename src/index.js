const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const engine = require('ejs-mate');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

// configuraciones
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// middlewares

// rutas
app.use(require('./routes'));

// sockets
require('./sockets')(io);

// archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// inicio de servidor
server.listen(3000, () => {
  console.log('Servidor en puerto', 3000);
});
