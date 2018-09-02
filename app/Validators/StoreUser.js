'use strict'

class StoreUser {
  get rules () {
    return {
      // validation rules
     title:'required|unique:books,title',
     isbn:'required|unique:books,isbn',
     author:'required'
    }
  }

  get messages() {
    return {
      'title.required':'El campo titulo es requerido.',
      'title.unique':'El campo titulo ya se encuentra registrado.',
      'isbn.required':'El campo isbn es requerido.',
      'isbn.unique':'El campo isbn ya se encuentra registrado.',
      'author.required':'El campo autor es requerido.'
    }
  }
}

module.exports = StoreUser
