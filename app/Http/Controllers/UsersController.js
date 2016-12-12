'use strict'
const User = use('App/Model/User')
const Hash = use('Hash')

class UsersController {

	* login (request, response){
		let data = request.only('username', 'password')
		let user = yield User.findBy('username', data.username)

		try {
			let correct = Hash.verify(data.password, user.password)
			if (!correct) { 
				throw new Error() 
			}
			user.access_token = yield request.auth.generate(user)
      		response.status(201).json(user)

		} catch(error) {
			response.status(401).json({text: "Wrong user name or password!"})
		}
	}

	* create (request, response){
			let data = request.only('username', 'password', 'email')
			data.password = yield Hash.make('password')
			let user = yield User.create(data)
			response.status(201).json(user)
	}

	* update (request, response){
		let logged_user = request.authUser;
		let data = request.only('username', 'password', 'email', 'info', 'img_url')
		let user_id = request.param("user_id") 
		let user = yield User.findBy('id', user_id)
		console.log(logged_user, user)

		if (!user){
			response.status(404).json({error: "Trail not found"})
		} else if(logged_user.id !== user.id){
			response.status(403).json({error: "Not logged-in to correct user"})
		} else {
			user.fill(data)
			yield user.save()
			response.status(201).json(user)
		}
	}

	* index (request, response){
		const user_list = yield User.query().table('users')
		.orderBy('username', 'asc')
		response.status(200).json(user_list)
	}

}

module.exports = UsersController
