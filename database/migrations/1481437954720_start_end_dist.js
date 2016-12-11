'use strict'

const Schema = use('Schema')

class StartEndDistTableSchema extends Schema {

  up () {
    this.table('hikes', (table) => {
      table.float('start'),
      table.float('end')
      table.float('distance')
    })
  }

  down () {
    this.table('hikes', (table) => {
      table.dropColumn('start')
      table.dropColumn('end')
      table.dropColumn('distance')
    })
  }

}

module.exports = StartEndDistTableSchema
