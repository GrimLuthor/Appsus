import { mailService } from '../services/mail-service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailCompose from '../cmps/email-comp.cmp.js';
import emailFolderList from '../cmps/email-folder-list.cmp.js';


export default {
 template: `
    <h1>mail app</h1>
    <section>
        <email-filter @filtered="filterMail"/>
        <email-list :emails="emailsToDisplay" @remove="removeEmail"/>
        <button @click="compose">Compose</button>
        <email-compose v-if="composing" @save="save"/>
        <email-folder-list />
    </section>
`,
// <email-details />
// <email-folder-list />
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
        filterBy: null,
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
        console.log(filterBy);
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
    }
},
computed: {
    emailsToDisplay() {
        if (!this.filterBy) return this.emails;
        const regexTxt = new RegExp(this.filterBy.txt, "i");
        return this.emails.filter((email) => {
            return (regexTxt.test(email.subject) || regexTxt.test(email.body)) && (email.folder === this.folder || this.folder ===  'all')
        })
    },
},
};