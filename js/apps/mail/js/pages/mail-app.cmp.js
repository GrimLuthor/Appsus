export default {
 template: `
 <h1>mail app</h1>
`,
data() {
    return {
        email: {
            id: 'e101',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt : 1551133930594,
            to: 'momo@momo.com'
        },
        loggedinUser: {
            email: 'user@appsus.com',
            fullname: 'Mahatma Appsus'
        }
           
    };
},
created() {},
methods: {},
computed: {},
unmounted() {},
};