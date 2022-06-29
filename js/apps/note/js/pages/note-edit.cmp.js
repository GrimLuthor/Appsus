import { noteService } from "./note-services/note-service.js"
import { eventBus } from '../../../../app-services/eventBus-service.js';

export default {
    template: `
         <section v-if="noteToEdit" class="note-edit">
            <h4>{{pageTitle}}</h4>
            <select name="" id="">
                <option value="">Text</option>
                <option value="">Video</option>
                <option value="">Pic</option>
            </select>
            <form @submit.prevent="save">
                <textarea ref="textInput" v-model="noteToEdit.info.txt" placeholder="Write some notes"></textarea>
                <button>Save</button>
            </form>
        </section>

`,
    data() {
        return {
            noteToEdit: null,
        };
    },
    created() { 
        const id = this.$route.params.noteId
        if (id) {
            noteService.get(id).then(note => this.noteToEdit = note)
        }
         else {
            this.noteToEdit = noteService.getEmptyNote()
            console.log('on creation', this.noteToEdit);
        }

    },
    methods: {
        save() {
            console.log('on save',this.noteToEdit);
            // if (!this.noteToEdit.id) return;
            noteService.save(this.noteToEdit).then(() => {
                this.$router.push('/note')
                eventBus.emit('show-msg', { txt: 'Saved/Update successfully', type: 'success' });
            })
        }
    },
    computed: {
        pageTitle() {
            const id = this.$route.params.noteId
            console.log('title', id);
            return id ? 'Edit note' : 'Add note'
        }

    },
    mounted() {
        // this.$refs.textInput.focus()
    },
    unmounted() { },
};