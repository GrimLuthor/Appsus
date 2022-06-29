import notePreview from "../cmps/note-preview.cmp.js"


export default {
    props: ["notes"],
    template: `
  <section class="note-list">
      <h2>Note list</h2>
        <ul>
            <li v-for="(note,idx) in notes" :key="note.id" class="note-preview-container">
                <note-preview :note="note"/>
                <div class="actions">
                    <button @click="remove(note.id)">X</button>
                    <!-- <router-link :to="'/note/'+note.id">Details</router-link> -->
                    <router-link :to="'/note/edit/'+note.id">Edit</router-link>
                </div>
            </li>
        </ul>
    </section>
`,
    data() {
        return {};
    },
    created() { },
    methods: {
        remove(id) {
            console.log(id);
            this.$emit('remove', id);
        },
        // select(note) {
        //     this.$emit('selected', note);
        // }


    },
    computed: {},
    unmounted() { },
    components: {
        notePreview,
    }

};