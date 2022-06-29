import { utilService } from '../../../../../app-services/util-service.js'
import { storageService } from '../../../../../app-services/async-storage-service.js'


const NOTES_KEY = 'notesDb'

export const noteService = {
    // getNotes,
    query,
    getEmptyNote,
    get,
    save,
    remove,
}

_createNotes()

function _createNotes(){
  storageService.query(NOTES_KEY).then((notes) => {
    if(!notes || !notes.length){
      notes = notesArray
      utilService.saveToStorage(NOTES_KEY, notes)
    }
  })
}

function createNote(type, isPinned, info) {
    const note = {
        id: utilService.makeId(),
        type,
        isPinned,
        info,
    };
    return note
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function save(note) {
    console.log('save note',note.id)
    if (note.id) return storageService.put(NOTES_KEY, note)
    else return storageService.post(NOTES_KEY, note)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function getEmptyNote(){
    return{
        id: '',
        type: '',
        info: '',
    }
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
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: "n102",
        type: "note-img",
        info: {
            url: "http://some-img/me",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: "n103",
        type: "note-todos",
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        }
    }
];