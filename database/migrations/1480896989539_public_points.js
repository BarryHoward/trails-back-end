'use strict'

const Schema = use('Schema')

class PublicPointsTableSchema extends Schema {

  up () {
    this.table('points', (table) => {
      table.bool('public').defaultTo(false)
    })
  }

  down () {
    this.table('points', (table) => {
      table.dropColumn('public')
    })
  }

}

module.exports = PublicPointsTableSchema
