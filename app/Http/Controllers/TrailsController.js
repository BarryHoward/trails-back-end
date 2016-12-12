'use strict'

const Trail = use('App/Model/Trail')

class TrailsController {

	* create (request, response){
		let user = request.authUser;
		let data = request.only('title', 'path', 'distance', 'max_elevation', 'min_elevation', 'img_url', 'description') // get new data
		let exists = yield Trail.findBy('title', data.title) // check if title already exists in database
		if (exists){
			response.status(409).json({error: "Trail Name already taken!"})
		} else {
			data.user_id = user.id
			data.username = user.username;
			let trail = yield Trail.create(data)
			response.status(201).json(trail)
		}		
	}

	* delete(request, response){
		let user = request.authUser;
		let trail_id = request.param("trail_id") // get id of current trail
		let trail = yield Trail.findBy('id', trail_id) // get current trail
		if (!trail){
			response.status(404).json({error: "Trail not found"})
		} else if (user.id !== trail.user_id){
			response.status(403).json({error: "Trail does not belong to user"})
		} else {
			yield Trail.query().table('points')
				.where('trail_id', trail_id)
				.delete();
			yield trail.delete();
			response.status(204).send()
		}

	}

	* update(request, response){
		let user = request.authUser;
		let data = request.only('title', 'path', 'distance', 'max_elevation', 'min_elevation', 'img_url', 'description') // get new data
		let trail_id = request.param("trail_id") // get id of current trail
		let trail = yield Trail.findBy('id', trail_id) // get current trail

		if (!trail){
			response.status(404).json({error: "Trail not found"})
		} else if (user.id !== trail.user_id){
			response.status(403).json({error: "Trail does not belong to user"})
		} else {
			data.username = user.username;
			trail.fill(data)
			yield trail.save()
			response.status(201).json(trail)
		}
	}

	* index (request, response){
		let trails_list = yield Trail.query().table('trails')
		.orderBy('created_at', 'desc')
		response.status(200).json(trails_list)
	}

	* show (request, response){
		let trail_id = request.param("trail_id")
		let trail = yield Trail.findBy('id', trail_id)
		response.status(200).json(trail)
	}

	* showByUser(request, response){
		let user_id = request.param("user_id")
		let trails =  yield Trail.query().table('trails')
				.where('user_id', user_id)
		response.status(200).json(trails)
	}

}

module.exports = TrailsController
