
exports.up = function(knex) {
  return knex.schema.createTable('auth', tbl => {
      tbl.increments()
      tbl.string('username')
        .unique()
        .notNullable()
      tbl.string('password')
        .notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists()
};
