const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

const geners = [
    { id: 1, name: 'Comedy' },
    { id: 2, name: 'Romantic' },
    { id: 3, name: 'Action' },
    { id: 4, name: 'Thriller' },
    { id: 5, name: 'BioPic' },
    { id: 6, name: 'Horror' },
]

app.get('/api/geners', (req, res) => {
    res.send(geners);
});

app.get('/api/geners/:id', (req, res) => {
    const gener = geners.find(g => g.id === parseInt(req.params.id));
    if (!gener) return res.status(404).send('The gener with the given ID was not found.');
    res.send(gener);
});

function validateGener(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));