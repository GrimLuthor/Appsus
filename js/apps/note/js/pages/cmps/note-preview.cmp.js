import { noteService } from "../note-services/note-service.js"

export default {
    props: ["note"],
    template: `
        <section class="note-preview">
            <textarea @keyup="save"  v-model="noteToEdit.info.txt" id="note.id" cols="30" rows="10"></textarea>
        </section>

`,
    data() {
        return {
            noteToEdit: this.note,
        };
    },
    created() {
    },
    methods: {
        save() {
            console.log('on save', this.note);
            noteService.save(this.note).then(() => {
                this.$router.push('/note')
            })
        },
        selectNote(id) {
            console.log('select id',this.noteToEdit);
            this.noteToEdit = id
        }
    },
    computed: {},
    unmounted() { },
};