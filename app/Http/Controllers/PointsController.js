'use strict'

const Point = use('App/Model/Point')

class PointsController {
	* create (request, response){
		let data = request.only('lat', 'lng', 'shelter', 'water',
			'campsite', 'view', 'parking', 'road', 'resupply', 'title',
			'description', 'img_url', 'public')
		console.log(data)
		let point = yield Point.create(data)
		response.status(201).json(point)		
	}

	* index(request, response){
		let trail_id = request.param("trail_id")
		let points = yield Point.query().table('points')
			.where('trail_id', trail_id)
			.select('lat', 'lng', 'shelter', 'water', 'campsite', 'view',
				'parking', 'road', 'resupply')
		response.status(200).json(points)
	}

	* show (request, response){
		let point_id = request.param("point_id")
		let point = yield Point.findBy('id', point_id)
		response.status(200).json(point)
	}

	* update(request, response){
		let data = request.only('lat', 'lng', 'shelter', 'water',
			'campsite', 'view', 'parking', 'road', 'resupply', 'title',
			'description', 'img_url', 'public', 'trail_id', 'user_id')
		let point_id = request.param("point_id") // get id of current trail
		let point = yield Point.findBy('id', point_id) // get current trail

		if (!point){
			response.status(404).json({error: "Point not found"})
		} else {
			point.fill(data)
			yield point.save()
			response.status(201).json(point)
		}
	}

	* delete(request, response){
		let point_id = request.param("point_id") // get id of current trail
		let point = yield Point.findBy('id', point_id) // get current trail
		if (!trail){
			response.status(404).json({error: "Point not found"})
		} else {
			yield point.delete();
			response.status(204).send()
		}

	}

}

module.exports = PointsController
