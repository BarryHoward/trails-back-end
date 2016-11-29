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
Route.get('/trails/:trail_id', 'TrailsController.waypoints');
Route.post('/trails', 'TrailsController.create');