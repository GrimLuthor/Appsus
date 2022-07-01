export default {
    template: `
        <header class="app-header">
            <div class="logo">
                <h1>Appsus</h1>
                <img class="horse" src="../img/horse-icon.png"> 
            </div>
            <nav class="nav-bar">
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="/book">Books</router-link></li>
                    <li><router-link to="/mail">Mail</router-link></li>
                    <li><router-link to="/note">Notes</router-link></li>
                    <li><router-link to="/about">About</router-link></li>
                </ul>
            </nav>
        </header>
    
    `
}