import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Scrollbars } from 'react-custom-scrollbars'

// connect and pass the redux action into component
import { connect } from 'react-redux'
import { createContext, updateContext, createSessionToContext, updateSessionInContext, deleteSessionInContext, deleteContext } from '../../redux/actions/Context.js'
import { Collapse, Grid, List, ListSubheader, TextField } from '@material-ui/core'

import ContextListItem from './ContextListItem.js'

const mapStateToProps = state => ({
  context: state.context
})
const mapDispatchToProps = dispatch => {
  return {
    createContext: target => dispatch(createContext(target)),
    updateContext: target => dispatch(updateContext(target)),
    createSessionToContext: target => dispatch(createSessionToContext(target)),
    updateSessionInContext: target => dispatch(updateSessionInContext(target)),
    deleteSessionInContext: target => dispatch(deleteSessionInContext(target)),
    deleteContext: target => dispatch(deleteContext(target))
  }
}

const styles = theme => ({
  header: {
    padding: '0'
  },
  root: {
    padding: '24px',
    boxSizing: 'border-box',
    height: '100%'
  },
  listRoot: {
  }
})


// HOS for operation container
function OperationContainer (props) {
  return
}

// HOC for virtualized list
function ListRow ({ index, style, data }) {
  const { contexts, filteredContextsID, selectedContextsID, selectContext, unselectContext } = data
  const targetContextID = filteredContextsID[index]
  const targetContext = contexts[targetContextID]
  return (
    <div style={style}>
      <ContextListItem
        key={`context-${index}-${targetContextID}`}
        context={targetContext}
        contextID={targetContextID}
        isDisplayCheckbox={selectedContextsID.length > 0}
        checked={selectedContextsID.includes(targetContextID)}
        onSelect={selectContext}
        onUnselect={unselectContext} />
    </div>
  )
}

class ManageTab extends React.PureComponent {

  constructor (props) {
    super (props)
    this.state = {
      isOpenCreateContext: false,
      tempContext: {
        title: '',
        sessions: {},
        listRef: React.createRef()
      },
      filteredContextsID: Object.keys(props.context),
      selectedContextsID: [],
      searchKey: ''
    }
    console.log(this.state)

    this.selectContext = this.selectContext.bind(this)
    this.unselectContext = this.unselectContext.bind(this)
  }

  selectContext (contextID) {
    if (this.state.selectedContextsID.includes(contextID)) {
      return
    }
    this.setState({ selectedContextsID: [...this.state.selectedContextsID, contextID] })
  }

  unselectContext (contextID) {
    if (!this.state.selectedContextsID.includes(contextID)) {
      return
    }
    this.setState({ selectedContextsID: this.state.selectedContextsID.filter(target => target !== contextID) })
  }


  render () {
    // extract the context object from props
    const { context, classes } = this.props
    // extract the handler from props
    const { deleteContext } = this.props
    return (
      <div className={classes.root}>
        <Grid container spacing={2} direction="row" justify="flex-start" alignContent="flex-start" style={{ height: '100%' }}>
          <Grid container item>
            <TextField label="Search contexts" variant="outlined" size="small" fullWidth></TextField>
          </Grid>
          <Grid container item style={{ height: 'calc(100% - 56px)' }}>
            <List style={{ width: '100%' }}>
              <Scrollbars
                onScroll={this.handleScroll}
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={500}>
                <ListSubheader
                  className={classes.header}
                  key='operation-container'>
                  <Collapse in={this.state.selectedContextsID.length > 0} mountOnEnter unmountOnExit style={{ transformOrigin: '0 0 0' }} timeout={100}>
                    <OperationContainer />
                  </Collapse>
                </ListSubheader>
                <AutoSizer>
                  { 
                    ({ height, width }) => {
                      return (
                        <React.Fragment>
                          <FixedSizeList
                            height={height}
                            width={width - 12}
                            ref={this.state.listRef}
                            itemCount={this.state.filteredContextsID.length}
                            itemData={{
                              contexts: context,
                              filteredContextsID: this.state.filteredContextsID,
                              selectedContextsID: this.state.selectedContextsID,
                              selectContext: this.selectContext,
                              unselectContext: this.unselectContext
                            }}
                            style={{ overflow: false }}
                            itemSize={20}>
                            {ListRow}
                          </FixedSizeList>
                        </React.Fragment>
                      )
                    }
                  }
                </AutoSizer>
              </Scrollbars>
            </List>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ManageTab))


