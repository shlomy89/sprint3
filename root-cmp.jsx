import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { MailIndex } from "./apps/mail/views/mail-index.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export class App extends React.Component {

    render() {

        return <Router>
            <section className="app">
                <AppHeader />
                <Switch>
                    <Route path="/mail" component={MailIndex} />
                    <Route path="/notes" component={NoteIndex} />
                    <Route path="/about" component={About} />
                    <Route path="/" component={Home} />
                </Switch>
            </section>
        </Router>
    }
}