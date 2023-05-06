const mongodb = require('mongodb')
const getDB = require('../util/database').getDB
const db = require('../util/database').getDB
class User {
    constructor(username, email) {
        this.name = username,
            this.email = email
    }
    save() {
        const db = getDB();
        db.collection("users").insertOne(this)
    }
    static findById(userId) {
        const db = getDB();
        return db
            .collection("users")
            .findOne({ _id: new mongodb.ObjectId(userId) })
            .then((user) => {
                return user
            })
            .catch((err) => {
                console.log(err)
            })

    }
}
module.exports = User;