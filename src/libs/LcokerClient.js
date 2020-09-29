import Timer from "./Timer"

class LockerClient {
    url = null
    tabId = null
    endTime = null
    timer = null
    constructor (url) {
        this.url = url
        // Obtain the current tab Id by message
        chrome.runtime.sendMessage({ text: 'what is my tab id?' }, res => {
            this.tabId = request.options.tabId
        })
    }
    startListening () {
        console.log('Locker client starts listening ...')
        chrome.runtime.onMessage.addEventListener((request, sender, sendResponse) => {
            switch (type) {
                case 'pong':
                    this.pong()
                    break
                case 'lock':
                    this.lock(request.options.endTime)
            }
        })
    }

    pong (request) {
        // TODO: If current url is not allowed to access, then lock the current site.
    }

    lock (endTime) {
        this.endTime = endTime
        // TODO: wipe all content of the tab.
        // Start the internal second timer to emit second countdown event for rendering the countdown timer on the site.
        this.timer = new Timer(endTime)
        this.timer.on('clock', () => {
            // TODO: render the rest countdown time on the screen.
        })
        this.timer.on('timeout', this.unlock)
    }

    unlock () {
        // Remove the current session in the manager
        chrome.runtime.sendMessage({
            type: 'unlock',
            options: {
                url: this.url
            }
        })
        // TODO: refresh the current tab to obtain the original web content.
    }
}

export default LockerClient
