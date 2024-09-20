const dotenv = require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDB = (callback) => {
    if(database) {
        console.log('Db is already Initilized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
        database = client;
        callback(null, database);
    })
    .catch((err) => {
        callback(err);
    })
};

const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized')
    }
    return database
};

module.exports = {
    initDB,
    getDatabase
}
