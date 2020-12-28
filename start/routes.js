'use strict'

const { route } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
    return { greeting: 'API ONLY' }
})

/** ============= Users management ================================ */
Route.group(() => {
    Route.post('register', 'user/RegistrationController.store')
    Route.get('all', 'user/MainController.index')
    Route.get('find/:id', 'user/MainController.show')
    Route.put('edit/:id', 'user/MainController.update')
    Route.put('reset/:id', 'user/MainController.reset')
    Route.delete('delete/:id', 'user/MainController.delete')
}).prefix('user')

/**** Dioceses management */
Route.group(() => {
    Route.resource('dioceses', 'dioceses/MainController')
})

/*** Paroisses management */
Route.group(() => {
    Route.resource('paroisses', 'paroise/MainController')
})

/** les groupes sasa */
Route.group(() => {
    Route.post('groupes', 'groupe/CreateController.store')
    Route.get('groupes', 'groupe/ViewController.index')
    Route.get('groupes/:id', 'groupe/ViewController.show')
    Route.put('groupes/:id', 'groupe/MainController.update')
    Route.delete('groupes/:id', 'groupe/MainController.destroy')
})

/** general data collection */

Route.group(() => {
    Route.resource('collections', 'collection/GeneralController')
})

/** financial data collection  */
Route.group(() => {
    Route.resource('financials', 'collection/FinancialController')
})