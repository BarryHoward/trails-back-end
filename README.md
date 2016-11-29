Route.post('/login', 'UserController.login');

Route.post('/users', 'UserController.create');
Route.get('/users', 'UserController.index');

Route.get('/trails', 'TrailsController.index');
Route.get('/trails/:trail_id', 'TrailsController.single');

Route.post('/trails', 'TrailsController.create');
Route.patch('/trails/:trail_id', 'TrailsConroller.update')
Route.delete('/trails/:trail_id', 'TrailsController.delete')