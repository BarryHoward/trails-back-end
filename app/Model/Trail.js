'use strict'

const Lucid = use('Lucid')

class Trail extends Lucid {
	waypoints () {
    	return this.hasMany('App/Model/Waypoint')
  	}

}

module.exports = Trail
