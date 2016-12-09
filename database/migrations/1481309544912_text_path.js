'use strict'

const Schema = use('Schema')

class TextPathTableSchema extends Schema {

  up () {
    this.table('hikes', (table) => {
      table.dropColumn('path')
      table.text('path').notNullable()
    })
  }

  down () {
    this.table('hikes', (table) => {
      table.dropColumn('path')
      table.string('path').notNullable()
    })
  }

}

module.exports = TextPathTableSchema
