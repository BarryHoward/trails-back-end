'use strict'

const Schema = use('Schema')

class DropPathStringTableSchema extends Schema {

  up () {
    this.table('hikes', (table) => {
      table.dropColumn('path')
    })
  }

  down () {
    this.table('hikes', (table) => {
      table.text('path')
    })
  }

}

module.exports = DropPathStringTableSchema
