import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"
import { LoadingSpinner } from "../../../cmps/spinner.jsx"
import { UserMsg } from "../../../cmps/user-msg.jsx"
import { eventBusService } from '../../../services/event-bus.service.js'

export class MailApp extends React.Component {

    state = {
        mails: null,
        filterBy: null,
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        mailService.query(this.state.filterBy, this.props.folder)
            .then((mails) => {
                this.setState({ mails })
            })

    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadMails()
        })
    }

    onRemove = (mail) => {
        mailService.removeMail(mail)
            .then(() => {
                this.loadMails()
                const msg = {
                    txt: 'Successfully removed',
                    type: 'success'
                }
                eventBusService.emit('show-user-msg', msg)
            })
    }

    onRestore = (mail) => {
        mailService.restoreMail(mail)
            .then(() => {
                this.loadMails()
                const msg = {
                    txt: 'Successfully restored',
                    type: 'success'
                }
                eventBusService.emit('show-user-msg', msg)
            })
    }


    // getCounterUnread = () => {
    //     mailService.countUnread()
    //         .then((counterUnread) => {
    //             setState(counterUnread)
    //             console.log('counterUnread:', counterUnread)
    //         })
    // }

    render() {
        const { mails } = this.state

        if (!mails) {
            return <LoadingSpinner />
        }
        return (
            <section className="mail-app">
                <MailFilter counterUnread={this.state.counterUnread} onSetFilter={this.onSetFilter} />
                <MailList mails={mails} onRestore={this.onRestore} onRemove={this.onRemove} />
                <div className="user-message"><UserMsg /></div>
            </section>
        )
    }
}

