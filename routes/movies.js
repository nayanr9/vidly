const express = require('express');
const router = express.Router();
const Joi = require('joi');

const movies = [
    { id: 1, name: 'Hungama', genre: 'Comedy' },
    { id: 2, name: 'Munna Bhai M.B.B.S', genre: 'Romantic'},
    { id: 3, name: 'Baby\'s Day out', genre: 'Action'},
    { id: 4, name: 'Dhol', genre: 'Thriller'},
    { id: 5, name: 'Dhamal', genre: 'BioPic'},
    { id: 6, name: 'Dumb and Dumber', genre: 'Horror'},
    { id: 7, name: 'Welcome', genre: 'Comedy' }
]

router.get('/', (req, res) => {
    res.send(movies);
});

router.get('/:genre', (req, res) => {
    const movie = movies.filter(g => g.genre === req.params.genre);
    if (!movie) return res.status(404).send('Movies with the given genre was not found.');
    res.send(movie);
});

module.exports = router;