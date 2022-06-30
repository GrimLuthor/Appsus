import notePreview from "../cmps/note-preview.cmp.js"
import { noteService } from "../note-services/note-service.js"



export default {
    props: ["notes"],
    template: `
    <section class="note-list">
        <h2>Note list</h2>
            <ul>
                <li v-for="(note,idx) in notes" :key="note.id" v-bind:style="{backgroundColor:note.color}" class="note-preview-container">
                    <note-preview :note="note" @noteColor="changeBcColor"/>
                    <!-- <div class="actions"> -->
                        <button @click="remove(note.id)">Remove note</button>
                    <!-- </div> -->
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