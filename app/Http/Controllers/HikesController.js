'use strict'

const User = use('App/Model/User')
const Hike = use('App/Model/Hike')
const Trail = use('App/Model/Trail')

class HikesController {

	* create (request, response){
		let user = request.authUser
		let data = request.only('trail_id', 'title', 'start_date', 'end_date', 'description', 
			'path', 'start', 'end', 'distance')
		data.user_id = user.id
		let hike = yield Hike.create(data)

		let hikes_count = yield Hike.query().table('hikes')
			.count('*')
			.where('user_id', user.id);

		let trails_count = yield Hike.query().table('hikes')
			.countDistinct('trail_id')
			.where('user_id', user.id)


		let update_user = yield User.findBy('id', user.id)
		update_user.hikes = hikes_count[0].count;
		update_user.trails_hiked = trails_count[0].count;
		yield update_user.save();

		response.status(201).json(hike)	
	}

	* index (request, response){
		let hikes_list = yield Hike.query().table('hikes')
		.orderBy('created_at', 'desc')
		response.status(200).json(hikes_list)
	}

	* indexUser(request, response){
		let user_id = request.param("user_id")
		let hikes = yield Hike.query().table('hikes')
			.where('user_id', user_id)
		response.status(201).json(hikes)
	}

	* indexUserTrails(request, response){
		let user_id = request.param("user_id")
		let trails = yield Trail.query().table('trails')
			.select('trails.id', 'trails.title', 'trails.img_url', 'trails.max_elevation',
				'trails.min_elevation', 'trails.distance', 'trails.username', 'trails.created_at', 
				'trails.description', 'trails.path', 'trails.user_id', 'trails.updated_at')
			.where('hikes.user_id', user_id)
			.innerJoin('hikes', 'trails.id', 'hikes.trail_id')
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
		let data = request.only('title', 'start_date', 'end_date', 'description', 
			'path', 'start', 'end', 'distance')	
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

			let hikes_count = yield Hike.query().table('hikes')
				.count('*')
				.where('user_id', user.id);

			let trails_count = yield Hike.query().table('hikes')
				.countDistinct('trail_id')
				.where('user_id', user.id)

			let update_user = yield User.findBy('id', user.id)
			update_user.hikes = hikes_count[0].count;
			update_user.trails_hiked = trails_count[0].count;

			yield update_user.save();
			response.status(204).send()
		}
	}




}

module.exports = HikesController
