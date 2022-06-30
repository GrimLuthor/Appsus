"use strict"

import emailDetails from "./email-details.js"
import editDraft from "./edit-draft.js"


export default {
    props: ["email"],
    template: `
        <section>
            <div class="email-text" :class="{details : detailsOpened}" @mouseover="hovering" @mouseleave="mouseLeft" @click="toggleDetails">
                <div v-if="!detailsOpened">
                    <div class="preview-subject">{{email.fromName}} &lt&lt{{email.fromEmail}}>> {{email.subject}} </div>
                    

                    <span class="actions" v-show="isMouseOver">
                        <button @click="remove(email.id)">🗑</button>
                    </span>
                </div>
                

                <email-details :email="email" class="email-details" v-if="detailsOpened" @close="close"/>
            </div>
            <edit-draft v-if="editDraft" :email="email" />
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
        hovering(){
            this.isMouseOver = true;
        },
        mouseLeft(){
            this.isMouseOver = false;
        },
        remove(emailId){
            this.$emit("remove", emailId);
        },
        toggleDetails(){
            if(this.email.folder === 'draft'){
                console.log('drafting',this.email)
                this.editDraft = true
                //delete the draft
                return
            }
            
            this.detailsOpened = true
            
        },
        close(){
            this.detailsOpened = false;
        }
    },
}