const crypto = require('crypto');

//const key = 'process.env.CIPHER_KEY';
const key = 'VpO0qDdiNgzXbSkjv9KR6Po8NvKPYkkS';
exports.generateIv = () => {
    return crypto.randomBytes(8).toString('hex');
};

exports.encrypt = (data, iv) => {
    console.log("key: ",key);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    console.log("cifra ", cipher);
    return cipher.update(Buffer.from(data), 'utf8', 'hex') + cipher.final('hex');
};

exports.decrypt = (data, iv) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
};