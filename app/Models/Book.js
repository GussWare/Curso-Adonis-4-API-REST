'use strict'

const Model = use('Model')

class Book extends Model {

    static get visible() {

        return ['title', 'isbn', 'author', 'created_at']
    }
}

module.exports = Book
