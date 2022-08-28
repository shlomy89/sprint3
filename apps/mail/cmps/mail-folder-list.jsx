import { mailService } from "../services/mail.service.js" 

const { Link } = ReactRouterDOM

export function FolderList() {

    return (
        <section className="folder-list flex">

                    <Link to="/mail/compose">
                    <button>Compose</button>
                    </Link>

                    <Link to="/mail/inbox">
                    <button>Inbox</button>
                    </Link>

                    <Link to="/mail/sent">
                    <button>Sent</button>
                    </Link>

                    <Link to="/mail/drafts">
                    <button>Drafts</button>
                    </Link>

                    <Link to="/mail/trash">
                    <button>Trash</button>
                    </Link>


        </section >
    )

}