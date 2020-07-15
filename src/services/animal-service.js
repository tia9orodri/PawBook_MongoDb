const db = require('../configs/mongodb.js').getDB();
const ObjectId = require('mongodb').ObjectID;

exports.getAnimals = () => {
    return new Promise((resolve, reject) => {
        db
            .collection('animals')
            .find()
            .project({ 'nome': 1, 'idade': 1 })
            .toArray()
            .then(animals => resolve(animals))
            .catch(err => reject(err));
    });
};

exports.getAnimal = id => {
    return new Promise((resolve, reject) => {
        db
            .collection('animals')
            .findOne({ _id: ObjectId(id) })
            .then(animal => resolve(animal))
            .catch(err => reject(err));
    });
};

exports.insertAnimal = body => {
    return new Promise((resolve, reject) => {
        db
            .collection('animals')
            .insertOne({ nome: body.nome, idade: body.idade, localidade: body.localidade, distrito: body.distrito })
            .then(res => resolve({ inserted: 1, _id: res.insertedId }))
            .catch(err => reject(err));
    });
};
