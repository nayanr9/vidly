const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [
    { id: 1, name: 'Comedy' },
    { id: 2, name: 'Romantic' },
    { id: 3, name: 'Action' },
    { id: 4, name: 'Thriller' },
    { id: 5, name: 'BioPic' },
    { id: 6, name: 'Horror' },
]

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
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

module.exports = router;