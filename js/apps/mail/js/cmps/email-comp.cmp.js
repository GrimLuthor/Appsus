"use strict"

import { storageService } from "../../../../app-services/async-storage-service.js";


export default {
    props: ['noteToSend'],
    template: `
        <section :class="{widescreen:wideScreen}" class="mail-composer">
            <div class="comp-btns">
                <button @click="close">X</button>
                <button @click="toggleWideScreen">Full Screen</button>
                <button @click="send">Send</button>
            </div>
            <input class="comp-receivers" v-model="receivers" placeholder="Receiver" @input="saveAsDraft">
            <br>
            <input class="comp-subject" v-model="subject" placeholder="Subject" @input="saveAsDraft">
            <br>
            <textarea class="body-input" v-model="body" @input="saveAsDraft"></textarea>
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
        if(this.noteToSend) {
            console.log('recieved',this.noteToSend);
            this.body = this.noteToSend.info.txt
            this.saveAsDraft()
        }
    },
    methods: {
        close(){
            if(this.receivers.length !== 0 || this.subject.length!==0 || this.body.length !== 0) {
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
            }
            this.$emit('close');
        },
        send() {
            if(!this.receivers){
                alert('Enter recievers to send this email')
                return
            }
            if(!this.subject&&!this.body){
                if(!confirm('Are you sure you want to send an empty email?')){
                    return
                }
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