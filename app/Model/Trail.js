'use strict'

const Lucid = use('Lucid')

class Trail extends Lucid {
	points () {
    	return this.hasMany('App/Model/Point')
  	}

  	// hikes () {
  	// 	return this.hasMany('App/Model/Hike')
  	// }

}

module.exports = Trail
