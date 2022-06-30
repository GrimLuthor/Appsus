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
            id: storageService._makeId(),
            prevId: '',
        }
    },
    created() {
        if(!this.email.receivers){this.receivers = ''}
        else this.receivers = this.email.receivers

        if(!this.email.subject){this.subject = ''}
        else this.subject = this.email.subject

        if(!this.email.body){this.body = ''}
        else this.body = this.email.body

        this.prevId = this.email.id
    },
    methods: {
        close(){

                this.saveAsDraft()
                this.$emit('renderDraft',{
                    id: this.id,
                    subject: this.subject,
                    body: this.body,
                    isRead: false,
                    sentAt : null,
                    fromEmail: 'user@appsus.com',
                    fromName: 'Mahatma Appsus',
                    to: this.receivers,
                    folder: 'draft'
                })
                this.$emit("closeDraftEdit")
            
            this.$emit('close');
            this.$emit('remove',this.prevId);
        },
        send() {
            if(!this.receivers){
                alert('Enter recievers to send this email')
                return
            }
            console.log('save sent');
            this.$emit('save',{
                subject: this.subject,
                body: this.body,
                isRead: false,
                sentAt : Date.now(),
                fromEmail: 'user@appsus.com',
                fromName: 'Mahatma Appsus',
                to: this.receivers,
                folder: 'sent'
            })
            this.$emit('remove',this.prevId);

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
                fromName: 'Mahatma Appsus',
                to: this.receivers,
                folder: 'draft'
            })
        },
        toggleWideScreen() {
            this.wideScreen = !this.wideScreen;
        }
    },

}