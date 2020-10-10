/**
 * state: {
 *  username: String,
 *  email: String,
 *  ranking: Number,
 *  record: {
 *      totalSession: Number,
 *      totalTime: Number,
 *      sync: Boolean
 *  }
 * }
 */

export const login = payload => ({
    type: 'LOGIN',
    payload
})

export const logout = payload => ({
    type: 'LOGOUT',
    payload
})

export const register = payload => ({
    type: 'REGISTER',
    payload
})

export const updateUsername = payload => ({
    type: 'UPDATE_USERNAME',
    payload
})

export const updateRecord = payload => ({
    type: 'UPDATE_RECORD',
    payload
})

