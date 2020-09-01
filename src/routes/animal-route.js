// import dependencies and initialize the express router
const express = require('express');
const AnimalController = require('../controllers/animal-controller');
const router = express.Router();

const authorize = require('../configs/authorization');
const roles = require('../helpers/roles.js');


// define routes
router.get('', /*authorize(),*/AnimalController.getAnimals);
router.get('/:id', authorize(),AnimalController.getAnimal);
router.post('', authorize(roles.Boss),AnimalController.postAnimal);
router.put('/:id', authorize(roles.Boss),AnimalController.putAnimal);
router.delete('/:id', authorize(roles.Boss),AnimalController.deleteAnimal);

module.exports = router;