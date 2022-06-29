"use strict"

import emailPreview from '../cmps/email-preview.cmp.js';

export default {
    props: ["emails"],
    template: `
        <section class="email-list">
            <ul>
                <li v-for="(email,idx) in emails" :key="email.id" class="email-preview-container">
                    <email-preview :email="email"/>
                    <div class="actions">
                        <button @click="remove(email.id)">X</button>
                    </div>
                </li>
            </ul>
        </section>
    `,
    components: {
        emailPreview
    },
    data() {
        return {
        };
    },
    created() {
    },
    methods: {
        remove(emailId){
            this.$emit("remove", emailId);
            console.log('remove', emailId);
        }
    },
    computed: {},
}