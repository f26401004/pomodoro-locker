import { combineReducers } from 'redux'
import account from './Account.js'
import context from './Context.js'

const rootReducer = combineReducers({
    account,
    context
})

export default rootReducer
