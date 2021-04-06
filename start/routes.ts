/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

/* Auth */
Route.get('/register',            'AuthController.showRegister').middleware(['guest'])
Route.post('/register',           'AuthController.register').middleware(['guest'])
Route.get('/login',               'AuthController.showLogin').middleware(['guest'])
Route.post('/login',              'AuthController.login').middleware(['guest'])
Route.post('/logout',             'AuthController.logout')

/* General */
Route.get('/',                    'HomeController.index').middleware(['guest'])

/* Dashboard */
Route.get('/dashboard', 					'DashboardController.index').middleware(['auth'])

/* Paychecks */
Route.group(() => {
	Route.get('/new',       				'PaychecksController.create').as('create')
	Route.get('/:year?',    				'PaychecksController.index').as('index')
	Route.post('/store',    				'PaychecksController.store').as('store')
  Route.get('/:id/edit',          'PaychecksController.edit').as('edit')
  Route.put('/:id/update',        'PaychecksController.update').as('update')
	Route.delete('/:id',						'PaychecksController.destroy').as('destroy')
}).prefix('/paychecks').as('paychecks').middleware(['auth'])
