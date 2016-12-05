'use strict'

const Schema = use('Schema')

class RemoveWaypointsTableSchema extends Schema {

  down () {
    this.create('waypoints', (table) => {
      table.increments()
      table.integer('trail_id').unsigned().references('id').inTable('trails')
      table.float('lat')
      table.float('lng')
      table.timestamps()
    })
  }

  up () {
    this.drop('waypoints', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = RemoveWaypointsTableSchema
