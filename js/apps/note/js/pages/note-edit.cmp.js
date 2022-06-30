import { noteService } from "./note-services/note-service.js"
import { eventBus } from '../../../../app-services/eventBus-service.js';

export default {
    template: `
         <section v-if="noteToEdit" class="note-edit">
            <!-- <h4>{{pageTitle}}</h4> -->
            <section class="main-form">
                <form @submit.prevent="save">
                    <input type="text" :placeholder="txtByType">
                    <!-- <textarea v-if="isTxt" ref="textInput" v-model="noteToEdit.info.txt"></textarea> -->
                    <!-- <img v-if="isImg" placeholder="Enter image url"> -->
                    <!-- <p v-if="isTodos" placeholder="Enter todos"></p> -->
                    <!-- <button>Save</button> -->
                </form>
                <div class="noteForm">
                    <button @click="setNoteType('Text')" id="noteType">
                        <img src="./img/chat icon.png" alt=""></button>
                    <button @click="setNoteType('Video')" id="noteType">
                        <img src="./img/videon icon.jpg" alt=""></button>
                    <button @click="setNoteType('Pic')" id="noteType">
                        <img src="./img/image icon.png" alt=""></button>
                    <button @click="setNoteType('Todos')" id="noteType">Todos</button>

                </div>

                <!-- <form class="noteForm" @click="setNoteType" id="noteType">
                    <input type="radio" name="type" value="Text">
                    <label for="Text"><img src="./img/chat icon.png" alt=""></label>
                    <input type="radio" name="type" value="Video">
                    <label for="Video"><img src="./img/videon icon.jpg" alt=""></label>
                    <input type="radio" name="type" value="Pic">
                    <label for="Pic"><img src="./img/image icon.png" alt=""></label>
                    <input type="radio" name="type" value="Todos">
                    <label for="Todos">Todos</label>
                </form> -->

                <!-- <select @change="setNoteType" name="" id="noteType">
                    <option value="Text">Text</option>
                    <option value="Video">Video</option>
                    <option value="Pic">Pic</option>
                    <option value="Todos">Todos</option>
                </select> -->


            </section>
        </section>

`,
    data() {
        return {
            noteToEdit: null,
            isTxt: true,
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
        save() {
            noteService.save(this.noteToEdit).then(() => {
                this.$router.push('/note')
                eventBus.emit('show-msg', { txt: 'Saved/Update successfully', type: 'success' });
            })
        },
        setNoteType(value) {
            console.log(value);
            this.noteType = noteType.value
            this.noteToEdit.type = noteType.value
            // console.log(noteType.value);

            if (noteType.value === "Text") {
                this.isTxt = true
                this.txtByType = "What's on your mind"
            }
            else this.isTxt = false

            if (noteType.value === "Video") {
                this.isMov = true
                this.txtByType = "Enter video url"
            }
            else this.isMov = false

            if (noteType.value === "Todos") {
                this.isTodos = true
                this.txtByType = "Enter todos"
            }
            else this.isImg = false
            if (noteType.value === "Pic") {
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
        // txtByType(){
        //     return 'txxxxxxt'
        // },



    },
    mounted() {
        // this.$refs.textInput.focus()
    },
    unmounted() { },
};