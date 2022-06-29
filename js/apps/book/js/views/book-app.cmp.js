import { bookService } from "../services/book-service.js"
import bookList from "../cmps/book-list.cmp.js";
import bookFilter from "../cmps/book-filter.cmp.js";
import { eventBus } from "../services/eventBus-service.js"

export default {
    template: `
  <section class="book-app">
    <h1>Book LIst</h1>
    <book-filter @filtered="filterBook"/>
    <book-list :books="booksToDisplay" @remove="removeBook"  />
  </section>
`,
    components: {
        bookList,
        bookFilter
    },
    data() {
        return {
            books: null,
            filterBy: null,
        };
    },
    created() {
        bookService.query().then(books => {
            this.books = books
        })
    },
    methods: {
        removeBook(id) {
            bookService.remove(id).then(() => {
                console.log('Deleted successfully');
                const idx = this.books.findIndex((book) => book.id === id);
                this.books.splice(idx, 1);
                eventBus.emit('show-msg', { txt: 'Deleted successfully', type: 'success' });
            }).catch(err => {
                console.log(err);
                eventBus.emit('show-msg', { txt: 'Error - try again later', type: 'error' });
            })
        },
        selectBook(book) {
            this.selectedBook = book;
        },
        saveBook(book) {
            this.books.push(book);
        },
        filterBook(filterBy) {
            console.log(filterBy);
            this.filterBy = filterBy;
        },
    },
    computed: {
        booksToDisplay() {
            if (!this.filterBy) return this.books;
            const regexTxt = new RegExp(this.filterBy.txt, "i");
            return this.books.filter((book) => {
                return (regexTxt.test(book.title) || regexTxt.test(book.authors)) && book.listPrice.amount > this.filterBy.price
            })
        }
    },
    unmounted() { },
};