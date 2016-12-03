'use strict'

const Schema = use('Schema')

class PathTableSchema extends Schema {

  up () {
    this.table('trails', (table) => {
      table.text('path')
    })
  }

  down () {
    this.table('trails', (table) => {
      table.dropColumn('path')
      // opposite of up goes here
    })
  }

}

module.exports = PathTableSchema
