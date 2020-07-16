const userController = require('../controllers/user-controller');
const router = require('express').Router();

const authorize = require("../configs/authorization");



router.post('/register', userController.register);
router.post('/login', userController.login);

router.get("/animal", authorize(), userController.getAnimals);
router.post("/animal/:id", authorize(), userController.addAnimal);
router.delete("/animal/:id", authorize(), userController.removeAnimal);

module.exports = router;
