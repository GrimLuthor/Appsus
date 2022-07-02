export default {
    template: `
   <section class="note-filter">
      <input ref="titleInput" @input="setFilter" type="text" v-model="filterBy.txt" placeholder="🔎︎ Search notes">
</section>
  `,
    data() {
        return {
            filterBy: {
                txt: '',
            },
        };
    },
    mounted() {
        // this.$refs.titleInput.focus()
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
