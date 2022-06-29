"use strict"

import { storageService } from '../../../../app-services/async-storage-service.js';

export const mailService = {
    query,
    remove,
    save,
    filter,

}

const MAIL_KEY = "mail_db"

var mailsArray = [{
    id: 'e101',
    subject: 'hi!',
    body: 'Would love to catch up sometimes',
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
}
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

function filter(emails,filterBy,folder){
        // const regexTxt = new RegExp(filterBy.txt, "i");
        // return emails.filter((email) => {
        //     return (regexTxt.test(email.subject) || regexTxt.test(email.body) || regexTxt.test(email.fromName)) && (email.folder === folder || folder ===  'all')
        // })
        return emails.filter((email) => {
            return (email.subject.includes(filterBy.txt) || email.body.includes(filterBy.txt) || email.fromName.includes(filterBy.txt)) && (email.folder === folder || folder ===  'all')
        })

}