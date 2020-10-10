import React from 'react'
// connect and pass the redux action into component
import { connect } from 'react-redux'
import { createRanking, updateRanking, deleteRanking } from '../../redux/actions/Ranking.js'

const mapStateToProps = (state) => {
  return {
    history: state.History
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createRanking: (target) => dispatch(createRanking(target)),
    updateRanking: (target) => dispatch(updateRanking(target)),
    deleteRanking: (target) => dispatch(deleteRanking(target))
  }
}

class RankingTab extends React.PureComponent {

  constructor (props) {
    super (props)
    this.state = {
      isSync: false
    }
  }


  render () {
    return (
      <div></div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RankingTab)
