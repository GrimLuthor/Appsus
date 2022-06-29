import { bookService } from "../services/book-service.js"
import { eventBus } from "../services/eventBus-service.js"
import { utilService } from '../services/util-service.js'

const BOOK_GOOGLE_USERS_KEY = 'bookGoogleUserBd'

export default {
    // props:["book"],
    template: `
    <section class="rate">
        <!-- <form @submit.prevent="save">
            <input type="text" v-model="bookToEdit.title" placeholder="Enter name">
            <input type="number" placeholder="Rate book between 1-5">
            <button>Save</button>
            
            <p style="white-space:pre"{{msg}}></p>
            <textarea name="" id="" cols="30" rows="10"></textarea>
        </form> -->
        <input type="text" name="" id="">
        <!-- <button @click="getUsers">Get users</button> -->
    </section>
`,
    data() {
        return {
            bookReview: {
                userName: 'Books reader',
                userRate: 0,
              },        
        };
    },
    components:{
        bookService,
        eventBus,
    },
    created() {
        console.log('hello');
     },
    methods: {},
    computed: {},
    unmounted() { },
};