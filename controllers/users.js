const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });

};
const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const createUser = async (rep, res) => {
    //#swagger.tags=['Users']
    const user = {
        firstName: rep.body.firstName,
        lastName: rep.body.lastName,
        email: rep.body.email,
        favoriteColor: rep.body.favoriteColor,
        birthday: rep.body.birthday,
    };

    const response = await mongodb.getDatabase().db().collection('users').replaceOne(user)
    if (response,acknowledged) {
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occured while updating user')  
    }
};

const updateUser = async (rep, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: rep.body.firstName,
        lastName: rep.body.lastName,
        name: req.body.name,
        ipaddress: req.body.ipaddress
    };

    const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user)
    if (response,modifiedCount > 0) {
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occured while updating user')  
    }
};

const deleteUser = async (rep, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId })
    if (response,deletedCount > 0) {
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occured while updating user')  
    }
};




module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
}