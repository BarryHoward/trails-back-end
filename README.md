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

  **All auth must include header Authorization containing "Bearer " followed by token.

	Register/Login
  
  /login - Login User
  request verb: POST
  info: include username, password in request
  Token contained in parameter access_token in response
  
  /users - Register User
  request verb: POST
  info: include username, password in request
  
  /users - Get Users
  request verb: GET
  info:  Returns list of all users
  
  /users/:user_id - Show User
  request verb: GET
  info: Returns information for single user
  
  /users/:user_id - Update User
  request verb: PATCH (auth)
  info: Update user.  Parameters are username, password, email, info, and img_url.
  Must be logged in as user and include token in header.

------------------------------------------------------------------------------------------------------
  Trails
  
  /trails - Get trail list
  request verb: GET
  info: get list of all trails organized by creation date
  
  /trails/:trail_id - Get single trail
  request verb: GET
  info: get single trail info
  
  /trails - Create new Trail
  request verb: POST (auth)
  info: Create trail.  Parameters include 'title', 'path', 'distance', 
  'max_elevation', 'min_elevation', 'img_url', 'description'.  Path is a text
  field with the encoded trail.  Must be logged in as user and include token in header.
  
  /trails/:trail_id - Update a trail
  request verb: PATCH (auth)
  info: Update trail.  Parameters include 'title', 'path', 'distance', 
  'max_elevation', 'min_elevation', 'img_url', 'description'.  Path is a text
  field with the encoded trail.  Must be logged in as user and include token in header.
  
  /trails/:trail_id - Delete a trail
  request verb: DELETE (auth)
  info: DELETE trail.  Must be logged in as user and include token in header.
  
  /trails/users/:user_id - Get trails by User
  request verb: GET
  info: Get all trails created by a specific user.

------------------------------------------------------------------------------------------------------
	Comments

	/links/:link_id/comments : Get list of comments from a link
	request verb: Get
	info: Ordered by votes and then creation date

	/links/:link_id/comments/:comment_id : Get children comments of a 
	specified parent comment
	request verb: Get
	info: Ordered by votes and then creation date

	/links/:link_id/comments : Post comment for associated link
	request verb: Post (logged-in)
	info:  Include text in body parameter.  If a parent comment exists, 
	its id should be stored in parent_comment_id parameter.  Must include 
	token in header for login.  Comment will be associated with user.

	/links/:linkId/comments/:comment_id : Delete Comment
	request verb: Delete (logged-in)
	info:  Must include token in header for login.  Comment must be from 
	associated user.

------------------------------------------------------------------------------------------------------
	Votes

	/links/:link_id : Add vote to link
	request verb: Post (logged-in)
	info: Creates a vote in table.  Must include token in header for login.  
	Same user cannot vote on link multiple times

	/links/:link_id/commments/:comment_id : Add vote to comment
	request verb: Post (logged-in)
	info: Creates a vote in table.  Must include token in header for login.  
	Same user cannot vote on comment multiple times

