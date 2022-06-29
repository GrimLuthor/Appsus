import { noteService } from "./note-services/note-service.js"
import { eventBus } from "../../../../app-services/eventBus-service.js"
import noteList from "./cmps/note-list.cmp.js"




export default {
    template: `
  <section class="book-app">
    <h1>Notes</h1>
    <!-- <book-filter @filtered="filterBook"/> -->
    <!-- <button @click="createNote">New note</button> -->
    <router-link to="/note/edit">New note</router-link>
    <note-list :notes="notesToDisplay" @remove="removeNote"/>
  </section>`,
    data() {
        return {
            notes: null,
            filterBy: null
        }
    },
    created() {
        noteService.query().then(notes => {
            this.notes = notes
        })
    },
    methods: {
        removeNote(id) {
            console.log('removeNote',id);
            noteService.remove(id)
                .then(() => {
                    console.log('Deleted successfully')
                    const idx = this.notes.findIndex((note) => note.id === id)
                    this.notes.splice(idx, 1)
                    showSuccessMsg('Deleted successfully')
                })
                .catch(err => {
                    console.log(err)
                    // showErrorMsg('Failed to remove')
                })}
        },
        computed: {
            notesToDisplay() {
                if (!this.filterBy) return this.notes;
                const regexTxt = new RegExp(this.filterBy.txt, "i");
                return this.notes.filter((note) => {
                    return regexTxt.test(note.title)
                })
            }

        },
        mounted() { },
        unmounted() { },
        components: {
            noteList,
        }
    }
