import { v4 as uuidv4 } from 'uuid'

class LockerManager {
    constructor (contexts) {
        this.contexts = {} // the context object
        this.client = null // the client information

        // Retrieve the context from storage and merge it with the constructor's argument.
        if (window.localStorage['contexts']) {
            this.contexts = JSON.parse(window.localStorage['contexts'])
            // Filter out the expired records
            Object.keys(this.contexts).forEach(key => {
                this.contexts[key].sessions = this.contexts[key].sessions.filter(target => new Date() - new Date(target.endTime) < 0)
            })
        }
        this.contexts = {
            ...this.contexts,
            ...contexts
        }
        // Send lock message to client when the locker manager starts up.
        chrome.tabs.query({}, result => {
            console.log(result)
            result.forEach(target => {
                const url = new URL(target.url)
                const tempContexts = Object.values(this.contexts)
                for (let i = 0; i < tempContexts.length; ++i) {
                    const targetSession = tempContexts[i].sessions.find(iter => url.host === iter.host)
                    if (!targetSession || !targetSession.endTime) {
                        continue
                    }
                    if (new Date() - new Date(targetSession.endTime) > 0) {
                        continue
                    }
                    console.log(`lock target website: `, target)
                    chrome.tabs.sendMessage(target.id, {
                        type: 'lock',
                        options: {
                            endTime: target.endTime
                        }
                    })
                    break
                }
            })
        })
        // Detect the removal among the tabs.
        chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
            // Remove the tab ID in sessions.
            Object.values(this.contexts).forEach(context => {
                for (let i = 0; i < context.sessions.length; ++i) {
                    const index = context.sessions[i].tabs.findIndex(target => target === tabId)
                    if (index !== -1) {
                        context.sessions[i].tabs.splice(index, 1)
                        return
                    }
                }
            })
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
                case 'get_context':
                    chrome.runtime.sendMessage({
                        type: 'context_information',
                        options: {
                            contexts: this.contexts
                        }
                    })
                    break
                case 'add_context':
                    this.addContext(request)
                    break
                case 'delete_context':
                    this.deleteContext(request)
                    break
                case 'add_session':
                    this.addSession(request)
                    break
                case 'delete_session':
                    this.deleteSession(request)
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
        Object.values(this.contexts).forEach(context => {
            const targetSession = context.sessions.find(target => host.match(target.regexp))
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
        })
    }

    addContext (request) {
        const contextID = uuidv4()
        this.contexts[contextID] = reqeust
    }

    deleteContext (request) {
        const contextID = request.options.contextID
        const { [contextID]: value, ...rest } = this.contexts
        this.contexts = rest
    }

    addSession (request) {
        // If there is already has the same session which has identical host, then just update the endTime and tabs
        const targetContext = this.contexts[request.options.contextID]
        const existSession = targetContext.sessions.find(target => target.host === request.options.host)
        if (existSession) {
            existSession.endTime = request.options.endTime
            existSession.tabs.push(request.options.tabId)
        } else {
            this.sessions.push({
                id: uuidv4(),
                host: request.options.host,
                tabs: [request.options.tabId],
                endTime: request.options.endTime,
                regexp: new RegExp(request.options.host)
            })
        }
        // Save the session into storage.
        window.localStorage['contexts'] = JSON.stringify(this.contexts)
    }

    removeSession (request) {
        console.log(request)
        const targetContext = this.contexts[request.options.contextID]
        const index = targetContext.sessions.findIndex(target => request.options.host.match(target.regexp))
        if (index === -1) {
            return
        }
        targetContext.sessions.splice(index, 1)
        // Save current context into local storage
        window.localStorage['contexts'] = JSON.stringify(this.contexts)
        // Send the current context to popup for update
        chrome.runtime.sendMessage({
            type: 'context_information',
            options: {
                contexts: this.contexts
            }
        })
    }
}

export default new LockerManager({
    'test_context_123': {
        title: 'Test Context',
        sessions: [{
            id: 'test_session_123',
            host: 'www.facebook.com',
            tabs: [],
            endTime: new Date((new Date()).getTime() + 1000 * 60 * 1),
            regexp: new RegExp(`www.facebook.com`)
        }]
    }
})
