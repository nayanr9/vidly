const config = require('config');
const helmet = require('helmet');
const debug = require('debug')('app:startup');
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const genres = require('./routes/genres');
const movies = require('./routes/movies');

const app = express();

debug(`NODE_ENV: ${process.env.NODE_ENV}`);
debug(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use(cors(
    origin = 'http://localhost:3001'
));

// const p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1);
//         // reject(new Error('message'));
//     }, 2000);
// });

// p
//     .then(result => console.log(';jihugyu', result))
//     .catch(err => console.log('Erroorororojiaohusdyuvror', err.message));

//Configuration
debug('Application Name: ' + config.get('name'));
debug('Mail Server: ' + config.get('mail.host'));

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug('Morgan Enabled...');
}

app.use(logger);

const port = 8080;//process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));