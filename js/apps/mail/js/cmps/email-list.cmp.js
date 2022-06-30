"use strict"

import emailPreview from '../cmps/email-preview.cmp.js';

export default {
    props: ["emails"],
    template: `
        <section>
            <ul class="email-list">
                <div v-for="(email,idx) in emails" :key="email.id" class="email-preview-container">
                    <email-preview :email="email" @remove="remove" @saveAsDraft="saveAsDraft" @save="save" @renderDraft="renderDraft"/>
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
        saveAsDraft(draft){
            this.$emit('saveAsDraft',draft)
        },
        save(email){
            this.$emit('save',email)
        },
        renderDraft(draft){
            this.$emit('renderDraft',draft)
        },
        remove(emailId){
            this.$emit("remove", emailId);
            console.log('remove', emailId);
        },
    },
    computed: {},
}