'use strict'

const Schema = use('Schema')

class TrailDetailsTableSchema extends Schema {

  up () {
    this.table('trails', (table) => {
      table.integer('user_id').references('id').inTable('users')
      table.float('max_elevation')
      table.float('min_elevation')
      table.float('distance')
      table.text('description')
      table.string('img_url')
    })
  }

  down () {
    this.table('trails', (table) => {
      table.dropColumn('user_id')
      table.dropColumn('max_elevation')
      table.dropColumn('min_elevation')
      table.dropColumn('distance')
      table.dropColumn('description')
      table.dropColumn('img_url')
    })
  }

}

module.exports = TrailDetailsTableSchema
