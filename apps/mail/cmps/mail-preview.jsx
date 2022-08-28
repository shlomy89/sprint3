import { mailService } from "../services/mail.service.js"

const { Link } = ReactRouterDOM

export function MailPreview({ mail, onRemove, onRestore }) {

    let linkTo = `/mail/${mail.type}/${mail.id}`
    if (mail.type === "drafts") {
        linkTo = "/mail/compose/" + mail.id
    }


    function onToggleUnread(mail) {
        mailService.toggleUnread(mail)
    }

    const input = mail.from
    var fields = input.split('@')
    var name = fields[0]

    return (
        <section className="mail-preview-container grid">
            <Link to={linkTo}>
                <article className="mail-preview grid">
                    <div className="preview-from">{name}</div>
                    <div className="preview-subject">{mail.subject}</div>
                    <div className="preview-received-at">{mail.receivedAt}</div>
                </article>
            </Link>

            <div className="btn preview-btn-container flex">
                <button className="btn toggle-is-read preview-btn" onClick={() => { onToggleUnread(mail) }}>
                    <i className="far fa-envelope"></i>
                </button>

                <button className="btn remove-mail preview-btn" onClick={() => { onRemove(mail) }}>
                    <i className="far fa-trash-alt"></i>
                </button>

                {mail.isRemoved && <button className="btn restore-mail preview-btn" onClick={() => { onRestore(mail) }}>Restore
                </button>}

            </div>
        </section>
    )
}