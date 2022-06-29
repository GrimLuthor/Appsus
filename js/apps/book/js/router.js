import bookApp from './views/book-app.cmp.js';
import homePage from './views/home-page.cmp.js';
import aboutPage from './views/about-page.cmp.js';
import bookDetails from './views/book-details.cmp.js';
import bookEdit from './views/book-edit.cmp.js'

const aboutTeam = {
    template: `
        <section class="about-team">
            <h2>About Our Team</h2>
            <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate illum cum nam voluptas iste nulla, dolorum blanditiis! Dolorem, rerum libero! Nihil, corrupti rem! Dolorem rem explicabo pariatur nihil quae laboriosam!
            </p>
        </section>
    `
}
const aboutService = {
    template: `
        <section class="about-service">
            <h2>Top Services</h2>
            <p>
            Services bla Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate illum cum nam voluptas iste nulla, dolorum blanditiis! Dolorem, rerum libero! Nihil, corrupti rem! Dolorem rem explicabo pariatur nihil quae laboriosam!
            </p>
        </section>
    `
}

const routes = [
    {
        path: '/',
        component: homePage,
    },
    {
        path: '/about',
        component: aboutPage,
        children: [
            {
                path: 'team',
                component: aboutTeam
            },
            {
                path: 'service',
                component: aboutService
            },
        ]

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
        path: '/book/edit/:bookId?',
        component: bookEdit
    },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})