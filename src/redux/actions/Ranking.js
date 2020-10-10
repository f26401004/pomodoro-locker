/**
 * state: [{
 *  'username': String,
 *  'totalTime': Number
 * }]
 * }
 */


export const createRanking = payload => ({
  type: 'CREATER_RANKING',
  payload
})


export const updateRanking = payload => ({
  type: 'UPDATE_RANKING',
  payload
})

export const deleteRanking = payload => ({
  type: 'DELETE_RANKING',
  payload
})
