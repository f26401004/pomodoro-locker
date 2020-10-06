class LockerManager {
    constructor (sessions) {
        this.sessions = [] // the session array
        this.client = null // the client information

        // Retrieve the session from storage and merge it with the constructor's argument.
        if (window.localStorage['sessions']) {
            this.sessions = JSON.parse(window.localStorage['sessions'])
            // Filter out the expired records
            this.sessions = this.sessions.filter(target => new Date() - new Date(target.endTime) < 0)
        }
        console.log(sessions)
        sessions.forEach(target => {
            const targetSession = this.sessions.find(iter => iter.origin === target.origin)
            if (targetSession) {
                targetSession.tabs = [...new Set([...targetSession.tabs, ...target.tabs])]
            } else {
                this.sessions.push(target)
            }
        })
        // Send lock message to client when the locker manager starts up.
        chrome.tabs.query({}, result => {
            result.forEach(target => {
                const url = new URL(target.url)
                const targetSession = this.sessions.find(iter => url.host === iter.host)
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
            // Remove the tab ID in sessions.
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
                case 'client_info':
                    this.client = request.options
                    break
                case 'count_end':
                    this.removeSession(request)
                    break
                case 'get_sessions':
                    chrome.runtime.sendMessage({
                        type: 'session_information',
                        options: {
                            sessions: this.sessions
                        }
                    })
                    break
                case 'add_session':
                    this.addSession(request)
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
        const targetSession = this.sessions.find(target => target.regexp.match(request.options.host) !== -1)
        if (!targetSession) {
            return
        }
        // Remove the session if current time surpass the end time.
        if (targetSession.endTime && new Date() - new Date(target.endTime) > 0) {
            this.removeSession(request)
            return
        }
        // Send lock message to tab
        chrome.runtime.sendMessage({
            type: 'lock',
            options: {
                endTime: targetSession.endTime
            }
        })
    }

    addSession (request) {
        this.sessions.push({
            host: request.options.host,
            tabs: [request.options.tabId],
            regexp: new RegExp(`^(https|http):\/\/${request.options.host}`)
        })
    }

    removeSession (request) {
        const index = this.sessions.findIndex(target => target.regexp.match(request.options.host))
        if (index === -1) {
            return
        }
        this.sessions.splice(index, 1)
    }
}

export default new LockerManager([])
