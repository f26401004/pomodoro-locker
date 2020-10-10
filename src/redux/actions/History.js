/**
 * state: {
 *  'contextID': {
 *      title: String,
 *      sessions: {
 *          'sessionID': {
 *              host: String,
 *              endTime: Date,
 *              isSuccess: Boolean
 *          }
 *      }
 *  }
 * }
 */


export const createHistory = payload => ({
  type: 'CREATE_HISTORY',
  payload
})


export const updateHistory = payload => ({
  type: 'UPDATE_HISTORY',
  payload
})

export const deleteHistory = payload => ({
  type: 'DELETE_HISTORY',
  payload
})
