"use strict"

import { storageService } from '../../../../app-services/async-storage-service.js';

export const mailService = {
    query,
    remove,
    save,
    filter,
    unreadEmailsCount

}

const MAIL_KEY = "mail_db"

var mailsArray = [{
    id: 'e101',
    subject: 'Hey, I am very sorry I can\'t visit you this sunday',
    body: 'But I would love to catch up sometimes',
    isRead: false,
    sentAt : 1551133930594,
    fromEmail: 'user@appsus.com',
    fromName: 'User Appsus',
    to: 'momo@momo.com',
    folder: 'sent'
},
{
    id: 'e102',
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt : 1551133930594,
    fromEmail: 'momo@momo.com',
    fromName: 'Momo Mommovich',
    to: 'user@appsus.com',
    folder: 'inbox'
},
{
    id: 'e103',
    subject: 'About Lorem',
    body: `Did you know that Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`, 
    isRead: false,
    sentAt : 1551133930594,
    fromEmail: 'gretta@gsnail.com',
    fromName: 'Gretta Mozambique',
    to: 'user@appsus.com',
    folder: 'inbox'
},
{
    id: 'e104',
    subject: 'Here\'s your report ',
    body: 'Error 404 not found',
    isRead: false,
    sentAt : 1252634400000,
    fromEmail: 'momo@momo.com',
    fromName: 'Momo Mommovich',
    to: 'user@appsus.com',
    folder: 'inbox'
},{
    id: 'e105',
    subject: 'Here\'s some spam',
    body: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
    isRead: false,
    sentAt : (1656683845871 - 24*60*2*1000),
    fromEmail: 'elijah@momo.com',
    fromName: 'Elijah Mommovich',
    to: 'user@appsus.com',
    folder: 'inbox'
},{
    id: 'e106',
    subject: 'You won\'t believe this...',
    body: `"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"`,
    isRead: false,
    sentAt : 1551133930594,
    fromEmail: 'RogerC228@imeil.com',
    fromName: 'Roger Cliptman',
    to: 'user@appsus.com',
    folder: 'inbox'
},{
    id: 'e107',
    subject: 'Do you like philosophy?',
    body: `On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains`,
    isRead: false,
    sentAt : 1551133930594,
    fromEmail: 'momo@momo.com',
    fromName: 'Momo Mommovich',
    to: 'user@appsus.com',
    folder: 'inbox'
},
]

_createMails()

function _createMails(){
    storageService.query(MAIL_KEY).then((mails) => {
      if(!mails || !mails.length){
        mails = mailsArray
        storageService.postMany(MAIL_KEY, mails)
      }
    })
}

function query(){
    return storageService.query(MAIL_KEY)
}

function remove(emailId){
    console.log(emailId);
    return storageService.remove(MAIL_KEY, emailId)
}

function save(email) {
    if (email.id) return storageService.put(MAIL_KEY, email)
    else return storageService.post(MAIL_KEY, email)
}

function filter(emails,filterBy,folder,readOrUnread){
        return emails.filter((email) => {
            return (email.subject.toLowerCase().includes(filterBy.txt.toLowerCase()) || email.body.toLowerCase().includes(filterBy.txt.toLowerCase()) || email.fromName.toLowerCase().includes(filterBy.txt.toLowerCase())) && (email.folder === folder || (folder ===  'all' && email.folder !== 'draft')) &&
            (email.isRead === readOrUnread || readOrUnread === "all")
        })

}

function unreadEmailsCount(emails){
    let count = emails.filter((email) => {
        return email.isRead === false
    })
    return count.length
}
