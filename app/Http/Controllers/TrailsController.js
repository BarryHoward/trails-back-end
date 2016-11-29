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

	* delete(request, response){
		let data = request.only('title', 'waypoints') // get new data
		let trail_id = request.param("trail_id") // get id of current trail
		let trail = yield Trail.findBy('id', trail_id) // get current trail

		if (!trail){
			response.status(404).json({error: "Trail not found"})
		} else {
			let old_waypoints = yield Waypoint.query().table('waypoints')
				.where('trail_id', trail_id)

			for (var i=0; i<old_waypoints.length; i++){
				let deletedWaypoint = yield Waypoint.find(old_waypoints[i].id)
				yield deletedWaypoint.delete();
				console.log(deletedWaypoint)
			}


			yield trail.delete();
			console.log("deleted")
			response.status(204).send()
		}

	}

	* update(request, response){
		let data = request.only('title', 'waypoints') // get new data
		let trail_id = request.param("trail_id") // get id of current trail
		let trail = yield Trail.findBy('id', trail_id) // get current trail
		let exists = yield Trail.findBy('title', data.title) // check if title already exists in database

		if (!trail){
			response.status(404).json({error: "Trail not found"})
		} else if (trail.title !== data.title  && exists){
			response.status(409).json({error: "Trail Name already taken!"})
		} else if (!data.waypoints){
			response.status(400).json({error: "Can't specify a trail without waypoints!"})
		} else {
			trail.title = data.title
			yield trail.save()
			
			// delete old waypoints
			const old_waypoints = yield Waypoint.query().table('waypoints')
				.where('trail_id', trail_id)

			for (var i=0; i<old_waypoints.length; i++){
				let deletedWaypoint = yield Waypoint.find(old_waypoints[i].id)
				yield deletedWaypoint.delete();
			}

			// make new waypoints
			let waypoints = [];
			for (var i=0; i<data.waypoints.length; i++){
				data.waypoints[i].trail_id = trail.id
				let waypoint = yield Waypoint.create(data.waypoints[i])
				waypoints.push(waypoint)
			}

			const new_waypoints = yield Waypoint.query().table('waypoints')
				.where('trail_id', trail_id)
			response.status(201).json({trailInfo: trail, waypoints: new_waypoints})
		}
	}

	* index (request, response){
		let trails_list = yield Trail.query().table('trails')
		.orderBy('created_at', 'desc')
		response.status(200).json(trails_list)
	}

	* single (request, response){
		let trail_id = request.param("trail_id")
		let trail = yield Trail.findBy('id', trail_id)
		let waypoints_list = yield Waypoint.query().table('waypoints')
			.select('lat', 'lng')
			.where("trail_id", trail_id)
		response.status(200).json({trailInfo: trail, waypoints: waypoints_list})
	}

}

module.exports = TrailsController
