'use strict'
const User = use('App/Model/User')
const Hash = use('Hash')

class UserController {

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
		// let admin = request.authUser;
		// if (admin.admin){
			let data = request.only('username', 'password', 'email', 'info')
			data.password = yield Hash.make('password')
			data.admin = false;
			let user = yield User.create(data)
			response.status(201).json(user)
		// } else {
		// 	response.status(403)
		// }
	}

}

module.exports = UserController
