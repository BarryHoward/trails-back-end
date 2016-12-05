'use strict'

const Schema = use('Schema')

class PointsTableSchema extends Schema {

  up () {
    this.create('points', table => {
      table.increments()
      table.integer('user_id').references('id').inTable('users')
      table.integer('trail_id').references('id').inTable('trails')
      table.float('lat').notNullable()
      table.float('lng').notNullable()

      table.bool('shelter').defaultTo(false)
      table.bool('water').defaultTo(false)
      table.bool('campsite').defaultTo(false)
      table.bool('view').defaultTo(false)
      table.bool('parking').defaultTo(false)
      table.bool('road').defaultTo(false)
      table.bool('resupply').defaultTo(false)

      table.string('title')
      table.text('description')
      table.string('img_url')

      table.timestamps()
    })
  }

  down () {
    this.drop('points')
  }

}

module.exports = PointsTableSchema
