'use strict'

const Trail = use('App/Model/Trail')
const Waypoint = use('App/Model/Waypoint')

class TrailsController {

	* create (request, response){
			let data = request.only('title', 'waypoints')
			let trailData = {title: data.title}

			let exists = yield Trail.findBy('title', data.title)
			let way = data.waypoints;
			if (exists){
				response.status(409).json({error: "Trail Name already taken!"})
			} else if (!way){
				response.status(400).json({error: "Can't specify a trail without waypoints!"})
			} else {
				let trail = yield Trail.create(trailData)
				let waypoints = [];

				for (var i=0; i<data.waypoints.length; i++){
					data.waypoints[i].trail_id = trail.id
					let waypoint = yield Waypoint.create(data.waypoints[i])
					waypoints.push(waypoint)
				}
				response.status(201).json({trailInfo: trail, waypoints: waypoints})
			}
	}

	* index (request, response){
		let trails_list = yield Trail.query().table('trails')
		.orderBy('created_at', 'desc')
		response.status(200).json(trails_list)
	}

	* waypoints (request, response){
		let trail_id = request.param("trail_id")
		let waypoints_list = yield Waypoint.query().table('waypoints')
			.where("trail_id", trail_id)

		// let waypoint_test = yield Trail.waypoints();
		// console.log(waypoint_test)
		response.status(200).json(waypoints_list)
	}

}

module.exports = TrailsController
