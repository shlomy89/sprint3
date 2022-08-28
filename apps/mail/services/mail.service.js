import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const mailService = {
    query,
    removeMail,
    toggleUnread,
    getById,
    countUnread,
    sendEmail,
    restoreMail,
    saveDraft,
    createMailObject,
}

const loggedInUser = {
    email: 'sergio@constantsa.com',
    fullName: 'Sergio Constantsa'
}

const STORAGE_KEY = 'emails'
const NUMBER_OF_MAILS_TO_GENERATE = 20
var mailsDB = []

function query(filterBy, type) {
    return _simulateLatency(() => {
        if (!mailsDB.length) {
            _initDB()
        }

        return _fetch(filterBy, type)
    })
}

function _initDB() {
    mailsDB = _loadFromStorage() || []
    if (!mailsDB.length) {
        for (let i = 0; i < NUMBER_OF_MAILS_TO_GENERATE; i++) {
            mailsDB.push(_createDummyEmail())
        }
        _saveToStorage()
    }
}

function _fetch(filterBy, type) {
    var mails

    switch (type) {
        case "trash":
            mails = mailsDB.filter(mail => mail.isRemoved)
            break;
        default:
            mails = mailsDB.filter(mail => mail.type === type && !mail.isRemoved)
    }

    if (filterBy) {
        let { bySearch, isRead } = filterBy
        if (!bySearch) bySearch = ''

        if (isRead !== "all") {
            mails = mails.filter(mail => mail.isRead === isRead)
        }

        mails = mails.filter(mail =>
            mail.subject.toLowerCase().includes(bySearch.toLowerCase()) ||
            mail.body.toLowerCase().includes(bySearch.toLowerCase()) ||
            mail.from.toLowerCase().includes(bySearch.toLowerCase())
        )
    }
    return mails
}

function createMailObject() {
    return {
        id: utilService.makeId(),
        to: '',
        from: loggedInUser.email,
        subject: '',
        body: '',
        isRead: false,
        isRemoved: false,
        type: 'inbox'
    }
}

function _createDummyEmail() {
    const { makeLorem, makeRandName, randomDate, randomBoolean, makeRandDomain, showTime } = utilService

    return {
        ...createMailObject(),
        to: loggedInUser.fullName,
        from: `${makeRandName()}@${makeRandDomain()}.com`,
        subject: makeLorem(2),
        body: makeLorem(30),
        sentAt: randomDate(),
        receivedAt: showTime(),
        isRead: randomBoolean(),
        isRemoved: false
    }
}

function sendEmail(newMail) {
    return _simulateLatency(() => {

        newMail.from = loggedInUser.email
        if (newMail.to.toLowerCase() === loggedInUser.email) {
            newMail.type = 'inbox'
            newMail.receivedAt = new Date()
        }

        const idx = _getMailIdx(newMail.id)
        mailsDB[idx] = newMail
        _saveToStorage()
    })
}

function saveDraft(draft) {
    return _simulateLatency(() => {
        draft.type = "drafts"
        draft.isRemoved = false
        let existingIdx = _getMailIdx(draft.id)
        if (existingIdx === -1) {
            mailsDB.push(draft)
        } else {
            mailsDB[existingIdx] = draft
        }
        _saveToStorage()
    })
}

function _simulateLatency(f) {
    const timeout = utilService.getRandomIntInclusive(1, 700)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(f())
        }, timeout)
    })
}

function removeMail(mail) {
    return _simulateLatency(() => {

        const idx = _getMailIdx(mail.id)

        if (mail.isRemoved) {
            mailsDB.splice(idx, 1)
        } else {
            mailsDB[idx].isRemoved = true
        }
        _saveToStorage()
    })
}

function restoreMail(mail) {
    return _simulateLatency(() => {
        const idx = _getMailIdx(mail.id)

        mailsDB[idx].isRemoved = false
        _saveToStorage()

        return idx
    })
}

function getById(mailId) {
    return _simulateLatency(() => {
        if (!mailId) return null
        return mailsDB.find(mail => mailId === mail.id)
    })
}

function toggleUnread(mail) {
    return _simulateLatency(() => {
        mail.isRead = !mail.isRead
        console.log('isRead:', mail.isRead)
        _saveToStorage()
        countUnread()
        return mail.isRead
    })
}

function countUnread() {
    return _simulateLatency(() => {
        let counter = mailsDB.filter(mail => !mail.isRead).length
        return counter
    })
}

function _getMailIdx(id) {
    return mailsDB.findIndex(mail => mail.id === id)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(STORAGE_KEY)
}

function _saveToStorage() {
    storageService.saveToStorage(STORAGE_KEY, mailsDB)
}
