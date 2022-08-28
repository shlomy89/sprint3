import { mailService } from '../services/mail.service.js'
import { UserMsg } from "../../../cmps/user-msg.jsx"
import { eventBusService } from '../../../services/event-bus.service.js'
import { LoadingSpinner } from "../../../cmps/spinner.jsx"

export class MailDetails extends React.Component {

    state = {
        mail: null
    }

    componentDidMount() {
        this.loadMail()
    }

    loadMail = () => {
        const { mailId } = this.props.match.params
        mailService.getById(mailId)
            .then((mail) => {
                if (!mail) return this.onGoBack()
                this.setState({ mail })
            })
    }

    onRemove = (mail) => {
        mailService.removeMail(mail)
            .then(() => {
                const msg = {
                    txt: 'Successfully removed',
                    type: 'success'
                }
                eventBusService.emit('show-user-msg', msg)
                this.loadMail()
                setTimeout(() => {
                    this.onGoBack()
                }, 2000)
            })
    }

    onGoBack = () => {
        this.props.history.goBack()
    }

    render() {
        const { mail } = this.state
        if (!mail) return <div><LoadingSpinner /></div>
        return (
            <section className="mail-details">
                <div className="mail-content">
                    <h3>From: {mail.from}</h3>
                    <h3>To: {mail.to}</h3>
                    <hr />
                    <h3>Subject: {mail.subject}</h3>
                    <hr />
                    <h3>{mail.body}</h3>
                    <hr />
                    <h3>Received At: {mail.receivedAt}</h3>
                </div>
                <h1>{mail.bod}</h1>
                <button className="remove-mail" onClick={() => {
                    this.onRemove(mail)
                }}>Remove
                </button>
                <button className="go-back" onClick={() => {
                    this.onGoBack()
                }}>Go Back
                </button>
                <UserMsg />
            </section>
        )
    }

}