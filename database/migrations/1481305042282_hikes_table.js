'use strict'

const Schema = use('Schema')

class HikesTableTableSchema extends Schema {

  up () {
    this.create('hikes', (table) => {
      table.increments()
      table.integer('user_id').references('id').inTable('users')
      table.integer('trail_id').references('id').inTable('trails')

      table.date('start_date')
      table.date('end_date')

      table.string('path').notNullable()
      table.string('title')
      table.text('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('hikes')
  }

}

module.exports = HikesTableTableSchema
