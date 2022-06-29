import { bookService } from "../services/book-service.js"
import longText from '../cmps/long-text.cmp.js'
import reviewAdd from '../cmps/review-add.cmp.js'


export default {
  template: `
      <section v-if="book" @created="setPriceColor()" class="book-details">
        <h4>Book details</h4>
        <div class="book-details-card">
          <img :src="bookImgUrl" alt="">
          <div class="details">
            <p>Title: {{book.title}}</p>
            <p>Author: {{book.authors[0]}}</p>
            <p>Page count: {{pageCount}}</p>
            <p>Published: {{publishedDate}}</p>
            <p v-bind:class="setColor">Price: {{formatPrice}}</p>
            <long-text :text="book.description"></long-text>
            <hr />
            <router-link :to="'/book/' + nextBookId">Next book</router-link>
            <!-- <router-link :to="'/book/' + prevBookId">Prev book</router-link> -->
            <hr />
            <router-link to="/book">Back to List</router-link>
          </div>
        </div>
      </section>
      <section>
        <review-add />
      </section>
  `,
  data() {
    return {
      book: null,
      bookToEdit: null,
      nextBookId: null,
      prevBookId: null,
    }
  },
  created() {
    const id = this.$route.params.bookId
    bookService.get(id).then(book =>
      this.book = book)

  },
  methods: {
    goBack() {
      this.$router.push('/book')
    },
    save() {
      if (!this.bookToEdit.title) return;
      bookService.save(this.bookToEdit.review).then(book => {
        this.$router.push('/book')
        eventBus.emit('show-msg', { txt: 'Saved/Update successfully', type: 'success' });
      })
    }
  },
  computed: {
    formatPrice() {
      const price = this.book.listPrice.amount
      const currency = this.book.listPrice.currencyCode
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
      }).format(price)
    },
    pageCount() {
      if (this.book.pageCount > 500) {
        return this.book.pageCount + ', Long reading'
      }
      else if (this.book.pageCount > 200) {
        return this.book.pageCount + ', Decent reading'
      }
      if (this.book.pageCount < 100) {
        return this.book.pageCount + ', Light reading'
      }
    },
    publishedDate() {
      if (this.book.publishedDate > 10) {
        return this.book.publishedDate + ' Veteran book'
      }
      else if (this.book.publishedDate < 1) {
        return this.book.publishedDate + ' New!'
      }
    },
    bookPrice() {
      return this.book.listPrice.amount
    },
    setColor() {
      return { red: this.book.listPrice.amount > 150, green: this.book.listPrice.amount < 20 }
    },
    bookImgUrl() {
      return `${this.book.thumbnail}`
    }
  },
  components: {
    longText,
    reviewAdd,
  },
  watch: {
    '$route.params.bookId': {
      handler() {
        const id = this.$route.params.bookId
        bookService.get(id).then(book => {
          this.book = book
          bookService.getNextBookId(book.id)
            .then(nextBookId => this.nextBookId = nextBookId)

        })
      },
      immediate: true
    },
    // '$route.params.bookId': {
    //   handler() {
    //     const id = this.$route.params.bookId
    //     bookService.get(id).then(book => {
    //       this.book = book
    //       bookService.getPrevBookId(book.id)
    //         .then(prevBookId => this.prevBookId = prevBookId)
    //     })
    //   },
    //   immediate: true
    // }
  }
};

