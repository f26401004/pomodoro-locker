
class LockerManager {
    sessions = []
    tabs = []
    constructor (sessions) {
        // Retrieve the session from storage and merge it with the constructor's argument.
        this.sessions = JSON.parse(window.localStorage['sessions'])
        sessions.forEach(target => {
            const targetSession = this.sessions.find(iter => iter.origin === target.origin)
            if (targetSession) {
                targetSession.tabs = [...new Set([...targetSession.tabs, ...target.tabs])]
            } else {
                this.sessions.push(target)
            }
        })
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
        // Detect the removal among the tabs.
        chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
            // Remove the tab Id in sessions.
            for (let i = 0; i < this.sessions.length; ++i) {
                const index = this.sessions[i].tabs.findIndex(target => target === tabId)
                if (index !== -1) {
                    this.sessions[i].tabs.splice(index, 1)
                    return
                }
            }
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
