const { Link, NavLink, withRouter } = ReactRouterDOM


export function AppHeader() {
    return <header className="app-header">
        <Link to="/">
            <img src="./assets/img/logo_new.png"></img>
        </Link>
        <nav className="header-nav flex">
            <NavLink to="/notes"><i className="fa-regular fa-note-sticky"></i></NavLink>
            <NavLink to="/mail/inbox"><i className="fa-solid fa-envelopes-bulk"></i></NavLink>
            <NavLink to="/about"><i className="fa-solid fa-circle-info"></i></NavLink>
            <NavLink exact to="/"><i className="fa-solid fa-house"></i></NavLink>
        </nav>
    </header>
}
