"use strict"

export default {
    template: `
    <section class="home-page">
        <h3 class="page-title">Home Page</h3>
        <div class="home-page-container">
            <div class="home-btn" @click="toBooks">Books</div>
            <div class="home-btn" @click="toNotes">Notes</div>
            <div class="home-btn" @click="toMail">Mail</div>
            <div class="home-btn" @click="toAbout">About</div>
        </div>
    </section>
    `,
    methods: {
        toBooks(){
            this.$router.push('/book')
        },
        toNotes(){
            this.$router.push('/note')
        },
        toMail(){
            this.$router.push('/mail')
        },
        toAbout(){
            this.$router.push('/about')
        }
    },
}