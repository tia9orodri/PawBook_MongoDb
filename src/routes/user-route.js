const express = require ('express');
const userController = require ('../controllers/user-controller');
const router=express.Router();

const authorize = require('../configs/authorization');
const roles = require('../helpers/roles.js');

//define rotas
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/edit/:id", userController.putUser);

//define rotas
router.get (""/*, authorize(roles.Admin)+*/, userController.getUsers);
router.get ("/:id"/*, authorize(roles.Admin)*/, userController.getUser);
router.put ("/:id"/*, authorize(roles.Admin)*/,userController.putUser);
router.delete ("/:id", authorize(roles.Admin),userController.deleteUser);

module.exports = router;