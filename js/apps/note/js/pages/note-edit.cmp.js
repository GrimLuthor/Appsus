import { noteService } from "./note-services/note-service.js"
import { eventBus } from '../../../../app-services/eventBus-service.js';

export default {
    template: `
         <section v-if="noteToEdit" class="note-edit">
            <!-- <h4>{{pageTitle}}</h4> -->
            <section class="main-form">   
                <div class="noteForm">
                    <form @submit.prevent="newTxtNote">
                        <input type="text" v-model="noteTxtInput" ref="noteTextInput" :placeholder="txtByType">
                        <div class="formButtons">
                            <button @click="setNoteType('note-txt')" id="noteType" :class="{selectedBtn : isTxt}">
                                <img src="./js/apps/note/images/chat.png" alt="txt"></button>
    
                                <button @click="setNoteType('note-mov')" id="noteType" :class="{selectedBtn : isMov}">
                            <img src="./js/apps/note/images/videon icon.jpg" alt="video"></button>
    
                            <input hidden :class="{selectedBtn : isImg}" @change="newImgNote" @click="setNoteType('note-img')" type="file" name="image" id="image"/>
                            <label for="image"><img src="./js/apps/note/images/image icon.png" alt="image"></label>
    
                            <button @click="setNoteType('note-todos')" id="noteType" :class="{selectedBtn : isTodos}">
                            <img src="./js/apps/note/images/todos icon.png" alt="todos"></button>
                        </div>
                    </form>    
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
            noteTxtInput: '',
        };
    },
    created() {
        const id = this.$route.params.noteId
        // console.log('note edit created', id);
        if (id) noteService.get(id).then(note => this.noteToEdit = note)
        else this.noteToEdit = noteService.getEmptyNote()
        eventBus.on('duplicateTxtNote', this.duplicateTxtNote)
        
        
        
    },
    methods: {
        duplicateTxtNote(note) {
            console.log('in duplicateTxtNote', note);
            noteService.createDuplicateNote(note.info.txt, note.type, note.color, note.info.url)
                .then(newNote => {
                    this.$emit("renderNote", newNote)
                })
        },
        newImgNote(img) {
            let newImg = img.target.files[0].name
            noteService.createImgNote(newImg, this.noteType)
                .then(newNote => {
                    this.$emit("renderNote", newNote)
                })
        },
        newTxtNote() {
            noteService.createNote(this.noteTxtInput, this.noteType)
                .then(newNote => {
                    this.$emit("renderNote", newNote)
                })
        },
        save(newNote) {
            noteService.save(newNote).then(note => {
                noteService.saveNotes(this.notes)
            })
            this.$emit("renderNote", newNote)
        },
        setNoteType(noteType) {
            this.noteType = noteType
            this.noteToEdit.type = noteType

            if (noteType === "note-txt") {
                this.isTxt = true
                this.txtByType = "What's on your mind"
            }
            else this.isTxt = false

            if (noteType === "note-mov") {
                this.isMov = true
                this.txtByType = "Enter video url (embed)"
            }
            else this.isMov = false

            if (noteType === "note-todos") {
                this.isTodos = true
                this.txtByType = "Enter todos"
            }
            else this.isTodos = false

            if (noteType === "note-img") {
                this.isImg = true
                this.txtByType = "Enter image url"
            }
            else this.isImg = false
        },
    },
    computed: {
        pageTitle() {
            const id = this.$route.params.noteId
            return id ? 'Edit note' : 'Add new note'
        },



    },
    mounted() {
        this.$refs.noteTextInput.focus()
    },
    unmounted() { },
    components: {
    }
};