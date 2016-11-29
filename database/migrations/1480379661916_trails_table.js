'use strict'

const Schema = use('Schema')

class TrailsTableTableSchema extends Schema {

  up () {
    this.create('trails', table => {
      table.increments()
      table.string('title').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('trails')
  }

}

module.exports = TrailsTableTableSchema
