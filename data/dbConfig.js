// Imports
const knex = require('knex')
const config = require('../knexfile.js')

const env = process.env.DB_ENV || 'development'
// Select development object 
const db = knex(config[env])

module.exports = db