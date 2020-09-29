
class LockerManager {
    sessions = []
    tabs = []
    constructor (sessions) {
        // TODO: retrieve the session from storage.
        this.sessions = sessions
        // Send lock message to client when the lcoker manager starts up.
        chrome.tabs.query({}, result => {
            result.forEach(target => {
                const targetSession = this.sessions.find(iter => target.url.indexOF(iter.origin) !== -1)
                if (!targetSession) {
                    return
                }
                if (!targetSession.endTime) {
                    return
                }
                if (new Date() - new Date(targetSession.endTime) > 0) {
                    return
                }
                chrome.tabs.sendMessage(target.tabId, {
                    type: 'lock',
                    options: {
                        endTime: target.endTime
                    }
                })
            })
        })
        // Detect the update among the tabs
        chrome.tabs.addEventListener('updated', (tabId, changeInfo) => {
            // TODO: lock the site if it is listed in the session and has endTime.
        })
        // Detec the remove among the tabs 
        chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
            // TODO: remove the tab Id in sessions.
        })
    }

    startListening () {
        console.log('Start listening tab information ...')
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            console.log(request)
            switch (request.type) {
                case 'ping':
                    this.pong(request)
                    break
                case 'count_end':
                    this.removeSession(request)
                    break
            }
        })
    }

    pong (request) {
        // Send pong message directly.
        chrome.runtime.sendMessage({
            type: 'pong'
        })
        // Save the current tab into session.
        const tabRe = new RegExp(`^${request.options.origin}`)
        const targetSession = this.sessions.find(target => target.indexOf(target.origin) !== -1)
        if (!targetSession) {
            this.sessions.push({
                origin: request.options.origin,
                tabs: [request.tabId],
                endTime: null
            })
        } else {
            // Only add the tab id if it does not present in session.
            // Redundant ping might occur when user refresh the same page.
            if (!targetSession.tabs.includes(target.options.tabId)) {
                targetSession.tabs.push(request.options.tabId)
            }
        }
        // If the current tab  url is forbidden, then send lock message to tab
        if (targetSession.endTime && new Date() - new Date(target.endTime) < 0) {
            chrome.runtime.sendMessage({
                type: 'lock',
                options: {
                    endTime: target.endTime
                }
            })
        }
    }

    addSession ()

    removeSession (request) {

    }
}

export default new LockerManager()
