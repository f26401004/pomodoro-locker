import Timer from "./Timer"

const pomodoroTemplate = `
    <div style="width: 100vw; height: 100vh; display: flex; justify-items: center; justify-content: center; align-items: center; align-content: center;">
        <time id="displayTimeString"></time>
    </div>
`

class LockerClient {
    url = null
    tabId = null
    endTime = null
    timer = null
    displayTimeString = null
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
        // If current url is not allowed to access, then lock the current site.
        if (request.options.endTime && new Date() - new Date(request-options.endTime) < 0) {
            this.lock(request.options.endTime)
        }
    }

    lock (endTime) {
        this.endTime = endTime
        // Wipe all content of the tab.
        document.body.innerHTML = pomodoroTemplate

        // Start the internal second timer to emit second countdown event for rendering the countdown timer on the site.
        this.timer = new Timer(endTime)
        this.timer.on('clock', (timeString) => {
            this.displayTimeString = timeString
            // Render the rest countdown time on the screen.
            const targetDOM = document.querySelector('#displayTimeString')
            targetDOM.innerText = timeString
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
        // Refresh the current tab to obtain the original web content.
        window.location.reload()
    }
}

export default LockerClient
