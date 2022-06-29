"use strict"

import { storageService } from "../../../../app-services/async-storage-service.js";

export default {
    template: `
        <section class="{wide-screen:wideScreen}">
            <input v-model="receivers" placeholder="Receiver">
            <br>
            <input v-model="subject" placeholder="Subject">
            <br>
            <textarea v-model="body"></textarea>
            <br>
            <button @click="close">X</button>
            <button @click="toggleWideScreen">Full Screen</button>
            <button @click="send">Send</button>
        </section>
    `,
    data() {
        return {
           receivers: null,
           subject: null,
           body: null,
           wideScreen: false,
           id: storageService._makeId()
        }
    },
    methods: {
        close(){

        },
        send() {
            console.log('save sent');
            this.$emit('save',{
                id: storageService._makeId(),
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
            this.$emit('save',{
                id: this.id,
                subject: this.subject,
                body: this.body,
                isRead: false,
                sentAt : Date.now(),
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