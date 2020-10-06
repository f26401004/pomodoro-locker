import { EventEmitter } from 'events'

function timeFormatDYMS (msec) {
    const day = parseInt(msec / 1000 / 60 / 60 / 24)
    const hr = String(parseInt(msec / 1000 / 60 / 60 % 24)).padStart(2, '0')
    const min = String(parseInt(msec / 1000 / 60 % 60)).padStart(2, '0')
    const sec = String(parseInt(msec / 1000 % 60)).padStart(2, '0')
    let remainingTime = day > 0 ? `${day}天` : ''
    remainingTime += `${hr}:${min}:${sec}`
    return remainingTime
}
    

class Timer {
  constructor (time) {
    this.endTime = time
    this.interval = null
    this.event = new EventEmitter()
    this.eventHash = {}

    // if timeString exist, then just start countdown directly
    if (time && this.isCountable) {
      this.setEndTime(time)
    }
  }

  get getEndTime () {
    return this.endTime
  }

  get isCounting () {
    return this.interval !== null
  }

  get computeTimeString () {
    if (!this.endTime) {
      return
    }

    const currentTime = new Date()
    const endTime = new Date(this.endTime)
    const msec = endTime.getTime() - currentTime.getTime()
    return timeFormatDYMS(msec)
  }

  get isCountable () {
    const currentTime = new Date()
    const endTime = new Date(this.endTime)
    const msec = endTime.getTime() - currentTime.getTime()
    return msec >= 900
  }

  on (type, callback) {
    // replace origin event
    if (this.eventHash[type]) {
      this.event.off(this.callback)
      delete this.eventHash[type]
    }
    this.event.on(type, callback)
    this.eventHash[type] = callback
  }

  setEndTime (time) {
    this.destroy()
    this.endTime = time ? new Date(time) : null
    // check is countable
    if (!this.isCountable) {
      this.event.emit('timeout', '00:00:00')
      return
    }

    // render for the first time
    const remainingTime = this.computeTimeString
    this.event.emit('clock', remainingTime)

    // set up the internal interval to countdown
    this.interval = setInterval(() => {
      if (this.isCountable) {
        const remainingTime = this.computeTimeString
        this.event.emit('clock', remainingTime)
      } else {
        this.destroy()
        this.event.emit('timeout', '00:00:00')
      }
    }, 1000)
  }

  destroy () {
    this.endTime = null
    clearInterval(this.interval)
  }
}

export default Timer
