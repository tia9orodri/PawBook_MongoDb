const animals = require('./animals.json');

exports.getAnimals = () => {
    return new Promise((resolve, reject) => {
        resolve(animals);
    });
};
exports.getAnimal = id => {
    return new Promise((resolve, reject) => {
        resolve(animals.find(animal => animal._id === id));
    });
};
exports.addAnimal = animal => {
    return new Promise((resolve, reject) => {
        resolve({ inserted: 1 });
    });
};
exports.updateAnimal = (id, animal) => {
    return new Promise((resolve, reject) => {
        resolve({ updated: 1 });
    });
};
exports.deleteAnimal = id => {
    return new Promise((resolve, reject) => {
        resolve({ deleted: 1 });
    });
}; 