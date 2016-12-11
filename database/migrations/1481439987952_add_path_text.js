'use strict'

const Schema = use('Schema')

class AddPathTextTableSchema extends Schema {

  up () {
    this.table('hikes', (table) => {
      table.text('path')
    })
  }

  down () {
    this.table('hikes', (table) => {
      table.dropColumn('path')
    })
  }

}

module.exports = AddPathTextTableSchema
