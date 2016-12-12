'use strict'

const Schema = use('Schema')

class UserColumnsTableSchema extends Schema {

  up () {
    this.table('users', (table) => {
      table.text('info')
      table.text('img_url')
      table.integer('trails_created')
      table.integer('trails_hiked')
      table.integer('hikes')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('info')
      table.dropColumn('img_url')
      table.dropColumn('hikes')
    })
  }

}

module.exports = UserColumnsTableSchema
