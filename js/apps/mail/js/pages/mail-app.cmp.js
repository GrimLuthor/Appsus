import { mailService } from '../services/mail-service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailCompose from '../cmps/email-comp.cmp.js';
import emailFolderList from '../cmps/email-folder-list.cmp.js';
import { eventBus } from '../../../../app-services/eventBus-service.js';


export default {
    template: `
        <section class="mail-system">
            <email-filter class="email-filter" @filtered="filterMail" @filterReadOrUnread="filterReadOrUnread" :unreadCount="unreadEmailsCount" @sortEmails="sortEmails"/>
            <div class="system-body">
                <div class="sidebar">
                    <button class="btn-compose" @click="compose">Compose</button>
                    <email-folder-list @changeFolder="changeFolder" />
                </div>
                <email-list v-if="emails" :emails="emailsToDisplay" @remove="removeEmail" @saveAsDraft="saveAsDraft" @save="save" @renderDraft="renderDraft"/>
            </div>
            <email-compose v-if="composing" :noteToSend="noteToSend" @save="save"  @saveAsDraft="saveAsDraft" @close="closeCompose" @renderDraft="renderDraft"/>
            
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

            noteToSend: null,

            sortBy: 'date',
            
        };
    },
    created() {
        mailService.query().then(emails => {
            this.emails = emails
        })
        eventBus.on('noteToEmail', this.recieveNote)
    },
    methods: {
        recieveNote(note){
            this.noteToSend = note;
            this.composing = true
        },
        removeEmail(id) {
            mailService.remove(id).then(() => {
                console.log('Deleted successfully');
                const idx = this.emails.findIndex((email) => email.id === id);
                this.emails.splice(idx, 1);
            }).catch(err => {
                console.log(err);
            })
        },
        filterMail(filterBy) {
            this.filterBy = filterBy;
        },
        filterReadOrUnread(readOrUnread) {
            this.readOrUnread = readOrUnread;
        },
        sortEmails(sortBy){
            console.log(sortBy);
            this.sortBy = sortBy;
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
            let filtered =  mailService.filter(this.emails,this.filterBy,this.folder,readValue)
            if(this.sortBy === 'date') return filtered
            else return filtered.sort((a,b)=>{
                if (a.subject > b.subject) {
                    return 1;
                  }
                  if (a.subject < b.subject) {
                    return -1;
                  }
                  return 0;
            }) 
        },
        unreadEmailsCount(){
            if(!this.emails) return
            return mailService.unreadEmailsCount(this.emails)
        }
    },
};