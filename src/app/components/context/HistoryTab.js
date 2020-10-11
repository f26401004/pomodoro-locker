import React from 'react'
// connect and pass the redux action into component
import { connect } from 'react-redux'
import { createHistory, updateHistory, deleteHistory } from '../../redux/actions/History.js'

const mapStateToProps = (state) => {
  return {
    history: state.History
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createHistory: (target) => dispatch(createHistory(target)),
    updateHistory: (target) => dispatch(updateHistory(target)),
    deleteHistory: (target) => dispatch(deleteHistory(target))
  }
}

class HistoryTab extends React.PureComponent {

  constructor (props) {
    super (props)
  }


  render () {
    return (
      <div></div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTab)
