# Adonis Node.js backend for the Cranky Cartographer

Routes

Route.post('/login', 'UsersController.login');
Route.post('/users', 'UsersController.create');
Route.get('/users', 'UsersController.index');
Route.get('/users/:user_id', 'UsersController.show')
Route.patch('/users/:user_id', 'UsersController.update').middleware('auth');

Route.get('/trails', 'TrailsController.index');
Route.get('/trails/:trail_id', 'TrailsController.show');

Route.post('/trails', 'TrailsController.create').middleware('auth')
Route.patch('/trails/:trail_id', 'TrailsController.update').middleware('auth')
Route.delete('/trails/:trail_id', 'TrailsController.delete').middleware('auth')
Route.get('/trails/users/:user_id', 'TrailsController.showByUser')

Route.get('trails/:trail_id/points', 'PointsController.index')
Route.get('points/:point_id', 'PointController.show')
Route.post('/points', 'PointsController.create').middleware('auth')
Route.patch('points/:point_id', 'PointsController.update').middleware('auth')
Route.delete('points/:point_id', 'PointsController.delete').middleware('auth')

Route.post('/hikes', 'HikesController.create').middleware('auth')
Route.delete('/hikes/:hike_id', 'HikesController.delete').middleware('auth')
Route.patch('/hikes/:hike_id', 'HikesController.update').middleware('auth')

Route.get('/hikes', 'HikesController.index')
Route.get('/hikes/users/:user_id', 'HikesController.indexUser')
Route.get('/hikes/users/:user_id/trails', 'HikesController.indexUserTrails')
Route.get('/hikes/users/:user_id/trails/:trail_id', 'HikesController.indexUserTrailHikes')

# root URL

https://trails-back-end.herokuapp.com

# Routes:

	/posts
		method: get
		function:  gets list of images
		parameters:  []

	/posts
		method: post
		function:  post new image
		parameters:  title, description, destination_url

	/posts/:post_id
		method: delete
		function: delete post with id equal to post_id
		paramters: []

	/posts/:post_id
		method: patch
		function: update whichever post parameters that are passed in data.  Others remain same.
		parameters:  title, description, destination_url, likes



	/posts/:post_id/comments
		method: get
		function:  gets list of comments for post with id equal to post_id
		parameters:  []

	/posts/:post_id/comments
		method: post
		function:  post new comment for post with id equal to post_id
		parameters:  content

	/posts/:post_id/comments/:comment_id
		method: delete
		function: delete post with comment id equal to comment_id
		paramters: []

	/posts/:post_id/comments
		method: patch
		function: update comment parameters that are passed in data.  Others remain same.
		parameters:  content, likes
