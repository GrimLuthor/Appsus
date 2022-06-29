export default {
  props: ["book"],
  template: `
    <section class="book-preview-section">
      <p>Title: {{book.title}}</p>
      <p>Price: {{formatPrice}}</p>
      <img :src="bookImg" alt="">
    </section>
  `,
  data() {
    return {};
  },
  methods: {},
  computed: {
    formatPrice() {
      const price = this.book.listPrice.amount
      const currency = this.book.listPrice.currencyCode
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
      }).format(price)
    },
    bookImg() {
      return `${this.book.thumbnail}`
    },
    bookPrice() {
      return this.book.listPrice.amount
    }
  },
};
