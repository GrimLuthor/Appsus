export default {
    template: `
   <section class="note-filter">
      <!-- <input type="text" v-model="filterBy.txt"  @input="filter" placeholder="Search book"> -->
      <input ref="titleInput" @input="setFilter" type="text" v-model="filterBy.txt" placeholder="Search notes">
      <!-- <p>Set price limit</p>
      <input type="range" v-model.number="filterBy.price"  @input="setFilter" min="0" max="250">
      {{filterBy.price}} -->
</section>
  `,
    data() {
        return {
            filterBy: {
                txt: '',
                // price: 0,
            },
        };
    },
    mounted() {
        this.$refs.titleInput.focus()
    },
    methods: {
        setFilter() {
            console.log(this.filterBy);
            this.$emit("filtered", {...this.filterBy});
        },
    },
    computed: {
    },
};
