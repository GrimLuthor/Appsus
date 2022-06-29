"use strict"

export default {
    template: `
        <div class="sidebar-folders">
            <p @click="changeFolder('all')">All</p>
            <p @click="changeFolder('inbox')">Inbox</p>
            <p @click="changeFolder('sent')">Sent</p>
            <p @click="changeFolder('draft')">Drafts</p>
        </div>
    `,
    methods: {
        changeFolder(folder){
            console.log('changeFolder', folder);
            this.$emit('changeFolder', folder);
        }
    },
}