import { mailService } from '../services/mail-service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailCompose from '../cmps/email-comp.cmp.js';
import emailFolderList from '../cmps/email-folder-list.cmp.js';


export default {
    template: `
        <h1>mail app</h1>
        <section>
            {{this.folder}}
            <email-filter @filtered="filterMail"/>
            <email-folder-list @changeFolder="changeFolder" />
            <email-list v-if="emails" :emails="emailsToDisplay" @remove="removeEmail"/>
            <button @click="compose">Compose</button>
            <email-compose v-if="composing" @save="save"  @saveAsDraft="saveAsDraft"/>
            
        </section>
    `,
    // <email-details />  @saveAsDraft
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
            mailService.save(newDraft).then(() => {
                this.emails.push(newDraft);
            })
        },
        changeFolder(folder){
            console.log('changed', folder);
            this.folder = folder;
        }
    },
    computed: {
        emailsToDisplay() {
            return mailService.filter(this.emails,this.filterBy,this.folder);
        },
    },
};