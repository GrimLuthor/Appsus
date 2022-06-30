
export default {
    props: ["email"],
    template: `
        <section>
            <div>
            <span class="details-from">{{email.fromName}}</span> <span>&lt&lt{{email.fromEmail}}>> </span> <button class="btn-close" @click="close">X</button>
            </div>
            <br>
            <div class="email-subject">{{email.subject}}</div>
            <br>
            <div class="details-body">{{email.body}}</div>
            
        </section>
    `,
    methods: {
        close(event){
            event.stopPropagation();
            this.$emit('close');
        }
    },
}