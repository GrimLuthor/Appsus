"use strict"

export default {
    template: `
        <div class="sidebar-folders">
            <p class="folder-tag" :class="{folderselect : allSelected}" @click="changeFolder('all')">All</p>
            <p class="folder-tag" :class="{folderselect : inboxSelected}" @click="changeFolder('inbox')">Inbox</p>
            <p class="folder-tag" :class="{folderselect : sentSelected}" @click="changeFolder('sent')">Sent</p>
            <p class="folder-tag" :class="{folderselect : draftSelected}" @click="changeFolder('draft')">Drafts</p>
        </div>
    `,
    data() {
        return {
            allSelected: true,
            inboxSelected: false,
            sentSelected: false,
            draftSelected: false
        }
    },
    methods: {
        changeFolder(folder){
            console.log('changeFolder', folder);
            this.$emit('changeFolder', folder);
            
            this.allSelected = false;
            this.inboxSelected = false;
            this.sentSelected = false;
            this.draftSelected = false;

            if(folder ===  'all') this.allSelected = true;
            if(folder === 'inbox') this.inboxSelected = true;
            if(folder === 'sent') this.sentSelected = true;
            if(folder === 'draft') this.draftSelected = true;
        }
    },
}