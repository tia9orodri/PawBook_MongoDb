const jwt = require('jsonwebtoken');
const key = process.env.JWT_KEY;

exports.createToken = (payload) => {
    return new Promise((resolve, reject) => {
        const options = { expiresIn: '8h', issuer: 'animals' };
        jwt.sign(payload, key, options, (error, token) => {
            if (error) reject(error);
            else resolve({ token, ...payload });
        });
    });
};

exports.validateToken = (token) => {
    return new Promise((resolve, reject) => {
        let options = { issuer: 'animals' };
        jwt.verify(token, key, options, (error, payload) => {
            if (error) reject(error);
            else resolve(payload);
        });
    });
};