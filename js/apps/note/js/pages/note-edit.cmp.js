import { noteService } from "./note-services/note-service.js"
import { eventBus } from '../../../../app-services/eventBus-service.js';

export default {
    template: `
         <section v-if="noteToEdit" class="note-edit">
            <h4>{{pageTitle}}</h4>
            <section class="main-form">
                <form @submit.prevent="save">
                    <input type="text" :placeholder="txtByType">
                    <button>Save</button>
                </form>

                <div class="noteForm">
                    <button @click="setNoteType('Text')" id="noteType" :class="{selectedBtn : isTxt}">
                    <img src="./js/apps/note/images/chat.png" alt="txt"></button>
                    <button @click="setNoteType('Video')" id="noteType" :class="{selectedBtn : isMov}">
                    <img src="./js/apps/note/images/videon icon.jpg" alt="video"></button>
                    <button @click="setNoteType('Pic')" id="noteType" :class="{selectedBtn : isImg}">
                    <img src="./js/apps/note/images/image icon.png" alt="image"></button>
                    <button @click="setNoteType('Todos')" id="noteType" :class="{selectedBtn : isTodos}">
                    <img src="./js/apps/note/images/todos icon.png" alt="todos"></button>
                </div>
            </section>
        </section>

`,
    data() {
        return {
            noteToEdit: null,
            isTxt: null,
            isImg: null,
            isTodos: null,
            isMov: null,
            noteType: null,
            txtByType: "What's on your mind",
        };
    },
    created() {
        const id = this.$route.params.noteId
        if (id) noteService.get(id).then(note => this.noteToEdit = note)
        else this.noteToEdit = noteService.getEmptyNote()

    },
    methods: {
        save(newNote) {
            console.log('save new note', newNote);
            noteService.save(newNote).then(note => {
            //   this.notes.unshift(note)
              noteService.saveNotes(this.notes)
            })
            this.$emit("renderNote", newNote)
          },
        setNoteType(noteType) {
            // console.log(noteType);
            this.noteType = noteType
            this.noteToEdit.type = noteType
            // console.log(noteType.value);

            if (noteType === "Text") {
                this.isTxt = true
                console.log(this.isTxt);
                this.txtByType = "What's on your mind"
            }
            else this.isTxt = false

            if (noteType === "Video") {
                this.isMov = true
                this.txtByType = "Enter video url"
            }
            else this.isMov = false

            if (noteType === "Todos") {
                this.isTodos = true
                this.txtByType = "Enter todos"
            }
            else this.isTodos = false

            if (noteType === "Pic") {
                this.isImg = true
                this.txtByType = "Enter image url"
            }
            else this.isImg = false
        },
    },
    computed: {
        pageTitle() {
            const id = this.$route.params.noteId
            // console.log('title', id);
            return id ? 'Edit note' : 'Add note'
        },



    },
    mounted() {
        // this.$refs.textInput.focus()
    },
    unmounted() { },
};