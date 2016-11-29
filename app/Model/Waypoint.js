'use strict'

const Lucid = use('Lucid')

class Waypoint extends Lucid {
	trail () {
    	return this.belongsTo('App/Model/Trail')
  	}
}

module.exports = Waypoint
