'use strict'

const Schema = use('Schema')

class MileColumnTableSchema extends Schema {

  up () {
    this.table('waypoints', (table) => {
      table.float('total_distance')
    })
  }

  down () {
    this.table('mile_column', (table) => {
      table.dropColumn('total_distance')
      // opposite of up goes here
    })
  }

}

module.exports = MileColumnTableSchema
