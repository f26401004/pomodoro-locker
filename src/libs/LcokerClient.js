import Timer from "./Timer"

const pomodoroTemplate = `
    <div style="width: 100vw; height: 100vh; display: flex; justify-items: center; justify-content: center; align-items: center; align-content: center;">
        <time id="displayTimeString"></time>
    </div>
`

class LockerClient {
    
    constructor (url) {
        this.host = null
        this.tabId = null
        this.endTime = null
        this.timer = null
        this.displayTimeString = null
        this.timerDOM = null
        
        const urlInstance= new URL(url)
        this.host = urlInstance.host
        // Obtain the current tab ID by message
        chrome.runtime.sendMessage({ text: 'what is my tab id?' }, res => {
            this.tabId = res.options.tabId
            // Send ping message to lock manager after retrieving tab ID.
            chrome.runtime.sendMessage({
                type: 'ping',
                options: {
                    host: this.host,
                    tabId: this.tabId
                }
            })
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
        // If current url is not allowed to access, then lock the current site.
        if (request.options.endTime && new Date() - new Date(request-options.endTime) < 0) {
            this.lock(request.options.endTime)
        }
    }

    lock (endTime) {
        this.endTime = endTime
        // Wipe all content of the tab.
        document.body.innerHTML = pomodoroTemplate
        this.timerDOM = document.querySelector('#displayTimeString')
        // Start the internal second timer to emit second countdown event for rendering the countdown timer on the site.
        this.timer = new Timer(endTime)
        this.timer.on('clock', (timeString) => {
            this.displayTimeString = timeString
            if (!this.timerDOM) {
                return
            }
            // Render the rest countdown time on the screen.
            this.timerDOM.innerText = timeString
        })
        this.timer.on('timeout', this.unlock)
    }

    unlock () {
        // Remove the current session in the manager
        chrome.runtime.sendMessage({
            type: 'unlock',
            options: {
                origin: this.origin
            }
        })
        // Refresh the current tab to obtain the original web content.
        window.location.reload()
    }
}

export default LockerClient
