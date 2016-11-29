'use strict'

const Trail = use('App/Model/Trail')
const Waypoint = use('App/Model/Waypoint')

class TrailsController {

	* create (request, response){
			let data = request.only('title', 'waypoints')
			let trailData = {title: data.title}
			let trail = yield Trail.create(trailData)
			let waypoints = [];

			for (var i=0; i<data.waypoints.length; i++){
				data.waypoints[i].trail_id = trail.id
				let waypoint = yield Waypoint.create(data.waypoints[i])
				waypoints.push(waypoint)
			}
			response.status(201).json({trail: trail, waypoints: waypoints})
	}

}

module.exports = TrailsController
