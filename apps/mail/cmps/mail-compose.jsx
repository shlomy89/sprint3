import { mailService } from "../services/mail.service.js"
import { LoadingSpinner } from "../../../cmps/spinner.jsx"
import { UserMsg } from "../../../cmps/user-msg.jsx"
import { eventBusService } from '../../../services/event-bus.service.js'

export class MailCompose extends React.Component {

    state = {
        loaded: false,
    }

    inputRef = React.createRef()

    componentDidMount() {
        const draftId = this.props.match.params.draftId
        if (draftId) {
            mailService.getById(draftId).
                then((draft) => {
                    this.setState({ draft, loaded: true }, this.setFocus)
                })
        } else {
            this.setState({
                draft: mailService.createMailObject(),
                loaded: true,
            }, this.setFocus)
        }
    }

    setFocus() {
        this.inputRef.current.focus()
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value

        this.setState((prevState) => ({
            draft: {
                ...prevState.draft,
                [field]: value
            }
        }), () => {
            mailService.saveDraft(this.state.draft)
                .then(() => {
                    console.log('saved')
                })
        })
    }

    onSubmit = (ev) => {
        ev.preventDefault()

        const { draft } = this.state
        draft.type = 'sent'
        draft.sentAt = new Date()

        mailService.sendEmail(draft)
            .then(() => {
                const msg = {
                    txt: 'Successfully sent',
                    type: 'success'
                }
                eventBusService.emit('show-user-msg', msg)
            })
    }

    onGoBack = () => {
        this.props.history.goBack()
    }

    render() {
        if (!this.state.loaded) {
            return <div><LoadingSpinner /></div>
        }

        const { to, subject, body } = this.state.draft

        return (
            <section className="mail-compose grid">
                <form className="compose-form grid" onSubmit={this.onSubmit}>
                    <input
                        className="to-input"
                        ref={this.inputRef}
                        type="text"
                        placeholder="To:"
                        id="to"
                        name="to"
                        value={to}
                        onChange={this.handleChange}
                    />
                    <input
                        className="subject-input"
                        type="text"
                        placeholder="Subject:"
                        id="subject"
                        name="subject"
                        value={subject}
                        onChange={this.handleChange}
                    />
                    <input
                        className="body-input"
                        placeholder="Body:"
                        id="body"
                        name="body"
                        value={body}
                        onChange={this.handleChange}
                    />
                    <button>Send</button>
                </form>
                <div className="user-message"><UserMsg /></div>
            </section >
        )
    }
}
