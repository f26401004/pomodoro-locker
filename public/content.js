import LockerClient from '../src/libs/LcokerClient.js'

let client = null

window.addEventListener('load', () => {
    // Stripped off url to origin and initialize locker lclient
    const url = this.location.href
    const origin = new URL(url).origin
    client = new LockerClient(origin)

    client.startListening()
    chrome.runtime.sendMessage({
        type: 'get_session',
        options: {
            url: origin
        }
    }, res => {
        // If the current session is in lock, then lock the current site.
        if (res.options.endTime && new Date() - new Date(res.options.endTime) < 0) {
            // Pass the unlock handler into lock function.
            client.lock(res.options.endTime)
        }
    })
})
