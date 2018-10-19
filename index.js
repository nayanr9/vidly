const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

app.use(function(req, res, next){
    console.log();
});

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