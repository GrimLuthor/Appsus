"use strict"

import emailPreview from '../cmps/email-preview.cmp.js';

export default {
    props: ["emails"],
    template: `
        <section>
            <ul class="email-list">
                <div v-for="(email,idx) in emails" :key="email.id" class="email-preview-container">
                    <email-preview :email="email" @remove="remove"/>
                </div>
            </ul>
        </section>
    `,
    components: {
        emailPreview
    },
    data() {
        return {
            isMouseOver: false,
        };
    },
    created() {
    },
    methods: {
        remove(emailId){
            this.$emit("remove", emailId);
            console.log('remove', emailId);
        },
    },
    computed: {},
}