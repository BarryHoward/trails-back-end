'use strict'

const Schema = use('Schema')

class HikesTableTableSchema extends Schema {

  up () {
    this.table('hikes_table', (table) => {
      // alter hikes_table table
    })
  }

  down () {
    this.table('hikes_table', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = HikesTableTableSchema
