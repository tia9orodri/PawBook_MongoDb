const userService = require('../services/user-service.js');
const jwt = require('../helpers/jwt.js');

exports.register = (req, res) => {
    userService
        .register(req.body.username, req.body.password, req.body.role)
        .then(() => res.sendStatus(200))
        .catch((message) => res.status(500).send(message));
};

exports.login = (req, res) => {
    userService
        .authenticate(req.body.username, req.body.password)
        .then((payload) => jwt.createToken(payload))
        .then((data) => res.json(data))
        .catch((error) => res.status(500).send(error.message));
};