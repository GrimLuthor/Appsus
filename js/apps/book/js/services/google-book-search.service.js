import { bookService } from "./services/book-service.js"
import { eventBus } from "./services/eventBus-service.js"
import { utilService } from './services/util-service.js'

const BOOK_GOOGLE_USERS_KEY = 'bookGoogleUserBd'

export default {
    template: `
    <section class="google-books">
        <button @click="getUsers"></button>
    </section>
`,
    data() {
        return {
              googleBooks: utilService.loadFromStorage(BOOK_GOOGLE_USERS_KEY) || {},        
        };
    },
    components:{
        bookService,
        eventBus,
        utilService,
    },
    created() {
        console.log('book search cmp');
     },
    methods: {
        getUsers() {
            const CONTACTS_URL = `https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20javascript`
        
            if (this.googleBooks) {
                console.log('No need to fetch, retrieving from Cache')
                console.log(this.googleBooks);
                return Promise.resolve(this.googleBooks);
            }
        
            const request = new XMLHttpRequest()
            request.onreadystatechange = function () {
                if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    // console.log(request)
                    const res = JSON.parse(request.responseText)
                    console.log('from server');
                    console.log(res)
                    utilService.saveToStorage(BOOK_GOOGLE_USERS_KEY, res)
                }
            }
            request.open('GET', CONTACTS_URL, true)
            request.send()
        }
    },
    computed: {},
    unmounted() { },
};