"use strict"

export default {
    template: `
    <section class="email-filter">
       <!-- <input type="text" v-model="filterBy.txt"  @input="filter" placeholder="Search email"> -->
       <input @input="setFilter" type="text" v-model="filterBy.txt" placeholder="Search...">
    </section>
   `,
     data() {
         return {
             filterBy: {
                 txt: '',
             },
         };
     },
     methods: {
         setFilter() {
             this.$emit("filtered", {...this.filterBy});
         },
     },
     computed: {
     },
}