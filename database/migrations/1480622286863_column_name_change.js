'use strict'

const Schema = use('Schema')

class ColumnNameChangeTableSchema extends Schema {

  up () {
    this.table('waypoints', (table) => {
      table.dropColumn('total_distance')
      table.float('totalDistance')
    })
  }

  down () {
    this.table('mile_column', (table) => {
      table.float('total_distance')
      table.dropColumn('totalDistance')
      // opposite of up goes here
    })
  }

}

module.exports = ColumnNameChangeTableSchema
