'use strict'

const Trail = use('App/Model/Trail')
const Waypoint = use('App/Model/Waypoint')

class TrailsController {

	* create (request, response){
		let data = request.only('title', 'path') // get new data
		let exists = yield Trail.findBy('title', data.title) // check if title already exists in database
		let trailData = {}
		if (exists){
			response.status(409).json({error: "Trail Name already taken!"})
		} else {
			trailData.title = data.title
			trailData.path = data.path
			let trail = yield Trail.create(trailData)
			response.status(201).json(trail)
		}		
	}

	* delete(request, response){
		let trail_id = request.param("trail_id") // get id of current trail
		let trail = yield Trail.findBy('id', trail_id) // get current trail
		console.log(trail)
		if (!trail){
			response.status(404).json({error: "Trail not found"})
		} else {
			// let old_waypoints = yield Waypoint.query().table('waypoints')
			// 	.where('trail_id', trail_id)

			// for (var i=0; i<old_waypoints.length; i++){
			// 	let deletedWaypoint = yield Waypoint.find(old_waypoints[i].id)
			// 	yield deletedWaypoint.delete();
			// 	console.log(deletedWaypoint)
			// }
			yield trail.delete();
			response.status(204).send()
		}

	}

	* update(request, response){
		let data = request.only('title', 'path') // get new data
		let trail_id = request.param("trail_id") // get id of current trail
		let trail = yield Trail.findBy('id', trail_id) // get current trail
		let exists = yield Trail.findBy('title', data.title) // check if title already exists in database

		if (!trail){
			response.status(404).json({error: "Trail not found"})
		} else if (trail.title !== data.title  && exists){
			response.status(409).json({error: "Trail Name already taken!"})
		} else {
			trail.title = data.title
			trail.path = data.path
			yield trail.save()
			response.status(201).json(trail)
		}
	}

	* index (request, response){
		let trails_list = yield Trail.query().table('trails')
		.orderBy('created_at', 'desc')
		let waypoint_list = yield Waypoint.query().table('waypoints')
		response.status(200).json(waypoint_list)
	}

	* single (request, response){
		let trail_id = request.param("trail_id")
		let trail = yield Trail.findBy('id', trail_id)
		// let waypoints_list = yield Waypoint.query().table('waypoints')
		// 	.select('lat', 'lng', 'totalDistance')
		// 	.where("trail_id", trail_id)
		// 	.orderBy('totalDistance', 'asc')
		response.status(200).json(trail)
	}

}

module.exports = TrailsController
