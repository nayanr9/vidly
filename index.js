const config = require('config');
const helmet = require('helmet');
const debug = require('debug')('app:startup');
const morgan = require('morgan');
const express = require('express');
const Joi = require('joi');
var cors = require('cors');
const logger = require('./logger');

const app = express();

debug(`NODE_ENV: ${process.env.NODE_ENV}`);
debug(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(cors(
    origin = 'http://localhost:3001'
));

//Configuration
debug('Application Name: ' + config.get('name'));
debug('Mail Server: ' + config.get('mail.host'));

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug('Morgan Enabled...');
}

app.use(logger);

const genres = [
    { id: 1, name: 'Comedy' },
    { id: 2, name: 'Romantic' },
    { id: 3, name: 'Action' },
    { id: 4, name: 'Thriller' },
    { id: 5, name: 'BioPic' },
    { id: 6, name: 'Horror' },
]

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

function validategenre(genre){
    const schema = {
        name: Joi.string().min(3).required() 
    };
    return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));