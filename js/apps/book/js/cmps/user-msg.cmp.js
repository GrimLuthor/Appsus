import { eventBus } from "../services/eventBus-service.js";
export default {
    template: `
 <section v-if="msg" class="user-msg" :class="msg.type">
    <p>{{msg.txt}}</p>
    <!-- <router-link to="/about">GO TO BOOKS</router-link> -->
 </section>
`,
    data() {
        return {
            unsubscribe: null,
            msg: ''
        };
    },
    created() {
        this.unsubscribe = eventBus.on('show-msg', this.showMsg)
    },
    methods: {
        showMsg(msg) {
            this.msg = msg
            setTimeout(() => {
                this.msg = null
            }, 2000)
        }
    },
    computed: {},
    unmounted() {
        this.unsubscribe()
    },
};