import { noteService } from "../note-services/note-service.js"

export default {
    props: ["note"],
    template: `
        <section class="note-preview">
            <textarea v-if="isTxt"  @keyup="save"  v-model="noteToEdit.info.txt" id="note.id" cols="30" rows="10"></textarea>
            <img v-if="isImg" :src="fetchNoteImg" alt="">
            <p v-if="isTodos">Todos</p>
            <video v-if="isMov" width="320" height="240" controls src="https://www.youtube.com/watch?v=pzAYPLetuPE"></video>
            <div class="actions">
                    <input type="color" v-model="noteColor" @change="setNoteColor">
                    <router-link :to="'/note/edit/'+note.id">Edit</router-link>
                    <p>{{note.color}}</p>
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
            noteColor: null,
        };
    },
    created() {
        // console.log(this.note);
        // console.log(this.note.type);
        // console.log(this.note.color);
        if (this.note.type === "note-txt") this.isTxt = true
        else this.isTxt = false
        if (this.note.type === "note-img") this.isImg = true
        else this.isImg = false
        if (this.note.type === "note-todos") this.isTodos = true
        else this.isTodos = false
        if (this.note.type === "note-mov") this.isMov = true
        else this.isMov = false

        // this.selectNoteColor()
    },
    methods: {
        save() {
            // console.log('on save', this.note);
            noteService.save(this.note).then(() => {
                this.$router.push('/note')
            })
        },
        selectNote(id) {
            // console.log('select id',this.noteToEdit);
            this.noteToEdit = id
        },
        setNoteColor() {
            this.$emit("noteColor", {color: this.noteColor, note:this.note})
        },

    },
    computed: {
        fetchNoteImg() {
            console.log(this.noteToEdit.info.url);
            if (!this.noteToEdit.info.url) return
            else return this.noteToEdit.info.url
        },
        fetchNoteMov() {
            console.log(this.noteToEdit.info.url);

        },
        noteContent: function () {
            return {

            }
        },
    },
    mounted() { },
    unmounted() { },
};