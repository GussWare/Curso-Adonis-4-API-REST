'use strict'

const BookModel = use('App/Models/Book')

/**
 * Resourceful controller for interacting with books
 */
class BookController {
  /**
   * Show a list of all books.
   * GET books
   */
  async index ({ request, response, view }) {
    let books = await BookModel.all()
    return response.json(books)
  }

  /**
   * Create/save a new book.
   * POST books
   */
  async store ({ request, response }) {

    const bookInfo = request.only('title', 'isbn', 'author')

    const book = new BookModel;
    book.title = bookInfo.title;
    book.isbn = bookInfo.isbn;
    book.author = bookInfo.author;

    await book.save();

    return response.status(201).json(book)
  }

  async show({response, params}) {
    const book = await BookModel.find(params.id)

    if(! book) {
      return response.status(404).json({data:"Recurso no encontrado"})
    }

    return response.json(book);
  }

  /**
   * Update book details.
   * PUT or PATCH books/:id
   */
  async update ({ params, request, response }) {
    const bookInfo = request.only(['title', 'isbn', 'author'])
    const book = await BookModel.find(params.id)

    if(! book ){
      return response.status(404).json({data:"Recurso no existente"})
    }

    book.title = bookInfo.title;
    book.isbn = bookInfo.isbn;
    book.author = bookInfo.author;

    await book.save();

    return response.status(201).json(book)
  }

  /**
   * Delete a book with id.
   * DELETE books/:id
   */
  async destroy ({ params, request, response }) {
    const book = await BookModel.find(params.id)

    if(! book) {
      return response.status(404).json({data:"Recurso no encontrado"})
    }

    await book.delete()

    return response.status(204).json(null);
  }
}

module.exports = BookController
