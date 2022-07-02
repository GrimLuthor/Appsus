import { noteService } from "./note-services/note-service.js"
import noteList from "./cmps/note-list.cmp.js"
import noteFilter from "./cmps/note-filter.cmp.js";
import noteEdit from "./note-edit.cmp.js";
import { eventBus } from "../../../../app-services/eventBus-service.js";





export default {
    template: `
    <section class="note-app">
        <h1>Notes</h1>
        <note-filter @filtered="filterNote"/>
        <note-edit @renderNote="renderNote"></note-edit>
        <h2>Note list</h2>
        <note-list :notes="notesToDisplay" @remove="removeNote"/>
    </section>`,
    data() {
        return {
            notes: null,
            filterBy: null,
            emailToSave: null,
        }
    },
    created() {
        noteService.query().then(notes => {
            this.notes = notes
            // console.log('on create', this.notes);
        })
        // noteService.createEmailNote('emailToNote', this.noteFromEmail)
        eventBus.on('emailToNote', this.noteFromEmail)


    },
    methods: {
        renderNote(newNote) {
            // console.log('render',newNote);
            this.notes.push(newNote)
        },
        removeNote(id) {
            // console.log('removeNote', id);
            noteService.remove(id)
                .then(() => {
                    // console.log('Deleted successfully')
                    const idx = this.notes.findIndex((note) => note.id === id)
                    this.notes.splice(idx, 1)
                    showSuccessMsg('Deleted successfully')
                })
                .catch(err => {
                    // console.log(err)
                    // showErrorMsg('Failed to remove')
                })
        },
        filterNote(filterBy) {
            // console.log(filterBy);
            this.filterBy = filterBy;
        },
        noteFromEmail(email) {
            console.log('from noteFromEmail', email);
            noteService.createEmailNote(email)
            .then((note) => {
                this.renderNote(note)
            })
        }
    },
    computed: {
        notesToDisplay() {
            if (!this.filterBy) return this.notes;
            const regexTxt = new RegExp(this.filterBy.txt, "i");
            return this.notes.filter((note) => {
                return regexTxt.test(note.info.txt) || regexTxt.test(note.type)
            })
        }

    },
    mounted() { },
    unmounted() { },
    components: {
        noteList,
        noteFilter,
        noteEdit,
    }
}
