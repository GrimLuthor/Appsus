import homePage from "./pages/home-page.cmp.js"
import bookApp from "./apps/book/js/views/book-app.cmp.js"
import bookDetails from "../js/apps/book/js/views/book-details.cmp.js"
import mail from "./apps/mail/js/pages/mail-app.cmp.js"
import note from "./apps/note/js/pages/note-app.cmp.js"
import noteEdit from './apps/note/js/pages/note-edit.cmp.js'
import aboutPage from "./pages/about-page.cmp.js"




const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
    {
        path: '/mail',
        component: mail
    },
    {
        path: '/note',
        component: note,
    },
    {
        path: '/note/edit/:noteId?',
        component: noteEdit
    },

]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})