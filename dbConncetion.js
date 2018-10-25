const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/genres')
    .then(() => console.log('Connected to mongodb....'))
    .catch(err => console.error('Could not connect to mongodb...', e));

const genreSchema = new mongoose.Schema({
    id: String,
    name: String,
});

const Gener = mongoose.model('Genre', genreSchema);

async function createGenre() {
    const gener = new Gener({
        id: '2',
        name: 'Comedy'
    });

    const result = await gener.save();
    console.log(result);
}

async function getGeners() {
    const geners = await Gener.find()
        .limit(10)
        .sort({ name: -1 });
    console.log(geners);
}

getGeners();
