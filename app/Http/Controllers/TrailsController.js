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

	* index (request, response){
		let trails_list = yield Trails.query().table('trails')
		response.status(200).json(trails_list)
	}

	* waypoints (request, response){
		let trail_id = request.param("trail_id")
		let waypoints_list = yield Waypoints.query().table('waypoints')
			.where("trail_id", trail_id)
		response.status(200).json(waypoints_list)
	}

}

module.exports = TrailsController
