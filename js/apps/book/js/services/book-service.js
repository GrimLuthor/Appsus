import { utilService } from './util-service.js'
import { storageService } from './async-storage-service.js';
import booksArray from '../../books.json' assert {type: 'json'}

export const bookService = {
    query,
    remove,
    save,
    // getEmptyCar,
    get,
    getNextBookId,
    getPrevBookId,
}

const BOOKS_KEY = 'books_db'

_createBooks()

function _createBooks(){
  storageService.query(BOOKS_KEY).then((books) => {
    if(!books || !books.length){
      books = booksArray
      utilService.saveToStorage(BOOKS_KEY, books)
    }
  })
}

function query(){
    return storageService.query(BOOKS_KEY)
}

function remove(bookId) {
  console.log(bookId);
    return storageService.remove(BOOKS_KEY, bookId)
}

function get(bookId) {
    return storageService.get(BOOKS_KEY, bookId)
}

function save(book) {
  if (book.id) return storageService.put(BOOKS_KEY, book)
  else return storageService.post(BOOKS_KEY, book)
}

function saveReview(book) {
  if (book.id) return storageService.put(BOOKS_KEY, book)
  else return storageService.post(BOOKS_KEY, book)
}

function getNextBookId(bookId) {
  return storageService.query(BOOKS_KEY)
      .then(books => {
          const idx = books.findIndex(book => book.id === bookId)
          return (idx < books.length-1)? books[idx + 1].id : books[0].id
      })
}

function getPrevBookId(bookId) {
  return storageService.query(BOOKS_KEY)
      .then(books => {
          const idx = books.findIndex(book => book.id === bookId)
          console.log(bookId);
          return (idx < books.length-1)? books[idx - 1].id : books[0].id
      })
}
