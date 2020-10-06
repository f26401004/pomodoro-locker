import LockerManager from './libs/lockerManager.js'

// Config the channel instance in window
window.__POMODORO_ = {
  lockerManager: LockerManager
}

try {
  window.__POMODORO_.lockerManager.startListening()
} catch (error) {
  console.log(error)
}