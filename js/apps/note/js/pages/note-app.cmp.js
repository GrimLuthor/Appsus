import { noteService } from "./note-services/note-service.js"
import noteList from "./cmps/note-list.cmp.js"
import noteFilter from "./cmps/note-filter.cmp.js";
import noteEdit from "./note-edit.cmp.js";





export default {
        template: `
    <section class="book-app">
        <h1>Notes</h1>
        <note-edit></note-edit>
        <note-filter @filtered="filterNote"/>
        <!-- <router-link to="/note/edit">New note</router-link> -->
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
            console.log('removeNote', id);
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
                })
        },
        filterNote(filterBy) {
            console.log(filterBy);
            this.filterBy = filterBy;
        },
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
