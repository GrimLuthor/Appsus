"use strict"

export default {
    props: ["unreadCount"],
    template: `
    <section class="email-filter">
        <select class="sort-select" v-model="sortBy" @change="sortEmails">
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
        </select>
        <select class="read-filter" v-model="readOrUnread" @change="filterReadOrUnread">
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
        </select>
       <input class="email-search" @input="setFilter" type="text" v-model="filterBy.txt" placeholder="Search...">
       <h3 class="unread-count" v-if="unreadCount" title="Unread Count">{{unreadCount}}</h3>
    </section>
   `,
    data() {
        return {
            filterBy: {
                txt: '',
            },
            readOrUnread: 'all',
            sortBy: 'date',
        };
    },
    methods: {
        setFilter() {
            this.$emit("filtered", {...this.filterBy});
        },
        filterReadOrUnread(){
            this.$emit("filterReadOrUnread",this.readOrUnread);
        },
        sortEmails(){
            console.log('changing to ',this.sortBy);
            this.$emit("sortEmails",this.sortBy);
        }
    },
    computed: {
    },
}