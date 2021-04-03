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
Route.get('/',                    'HomeController.index')

/* Dashboard */
Route.get('/dashboard', 					'DashboardController.index')

/* Paychecks */
Route.get('/paychecks/new',       'PaychecksController.create')
Route.get('/paychecks/:year?',    'PaychecksController.index')
Route.post('/paychecks/store',    'PaychecksController.store')
