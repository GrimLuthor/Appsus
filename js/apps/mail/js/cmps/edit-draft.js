"use strict"

import { storageService } from "../../../../app-services/async-storage-service.js";

export default {
    props: ["email"],
    template: `
        <section :class="{widescreen:wideScreen}" class="mail-composer">
        <button @click="close">X</button>
            <button @click="toggleWideScreen">Full Screen</button>
            <button @click="send">Send</button>
            <br>
            <input v-model="receivers" placeholder="Receiver" @input="saveAsDraft">
            <br>
            <input v-model="subject" placeholder="Subject" @input="saveAsDraft">
            <br>
            <textarea  class="body-input" v-model="body" @input="saveAsDraft"></textarea>
        </section>
    `,
    data() {
        return {

            receivers: '',
            subject: '',
            body: '',
            wideScreen: false,
            id: storageService._makeId()
        }
    },
    created() {
        if(!receivers){this.receivers = this.email.receivers}
        this.receivers = this.email.receivers
        console.log(this.receivers);
        this.subject = this.email.subject
        console.log(this.subject);
        this.body = this.email.body
    },
    methods: {
        close(){
            console.log(this.receivers)
            // if(this.receivers.length !== 0 || this.subject.length!==0 || this.body.length !== 0) {
            //     this.saveAsDraft()
            //     this.$emit('renderDraft',{
            //         id: this.id,
            //         subject: this.subject,
            //         body: this.body,
            //         isRead: false,
            //         sentAt : null,
            //         fromEmail: 'user@appsus.com',
            //         fromName: 'User Appsus',
            //         to: this.receivers,
            //         folder: 'draft'
            //     })
            // }
            // this.$emit('close');
        },
        send() {
            console.log('save sent');
            this.$emit('save',{
                subject: this.subject,
                body: this.body,
                isRead: false,
                sentAt : Date.now(),
                fromEmail: 'user@appsus.com',
                fromName: 'User Appsus',
                to: this.receivers,
                folder: 'sent'
            })

        },
        saveAsDraft(){
            console.log('drafting');
            this.$emit('saveAsDraft',{
                id: this.id,
                subject: this.subject,
                body: this.body,
                isRead: false,
                sentAt : null,
                fromEmail: 'user@appsus.com',
                fromName: 'User Appsus',
                to: this.receivers,
                folder: 'draft'
            })
        },
        toggleWideScreen() {
            this.wideScreen = !this.wideScreen;
        }
    },

}