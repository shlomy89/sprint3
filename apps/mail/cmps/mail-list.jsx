import { MailPreview } from "../cmps/mail-preview.jsx"

export function MailList({ mails, onRemove, onRestore }) {

    return (

        <section className="mails-list flex column">

            {mails.reverse().map(mail => <MailPreview
                onRemove={onRemove}
                onRestore={onRestore}
                mail={mail}
                key={mail.id} />)}

        </section>
    )
}
