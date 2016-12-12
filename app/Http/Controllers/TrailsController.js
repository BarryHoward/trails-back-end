'use strict'

const User = use('App/Model/User')
const Hike = use('App/Model/Hike')
const Trail = use('App/Model/Trail')

class TrailsController {

	* create (request, response){
		let user = request.authUser;
		let data = request.only('title', 'path', 'distance', 'max_elevation', 'min_elevation', 'img_url', 'description') // get new data

		data.user_id = user.id
		data.username = user.username;
		let trail = yield Trail.create(data)

		let trails_count = yield Trail.query().table('trails')
			.countDistinct('id')
			.where('user_id', user.id)

		let update_user = yield User.findBy('id', user.id)
		update_user.trails_created = trails_count[0].count;

		yield update_user.save();

		response.status(201).json(trail)		
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

			yield Trail.query().table('hikes')
				.where('trail_id', trail_id)
				.delete();

			yield trail.delete();


			let hikes_count = yield Hike.query().table('hikes')
				.count('*')
				.where('user_id', user.id);

			let trails_count = yield Hike.query().table('hikes')
				.countDistinct('trail_id')
				.where('user_id', user.id)

			let trails_created_count = yield Trail.query().table('trails')
				.countDistinct('id')
				.where('user_id', user.id)

			let update_user = yield User.findBy('id', user.id)
			update_user.hikes = hikes_count[0].count;
			update_user.trails_hiked = trails_count[0].count;
			update_user.trails_created = trails_created_count[0].count;

			yield update_user.save();

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
