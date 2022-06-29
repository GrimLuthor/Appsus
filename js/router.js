import homePage from "./pages/home-page.cmp.js"
import aboutPage from "./pages/about-page.cmp.js"
//import bookApp from "./apps/book-app.cmp.js"
//import bookDetails from "./views/book-details.cmp.js"



const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    },
    // {
    //     path: '/book',
    //     component: bookApp
    // },
    // {
    //     path: '/book/:bookId',
    //     component: bookDetails
    // },
    // {
    //     path: '/mail',
    //     component: mail
    // },
    // {
    //     path: '/notes',
    //     component: notes
    // }
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})