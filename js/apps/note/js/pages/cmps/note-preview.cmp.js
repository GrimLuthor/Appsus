import { noteService } from "../note-services/note-service.js"
import noteEdit from "../note-edit.cmp.js"
import { eventBus } from "../../../../../app-services/eventBus-service.js"
import todosNote from "../cmps/todos.cmp.js"


export default {
    props: ["note"],
    template: `
        <section class="note-preview">
            <textarea v-if="isTxt" @keyup="save"  v-model="noteToEdit.info.txt" id="note.id" cols="30" rows="10"></textarea>

            <img v-if="isImg" :src="fetchNoteImg" alt="">

            <!-- <p v-if="isTodos">Todos</p> -->
            <todos-note v-if="todos"  v-model="noteToEdit.info.txt" id="note.id"></todos-note>

            <iframe v-if="isMov" width="560" height="315" src="https://www.youtube.com/embed/ts0d7I6m7GE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

            <div class="note-actions-container">
                <div class="note-actions">
                    <span @click="togglePinned" :class="{pinned : isPinned}">{{star}}</span>                    
                    <!-- set color -->
                    <input class="set-color" type="color" v-model="noteColor"  @change="setNoteColor" id="note-color" name="user-color">
                    <!-- <label class="user-color" for="note-color"><img src="./img/paint-board-and-brush.png"></label> -->

                    <button @click="duplicateNote"><img src="./img/duplicate5.png" alt=""></button>

                    <button @click="saveAsEmail"><img src="./img/sendMail.png" alt=""></button>

                </div>
            </div>
        </section>

`,
    data() {
        return {
            noteToEdit: this.note,
            isTxt: null,
            isImg: null,
            isTodos: null,
            isMov: null,
            isPinned: this.note.isPinned,
            noteColor: null,
            star: '☆'
        };
    },
    created() {
        // console.log(this.note.isPinned);
        if (this.note.type === "note-txt") this.isTxt = true
        else this.isTxt = false
        if (this.note.type === "note-img") this.isImg = true
        else this.isImg = false
        if (this.note.type === "note-todos") this.isTodos = true
        else this.isTodos = false
        if (this.note.type === "note-mov") this.isMov = true
        else this.isMov = false
        if (this.note.isPinned) this.isPinned = true
        else this.isPinned = false

        if(this.isPinned) this.star = '★'
        else this.star = '☆'

    },
    methods: {
        duplicateNote(){
            eventBus.emit('duplicateTxtNote', this.note)
        },

        saveAsEmail(){
            console.log(this.noteToEdit);
            this.$router.push('/mail').then(()=>{
                eventBus.emit('noteToEmail', this.noteToEdit)
            })
        },
        save() {
            console.log('on save', this.note);
            this.noteToEdit.info = this.note.info
            console.log(this.noteToEdit.info);
            noteService.save(this.note).then(() => {
                // this.$emit('noteToEdit.info.txt', {info: this.noteToEdit, note:this.note})
            })
        },
        selectNote(id) {
            this.noteToEdit = id
        },
        setNoteColor() {
            this.$emit("noteColor", {color: this.noteColor, note:this.note})
        },
        togglePinned(){
            this.isPinned = !this.isPinned
            if(this.isPinned) this.star = '★'
            else this.star = '☆'
            this.note.isPinned = this.isPinned
            this.save()
        }
    },
    computed: {
        fetchNoteImg() {
            // console.log(this.noteToEdit.info.url);
            if (!this.noteToEdit.info.url) return
            else return this.noteToEdit.info.url
        },
        fetchNoteMov() {
            if (!this.noteToEdit.info.url && this.noteToEdit.type !== "note-mov") return
            // else return this.noteToEdit.info.url
            // return "https://www.youtube.com/watch?v=5qap5aO4i9A"
            return "https://www.youtube.com/embed/ts0d7I6m7GE"
        },
    },
    mounted() { },
    unmounted() { },
    components: {
        noteEdit,
        todosNote,
    }
};