import { noteService } from "../note-services/note-service.js"

export default {
    props: ["note"],
    template: `
        <section class="note-preview">
            <textarea @keyup="save" name="" id="note.id" cols="30" rows="10">{{note.info.txt}}</textarea>
        </section>

`,
    data() {
        return {};
    },
    created() { },
    methods: {
        save() {
            console.log('on save',this.noteToEdit);
            // if (!this.noteToEdit.id) return;
            noteService.save(this.noteToEdit).then(() => {
                this.$router.push('/note')
                eventBus.emit('show-msg', { txt: 'Saved/Update successfully', type: 'success' });
            })}
    },
    computed: {},
    unmounted() { },
};