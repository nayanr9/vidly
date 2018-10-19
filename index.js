const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const Joi = require('joi');
var cors = require('cors');
const logger = require('./logger');
const authenticate = require('./authenticator');

const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(cors(
    origin = 'http://localhost:3001'
));
if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan Enabled...');
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
    res.send(JSON.stringify(genres));
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(JSON.stringify(genre));
});

function validategenre(genre){
    const schema = {
        name: Joi.string().min(3).required() 
    };
    return Joi.validate(genre, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));