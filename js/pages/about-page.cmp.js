"use strict"

export default {
    template: `
    <section class="about-page">
        <!-- <h3 class="page-title">about Page</h3> -->
        <div class="about-page-container">

                <div class="about-books" @click="toBooks">
                    <h4>Books</h4>
                    <p>Your personal book library</p>
                </div>


                <div  @click="toNotes">
                    <h4>Notes</h4>
                    <p>Add, modify, and share your notes</p>
                </div>

  
                <div class="about-mail" @click="toMail">
                    <h4>Mail</h4>
                    <p>Send recieve and draft your emails</p>
                </div>

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