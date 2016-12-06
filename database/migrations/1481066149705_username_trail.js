'use strict'

const Schema = use('Schema')

class UsernameTrailTableSchema extends Schema {

  up () {
    this.table('trails', (table) => {
      table.string('username')
    })
  }

  down () {
    this.table('trails', (table) => {
      table.dropColumn('username')
    })
  }

}

module.exports = UsernameTrailTableSchema
