const db = require('../data/dbConfig.js')

module.exports = {
    find,
    findBy,
    findById,
    add,

}

function find(){
    return db('users')
    .select('id', 'username')
}

function findBy(filter){
    console.log(filter)
    return db('users')
        .where(filter)
        .select('id', 'username', 'password')
}

function findById(id){
    return db('users')
        .where({id})
        .select('id', 'username')
        .first()
}

function add(user){
    console.log(user)
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids
            findById(id)
        })
}