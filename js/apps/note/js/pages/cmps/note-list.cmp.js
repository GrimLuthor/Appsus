import notePreview from "../cmps/note-preview.cmp.js"
import { noteService } from "../note-services/note-service.js"



export default {
    props: ["notes"],
    template: `
    <section class="note-list">
            <ul>
                <li v-for="(note,idx) in notes" :key="note.id" v-bind:style="{backgroundColor:note.color}" class="note-preview-container">
                    <button class="removeBtn" @click="remove(note.id)"><img src="./img/trash.png" alt=""></button>
                    <note-preview :note="note" @noteColor="changeBcColor"/>
                </li>
            </ul>
    </section>
`,
    data() {
        return { 
        }
    },
    created() {
        
    },
    methods: {
        remove(id) {
            // console.log(id);
            this.$emit('remove', id);
        },
        changeBcColor(noteAndColor){
            noteAndColor.note.color = noteAndColor.color
            noteService.save(noteAndColor.note)
        }
    },
    computed: {},
    mounted(){},
    unmounted() { },
    components: {
        notePreview,
    }

};