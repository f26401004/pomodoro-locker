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


export const updateHistroy = payload => ({
  type: 'UPDATE_HISTORY',
  payload
})

export const deleteHistroy = payload => ({
  type: 'DELETE_HISTROY',
  payload
})
