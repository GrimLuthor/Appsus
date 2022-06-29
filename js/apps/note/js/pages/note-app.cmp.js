export default {
    template: `
  <section class="book-app">
    <h1>Notes</h1>
    <book-filter @filtered="filterBook"/>
    <book-list :books="booksToDisplay" @remove="removeBook"  />
  </section>`,
    data() {
        return {        }
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
};