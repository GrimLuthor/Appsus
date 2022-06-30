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
                    <div class="preview-subject">{{email.fromName}} &lt&lt{{email.fromEmail}}>> {{email.subject}} </div>
                    

                    <span class="actions" v-show="isMouseOver">
                        <button @click="remove(email.id)">🗑</button>
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
            this.toggleRead(this.email.id)
            
        },
        close(){
            this.detailsOpened = false;
        }
    },
}