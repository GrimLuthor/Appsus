import bookPreview from "../cmps/book-preview.cmp.js";

export default {
  props: ["books"],
  template: `
 <section class="book-list">
        <ul>
            <li v-for="(book,idx) in books" :key="book.id" class="book-preview-container">
                <book-preview :book="book"/>
                <div class="actions">
                    <button @click="remove(book.id)">X</button>
                    <router-link :to="'/book/'+book.id">Details</router-link>
                    <!-- <router-link :to="'/book/edit/'+book.id">Edit</router-link> -->
                </div>
            </li>
        </ul>
    </section>
`,
  components: {
    bookPreview,
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
    remove(bookId) {
      this.$emit("remove", bookId);
    },
    select(book) {
      this.$emit("selected", book);
    },
  },
  computed: {},
};
