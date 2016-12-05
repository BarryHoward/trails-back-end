'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  trails () {
  	return this.hasMany('App/Model/Trail')
  }

  points() {
  	return this.hasMany('App/Model/Point')
  }

  // hikes() {
  // 	return this.hasMany('App/Model/Hike')
  // }

}

module.exports = User
