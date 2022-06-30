"use strict"

export default {
    template: `
    <section class="email-filter">
        <select v-model="readOrUnread" @change="filterReadOrUnread">
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
        </select>
       <input @input="setFilter" type="text" v-model="filterBy.txt" placeholder="Search...">
    </section>
   `,
    data() {
        return {
            filterBy: {
                txt: '',
            },
            readOrUnread: 'all'
        };
    },
    methods: {
        setFilter() {
            this.$emit("filtered", {...this.filterBy});
        },
        filterReadOrUnread(){
            this.$emit("filterReadOrUnread",this.readOrUnread);
        }
    },
    computed: {
    },
}