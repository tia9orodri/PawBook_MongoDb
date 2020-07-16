exports.register = (username, rawPassword, role) => {
    return new Promise((resolve, reject) => {
        try {
            db.collection('users').findOne({ username: username }).then((found) => {
                if (!found) {
                    if (Object.values(roles).indexOf(role) > -1) {
                        if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*#?&-.]{8,}$/.test(rawPassword)) {
                            const dataIv = cipher.generateIv();
                            const password = cipher.encrypt(rawPassword, dataIv);
                            db.collection('users').insertOne({ username, password, role, dataIv })
                                .then(() => resolve())
                                .catch((error) => reject(error.message));
                        } else reject('invalid password');
                    } else reject('invalid role');
                } else reject('username already in use');
            }).catch((error) => reject(error.message));
        } catch (error) { reject(error.message); }
    });
};

exports.authenticate = (username, rawPassword) => {
    return new Promise((resolve, reject) => {
        db.collection('users')
            .findOne({ username: username })
            .then((user) => {
                if (user) {
                    const password = cipher.decrypt(user.password, user.dataIv);
                    if (password == rawPassword) resolve({ _id: user._id, role: user.role });
                }
                reject(new Error("username and password don't match"));
            })
            .catch((error) => reject(error));
    });
};

exports.getAnimals = (userId) => {
    return new Promise((resolve, reject) => {
        db.collection("users")
            .findOne({ _id: ObjectId(userId) })
            .then((user) => {
                if (user.animals) {
                    return db.collection("animals")
                        .find({ _id: { $in: user.animals } })
                        .project({ nome: 1, idade: 1 })
                        .toArray();
                } else return [];
            })
            .then((animals) => resolve(animals))
            .catch((err) => reject(err));
    });
};

exports.addAnimal = (userId, animalId) => {
    return new Promise((resolve, reject) => {
        db.collection("users")
            .updateOne({ _id: ObjectId(userId) }, { $push: { animals: ObjectId(animalId) } })
            .then(() => resolve())
            .catch((err) => reject(err));
    });
};
exports.removeAnimal = (userId, animalId) => {
    return new Promise((resolve, reject) => {
        db.collection("users")
            .updateOne({ _id: ObjectId(userId) }, { $pull: { animals: ObjectId(animalId) } })
            .then(() => resolve())
            .catch((err) => reject(err));
    });
};