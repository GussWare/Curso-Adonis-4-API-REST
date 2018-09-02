'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')

Route.on('/').render('welcome')

Route.group(() => {

    Route.post('login', 'AuthController.login')
    Route.post('register', 'AuthController.register').validator('StoreUser')
    Route.get('profile', 'AuthController.profile').middleware(['auth:api'])
    Route.post('revokeUserToken', 'AuthController.revokeUserToken').middleware(['auth:api'])

    Route.resource('books', 'v1/BookController').middleware(['auth:api'])
        .validator(new Map([
            ['books.store', 'StoreBook'],
            ['books.update', 'UpdateBook'],
        ]));

}).prefix('api/v1')

Route.group(() => {

    Route.resource('books', 'v2/BookController').middleware(['auth:api'])
        .validator(new Map([
            ['books.store', 'StoreBook'],
            ['books.update', 'UpdateBook'],
        ]));

    Route.get("books/paginated/:offset", "v2/BookController.paginated").middleware(['auth:api']);

    Route.resource("soap", 'v2/SoapController');

}).prefix('api/v2')