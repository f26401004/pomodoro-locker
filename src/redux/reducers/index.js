import { combineReducers } from 'redux'
import account from './account'
import context from './context'

const rootReducer = combineReducers({
    account,
    context
})

export default rootReducer
