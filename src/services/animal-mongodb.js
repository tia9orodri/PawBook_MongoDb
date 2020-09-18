const db = require("../configs/mongodb.js").getDB();
const ObjectId = require("mongodb").ObjectID;


exports.getAnimals = (/*queryString*/) => {
    return new Promise((resolve, reject) => {
        let filter = {};
        /* if (queryString.search) {
             filter.title = { $regex: new RegExp(queryString.search, "i") };
         }*/
        db.collection("animals").find(filter).project({ nome: 1, idade: 1 }).toArray()
            .then((animals) => resolve(animals))
            .catch((err) => reject(err));
    });
};

exports.getAnimal = (id) => {
    return new Promise((resolve, reject) => {
        db.collection("animals")
            .findOne({ _id: ObjectId(id) })
            .then((animal) => resolve(animal))
            .catch((err) => reject(err));
    });
};

exports.insertAnimal = (body) => {
    return new Promise((resolve, reject) => {
        db.collection("animals")
            .insertOne({
                nome: body.nome,
                tipo: body.tipo,
                idade: body.idade,
                raca: body.raca,
                localidade: body.localidade,
                observacoes: body.observacoes
            })
            .then((res) =>  resolve({ inserted: 1, _id: res.insertedId})) 
            .catch((err) => reject(err));
    });
};

exports.updateAnimal = (id, body) => {
    return new Promise((resolve, reject) => {
        db.collection("animals")
            .updateOne(
                { _id: ObjectId(id) },
                {
                    $set: {
                        nome: body.nome,
                        tipo: body.tipo,
                        idade: body.idade,
                        raca: body.raca,
                        localidade: body.localidade,
                        observacoes: body.observacoes
                    },
                }
            )
            .then(() => resolve({ updated: 1 }))
            .catch((err) => reject(err));
    });
};

exports.removeAnimal = (id) => {
    return new Promise((resolve, reject) => {
        db.collection("animals")
            .deleteOne({ _id: ObjectId(id) })
            .then(() => resolve({ removed: 1 }))
            .catch((err) => reject(err));
    });
};