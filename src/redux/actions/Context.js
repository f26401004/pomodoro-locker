export const createContext = payload => ({
    type: 'CREATE_CONTEXT',
    payload
})


export const updateContext = payload => ({
    type: 'UPDATE_CONTEXT',
    payload
})

export const createSessionToContext = payload => ({
    type: 'CREATE_SESSION_TO_CONTEXT',
    payload
})

export const updateSessionInContext = payload => ({
    type: 'UPDATE_SESSION_IN_CONTEXT',
    payload
})

export const deleteSessionInContext = payload => ({
    type: 'DELETE_SESSION_IN_CONTEXT',
    payload
})

export const deleteContext = payload => ({
    type: 'DELETE_CONTEXT',
    payload
})
