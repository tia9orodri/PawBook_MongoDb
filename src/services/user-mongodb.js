const db = require('../configs/mongodb.js').getDB();
const ObjectId = require('mongodb').ObjectID;
const cipher = require("../helpers/cipher");
const roles = require("../helpers/roles");

exports.register = (username, rawPassword, email, name, role) => {
  return new Promise((resolve, reject) => {
    try {
      db.collection("users")
        .findOne({ username: username })
        .then((found) => {
          if (!found) {
            console.log("not found", role);
            if (Object.values(roles).indexOf(role) > -1) {
              console.log("role valido ", role);
              if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*#?&-.]{8,}$/.test(rawPassword)) {
                console.log("valid password");
                const dataIv = cipher.generateIv();
                console.log("IV generated");
                const password = cipher.encrypt(rawPassword, dataIv);
                console.log("inserting user");
                db.collection("users")
                  .insertOne({ username, password, email, name, role, dataIv })
                  .then(() => {
                    console.log("resolve");
                    resolve();
                    
                  })
                  .catch((error) => {
                    console.log("reject", JSON.stringify(error,null,4));
                    reject(error.message);
                  });
              } else
                reject("invalid password + 123");
            } else reject(role);
          } else reject("username already in use");
        })
        
        .catch((error) => {
          console.log("erro => ", JSON.stringify(error,null,4));
          reject(error.message);
        });
    } catch (error) {
      console.log("catching=>   ", JSON.stringify(error, null, 4) );
      reject(error.message);
    }
  });
};

exports.authenticate = (username, rawPassword) => {
  return new Promise((resolve, reject) => {
    db.collection("users")
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

exports.getUsers = (queryString) => {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (queryString.search) {
      filter.user = { $regex: new RegExp(queryString.search, "i") };
    }
    db
      .collection("users")
      .find(filter)
      .project({ '_id': 1, 'username': 1, 'role': 1, 'email': 1, 'name': 1 })
      .toArray()
      .then(users => resolve(users))
      .catch(err => reject(err));
  });
};

exports.getUser = id => {
  return new Promise((resolve, reject) => {
    db
      .collection("users")
      .findOne({ _id: ObjectId(id) })
      .then(user => resolve(user))
      .catch(err => reject(err));
  });
};

exports.updateUser = (id, body) => {
  return new Promise((resolve, reject) => {
    db
      .collection("users")
      .updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            username: body.username,
            role: body.role,
            email: body.email,
            name: body.name
          },
        }
      )
      .then(() => resolve({ updated: 1 }))
      .catch(err => reject(err));
  });
};

exports.deleteUser = id => {
  return new Promise((resolve, reject) => {
    db
      .collection("users")
      .deleteOne(
        { _id: ObjectId(id) },
      )
      .then(() => resolve({ removed: 1 }))
      .catch(err => reject(err));
  });
};