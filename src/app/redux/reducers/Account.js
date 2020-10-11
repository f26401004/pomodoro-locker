/**
 * state: {
 *  username: String,
 *  email: String,
 *  ranking: Number,
 *  record: {
 *      totalSession: Number,
 *      totalTime: Number,
 *      isSync: Boolean
 *  }
 * }
 */


export default (state = {
  username: '',
  email: '',
  record: {
    totalSession: 0,
    totalTime: 0,
    isSync: false
  }
}, action) => {
  return state
}