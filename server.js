const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('cors');
const cors = require('cors');
const passport = require('passport');

const port = process.env.PORT || 3000;

const usersRoutes = require('./routes/userRoutes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port', port);

usersRoutes(app);

server.listen(3000, '192.168.100.18' || 'localhost', function () {
    console.log('Aplicación de NodeJS ' + process.pid + ' Iniciada...');
});

app.get('/', (req, res) => {
    res.send('Ruta raiz del Backend');
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
})