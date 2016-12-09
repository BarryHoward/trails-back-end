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

	// * index(request, response){
	// 	let trail_id = request.param("trail_id")
	// 	let hikes = yield hike.query().table('hikes')
	// 		.where('trail_id', trail_id)
	// 	response.status(200).json(hikes)
	// }

	// * show (request, response){
	// 	let hike_id = request.param("hike_id")
	// 	let hike = yield hike.findBy('id', hike_id)
	// 	response.status(200).json(hike)
	// }

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
			yield Hike.save()
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
			yield Hike.delete();
			response.status(204).send()
		}
	}




}

module.exports = HikesController
