"use strict"

import emailDetails from "./email-details.js"
import editDraft from "./edit-draft.js"
import { mailService } from "../services/mail-service.js";


export default {
    props: ["email"],
    template: `
        <section>
            <div class="email-text" :class="{details : detailsOpened, reademail : email.isRead}" @mouseover="hovering" @mouseleave="mouseLeft" @click="toggleDetails">
                <div v-if="!detailsOpened">
                    <div class="preview-subject">{{email.fromName}} {{convertTimeFormat}} {{email.subject}} <span class="preview-body-snippet">{{email.body}}</span></div>
                    

                    <span class="actions" v-show="isMouseOver">
                        <button @click.stop="remove(email.id)">🗑</button>
                        <button @click.stop="toggleRead(email.id)">📖</button>
                    </span>
                </div>
                

                <email-details :email="email" class="email-details" v-if="detailsOpened" @close="close"/>
            </div>
            <edit-draft v-if="editDraft" :email="email" @remove="remove" @saveAsDraft="saveAsDraft" @save="save" @renderDraft="renderDraft" @closeDraftEdit="closeDraftEdit"/>
        </section>
    `,
    components : {
        emailDetails,
        editDraft,
    },
    data() {
        return {
            isMouseOver: false,
            detailsOpened: false,
            editDraft: false,
        }
    },
    methods: {
        saveAsDraft(draft){
            this.$emit('saveAsDraft',draft)
        },
        save(email){
            this.$emit('save',email)
            this.editDraft = false
        },
        renderDraft(draft){
            this.$emit('renderDraft',draft)
        },
        closeDraftEdit(){
            this.editDraft = false
        },
        hovering(){
            this.isMouseOver = true;
        },
        mouseLeft(){
            this.isMouseOver = false;
        },
        remove(emailId){
            this.$emit("remove", emailId);
        },
        toggleRead(id){
            console.log(id);
            this.email.isRead = !this.email.isRead
            mailService.save(this.email)
        },

        toggleDetails(){
            if(this.email.folder === 'draft'){
                console.log('drafting',this.email)
                this.editDraft = true
                //delete the draft
                return
            }
            
            this.detailsOpened = true
            this.email.isRead = true
            mailService.save(this.email)
            
        },
        close(){
            this.detailsOpened = false;
        }
    },
    computed: {
        convertTimeFormat(){

            if(this.email.folder === 'draft'){
                return
            }

            let time =  new Date(this.email.sentAt)

            const msBetween = Math.abs(time - Date.now())

            const hoursBetween = msBetween / (60*60*1000)

            if (hoursBetween < 24){
                return `<${time.getHours()}:${JSON.stringify(time.getMinutes()).padStart(2, '0')}> `
            }
            if(hoursBetween <  48){
                return '<yesterday> '
            }
            if(hoursBetween < 24*30){
                return `<${Math.round(hoursBetween/24)} days ago> `
            }
            if(hoursBetween < 24*30*12){
                return `<${Math.round(hoursBetween/(24*30))} months ago> `
            }
            return `<${Math.round(hoursBetween/(24*30*12))} years ago> `
        }
    }
}