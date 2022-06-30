"use strict"

export default {
    props: ["email"],
    template: `
        <div class="email-text" @mouseover="hovering" @mouseleave="mouseLeft">
            <span>{{email.fromName}} &lt&lt<span>{{email.fromEmail}}</span>>> </span>
            <span>{{email.subject}}</span>
            <span>{{email.body}}</span>

            <span class="actions" v-show="isMouseOver">
                <button @click="remove(email.id)">X</button>
            </span>
        </div>
    `,
    data() {
        return {
            isMouseOver: false,
        }
    },
    methods: {
        hovering(){
            this.isMouseOver = true;
        },
        mouseLeft(){
            this.isMouseOver = false;
        },
        remove(emailId){
            this.$emit("remove", emailId);
        }
    },
}