'use strict'

const Hike = use('App/Model/Hike')

class HikesController {

	* create (request, response){
		let user = request.authUser
		let data = request.only('trail_id', 'title', 'start_date', 'end_date', 'description', 'path')
		data.user_id = user.id
		let hike = yield Hike.create(data)
		response.status(201).json(hike)	
	}

	* index (request, response){
		let hikes_list = yield Hike.query().table('hikes')
		.orderBy('created_at', 'desc')
		response.status(200).json(hikes_list)
	}

	* indexUser(request, response){
		let user_id = request.param("user_id")
		let hikes = yield Hike.findBy('id', user_id)
		response.status(201).json(hikes)
	}

	* indexUserTrails(request, response){
		let user_id = request.param("user_id")
		let trails = yield Hike.query().table('hikes')
			.where('user_id', user_id)
			.innerJoin('trails', 'hikes.trail_id', 'trails.id')
			.groupBy('trails.id')
		response.status(201).json(trails)	
	}

	* indexUserTrailHikes(request, response){
		let user_id = request.param("user_id")
		let trail_id = request.param('trail_id')
		let hikes = yield Hike.query().table('hikes')
			.where('user_id', user_id)
			.where('trail_id', trail_id)
		response.status(201).json(hikes)	
	}


	* update(request, response){
		let user = request.authUser;
		let data = request.only('title', 'start_date', 'end_date', 'description', 'path')	
		let hike_id = request.param("hike_id") // get id of current hike
		let hike = yield Hike.findBy('id', hike_id) // get current hike

		if (!hike){
			response.status(404).json({error: "Hike not found"})
		} else if (hike.user_id !== user.id){
			response.status(403).json({error: "Hike does not belong to user"})
		} else {
			hike.fill(data)
			yield hike.save()
			response.status(201).json(hike)
		}
	}

	* delete(request, response){
		let user = request.authUser;
		let hike_id = request.param("hike_id") // get id of current hike
		let hike = yield Hike.findBy('id', hike_id) // get current hike
		if (!hike){
			response.status(404).json({error: "Hike not found"})
		} else if (hike.user_id !== user.id){
			response.status(403).json({error: "Hike does not belong to user"})
		} else {
			yield hike.delete();
			response.status(204).send()
		}
	}




}

module.exports = HikesController
