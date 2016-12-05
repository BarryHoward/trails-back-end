'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome')


Route.post('/login', 'UserController.login');
Route.post('/users', 'UserController.create');
Route.get('/users', 'UserController.index');

Route.get('/trails', 'TrailsController.index');
Route.get('/trails/:trail_id', 'TrailsController.show');

Route.post('/trails', 'TrailsController.create');
Route.patch('/trails/:trail_id', 'TrailsController.update')
Route.delete('/trails/:trail_id', 'TrailsController.delete')

Route.get('trails/:trail_id/points', 'PointsController.index')
Route.get('points/:point_id', 'PointController.show')
Route.post('/points', 'PointsController.create')
Route.patch('points/:point_id', 'PointsController.update')
Route.delete('points/:point_id', 'PointsController.delete')


