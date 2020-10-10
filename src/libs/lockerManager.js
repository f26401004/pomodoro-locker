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
        sessions.forEach(target => {
            const targetSession = this.sessions.find(iter => iter.origin === target.origin)
            if (targetSession) {
                targetSession.tabs = [...new Set([...targetSession.tabs, ...target.tabs])]
            } else {
                this.sessions.push(target)
            }
        })
        console.log(this.sessions)
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
                console.log(`lock target website: ${target}`)
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
            switch (request.type) {
                case 'ping':
                    this.pong(request, sender)
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

    pong (request, sender) {
        const urlInstance= new URL(sender.url)
        const host = urlInstance.host
        console.log(host)

        // Send pong message directly.
        chrome.tabs.sendMessage(sender.tab.id, {
            type: 'pong',
            options: {
                tabId: sender.tab.id
            }
        })
        // Save the current tab into session.
        const targetSession = this.sessions.find(target => host.match(target.regexp))
        if (!targetSession) {
            return
        }
        // Remove the session if current time surpass the end time.
        if (targetSession.endTime && new Date - new Date(targetSession.endTime) > 0) {
            this.removeSession(request)
            return
        }
        // Send lock message to tab
        chrome.tabs.sendMessage(sender.tab.id, {
            type: 'lock',
            options: {
                endTime: targetSession.endTime
            }
        })
    }

    addSession (request) {
        // If there is already has the same session which has identical host, then just update the endTime and tabs
        const existSession = this.sessions.find(target => target.host === request.options.host)
        if (existSession) {
            existSession.endTime = request.options.endTime
            existSession.tabs.push(request.options.tabId)
        } else {
            this.sessions.push({
                host: request.options.host,
                tabs: [request.options.tabId],
                regexp: new RegExp(request.options.host)
            })
        }
        // Save the session into storage.
        window.localStorage['sessions'] = JSON.stringify(this.sessions)
    }

    removeSession (request) {
        const index = this.sessions.findIndex(target => request.options.host.match(target.regexp))
        if (index === -1) {
            return
        }
        this.sessions.splice(index, 1)
    }
}

export default new LockerManager([{
    host: 'www.facebook.com',
    endTime: new Date((new Date()).getTime() + 1000 * 60 * 1),
    regexp: new RegExp(`www.facebook.com`)
}])
