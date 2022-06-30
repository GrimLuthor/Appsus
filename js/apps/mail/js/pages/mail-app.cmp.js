import { mailService } from '../services/mail-service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailCompose from '../cmps/email-comp.cmp.js';
import emailFolderList from '../cmps/email-folder-list.cmp.js';


export default {
    template: `
        <section class="mail-system">
            <email-filter class="email-filter" @filtered="filterMail" @filterReadOrUnread="filterReadOrUnread"/>
            <div class="system-body">
                <div class="sidebar">
                    <button class="btn-compose" @click="compose">Compose</button>
                    <email-folder-list @changeFolder="changeFolder" />
                </div>
                <email-list v-if="emails" :emails="emailsToDisplay" @remove="removeEmail" @saveAsDraft="saveAsDraft" @save="save" @renderDraft="renderDraft"/>
            </div>
            <email-compose v-if="composing" @save="save"  @saveAsDraft="saveAsDraft" @close="closeCompose" @renderDraft="renderDraft"/>
            
        </section>
    `,
    // <email-details />
    components: {
        emailList,
        emailFilter,
        emailCompose,
        emailFolderList

    },
    data() {
        return {
            loggedinUser: {
                email: 'user@appsus.com',
                fullname: 'Mahatma Appsus'
            },
            emails: null,
            filterBy: {txt: ''},
            readOrUnread: 'all',
            folder: 'all',
            composing: false,
            
        };
    },
    created() {
        mailService.query().then(emails => {
            this.emails = emails
        })
    },
    methods: {
        removeEmail(id) {
            mailService.remove(id).then(() => {
                console.log('Deleted successfully');
                const idx = this.emails.findIndex((email) => email.id === id);
                this.emails.splice(idx, 1);
                //eventBus.emit('show-msg', { txt: 'Deleted successfully', type: 'success' });
            }).catch(err => {
                console.log(err);
                //eventBus.emit('show-msg', { txt: 'Error - try again later', type: 'error' });
            })
        },
        filterMail(filterBy) {
            this.filterBy = filterBy;
        },
        filterReadOrUnread(readOrUnread) {
            this.readOrUnread = readOrUnread;
        },
        compose(){
            this.composing = true;
        },
        save(newEmail){
            mailService.save(newEmail).then(() => {
                this.emails.push(newEmail);
            })
            this.composing = false;
        },
        saveAsDraft(newDraft){
            mailService.save(newDraft)
        },
        renderDraft(newDraft){
            this.emails.push(newDraft);
        },
        changeFolder(folder){
            this.folder = folder;
        },
        closeCompose(){
            this.composing = false;
        },
    },
    computed: {
        emailsToDisplay() {
            let readValue;
            if(this.readOrUnread === 'read') readValue = true
            else if (this.readOrUnread === 'unread') readValue = false
            else readValue = 'all'
            return mailService.filter(this.emails,this.filterBy,this.folder,readValue);
        },
    },
};