**Adonis Node.js backend for the Cranky Cartographer

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
