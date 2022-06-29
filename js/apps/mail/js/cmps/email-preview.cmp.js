"use strict"

export default {
    props: ["email"],
    template: `
        <div class="email-text">
        <p>{{email.folder}}</p>
        <p>{{email.fromName}} &lt&lt<span>{{email.fromEmail}}</span>>> </p>
        <p>{{email.subject}}</p>
        <p>{{email.body}}</p>
        </div>
    `
}