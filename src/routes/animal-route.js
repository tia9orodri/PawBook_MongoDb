// import dependencies and initialize the express router
const express = require('express');
const AnimalController = require('../controllers/animal-controller');
const router = express.Router();

// define routes
router.get('', AnimalController.getAnimals);
router.get('/:id', AnimalController.getAnimal);
router.post('', AnimalController.postAnimal);
router.put('/:id', AnimalController.putAnimal);
router.delete('/:id', AnimalController.deleteAnimal);

module.exports = router;