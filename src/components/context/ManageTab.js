import React from 'react'
// connect and pass the redux action into component
import { connect } from 'react-redux'
import { createContext, updateContext, createSessionToContext, updateSessionInContext, deleteSessionInContext, deleteContext } from '../../redux/actions/Context.js'

const mapStateToProps = (state) => {
  return {
    context: state.Context
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createContext: (target) => dispatch(createContext(target)),
    updateContext: (target) => dispatch(updateContext(target)),
    createSessionToContext: (target) => dispatch(createSessionToContext(target)),
    updateSessionInContext: (target) => dispatch(updateSessionInContext(target)),
    deleteSessionInContext: (target) => dispatch(deleteSessionInContext(target)),
    deleteContext: (target) => dispatch(deleteContext(target))
  }
}

class ManageTab extends React.PureComponent {

  constructor (props) {
    super (props)
    this.state = {
      isOpenCreateContext: false,
      tempContext: {
        title: '',
        sessions: {}
      }
    }
  }


  render () {
    return (
      <div></div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTab)
