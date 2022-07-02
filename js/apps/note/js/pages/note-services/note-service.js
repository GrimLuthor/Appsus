import { utilService } from '../../../../../app-services/util-service.js'
import { storageService } from '../../../../../app-services/async-storage-service.js'
import noteApp from '../../../js/pages/note-app.cmp.js'


const NOTES_KEY = 'notesDb'

export const noteService = {
    // getNotes,
    query,
    getEmptyNote,
    get,
    save,
    remove,
    createNote,
    saveNotes,
    createImgNote,
    createEmailNote,
}

_createNotes()

function _createNotes() {
    storageService.query(NOTES_KEY).then((notes) => {
        if (!notes || !notes.length) {
            notes = notesArray
            utilService.saveToStorage(NOTES_KEY, notes)
        }
    })
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function save(note) {
    console.log('save note', note)
    if (note.id) return storageService.put(NOTES_KEY, note)
    else return storageService.post(NOTES_KEY, note)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function createNote(noteTxtInput, noteType) {
    console.log('new note', noteType);
    console.log('new note', noteTxtInput);
    const newNote = {
        id: utilService.makeId(),
        type: noteType,
        isPinned: false,
        info: {
            txt: noteTxtInput,
        },
        color: 'lightgreen',
        url: '',
    }
    if (newNote) return storageService.put(NOTES_KEY, newNote)
    return storageService.post(NOTES_KEY, newNote)
}

function createImgNote(img, noteType) {
    console.log('new note', noteType);
    const newNote = {
        id: utilService.makeId(),
        type: noteType,
        isPinned: false,
        info: '',
        color: 'lightblue',
        info: {
            url: "./js/apps/note/images/" + img,
        }

    }
    console.log('onCreateImg', newNote);
    if (newNote) return storageService.put(NOTES_KEY, newNote)
    return storageService.post(NOTES_KEY, newNote)
}

function createEmailNote(email) {
    console.log('from email', email)
    console.log(email.subject);
    console.log(email.body);
    const newNote = {
        id: utilService.makeId(),
        type: 'note-txt',
        isPinned: false,
        info: {
            txt: `${email.subject}\n
                    ${email.body}`
        },
        color: 'lightsalmon',
        url: '',
    }
    if (newNote) return storageService.put(NOTES_KEY, newNote)
    return storageService.post(NOTES_KEY, newNote)
}



function getEmptyNote(newNote) {
    return {
        id: utilService.makeId(),
        type: '',
        info: '',
        isPinned: false,
        color: '#ff0000',
        url: '',
    }
}

function saveNotes(notes) {
    utilService.saveToStorage(NOTES_KEY, notes);
}

function query() {
    return storageService.query(NOTES_KEY)
}

let notesArray = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Need to set time for vacation"
        },
        color: "lightgreen"
    },
    {
        id: "n102",
        type: "note-img",
        isPinned: false,
        info: {
            url: "./js/apps/note/images/sunsetTree.jpg",
            title: "Bobi and Me"
        },
        color: "lightyellow"
    },
    {
        id: "n103",
        type: "note-todos",
        isPinned: false,
        color: "lightblue",
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        },
    },
    {
        id: "n104",
        type: "note-img",
        isPinned: false,
        info: {
            url: "./js/apps/note/images/rollingStone.jpg",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#00d"
        },
        color: "purple"
    },
    {
        id: "n105",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        },
        color: "orange"
    },
    {
        id: "n106",
        type: "note-mov",
        isPinned: true,
        info: {
            url: "https://www.youtube.com/embed/ts0d7I6m7GE",
            txt: "Fullstack Me Baby!"
        },
        color: "lightpink"
    },
];