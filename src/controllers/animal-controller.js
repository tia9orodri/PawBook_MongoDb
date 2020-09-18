const animalService = require('../services/animal-mongodb.js');

exports.getAnimals = (req, res) => {
    animalService
        .getAnimals()
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.getAnimal = (req, res) => {
    animalService
        .getAnimal(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.postAnimal = (req, res) => {

    animalService
        .insertAnimal(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.putAnimal = (req, res) => {
    animalService
        .updateAnimal(req.params.id, req.body)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};

exports.deleteAnimal = (req, res) => {
    animalService
        .removeAnimal(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).send(err.message));
};