/**
 * state: {
 *  'contextID': {
 *      title: String,
 *      sessions: {
 *          'sessionID': {
 *              host: String,
 *              endTime: Date
 *          }
 *      }
 *  }
 * }
 */


export default (state = {
  'test_context_123': {
    title: 'Test Context',
    sessions: {
      'test_session_123': {
        hots: 'facebook.com',
        endTime: new Date(Date.now + 1000 * 60 * 60)
      }
    }
  }
}, action) => {
  return state
}
