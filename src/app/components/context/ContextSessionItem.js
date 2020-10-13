import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'

const styles = theme => ({
  root: {
    width: '100%'
  },
  text: {
    display: 'inline-block',
    width: '180px',
    height: '21px',
    fontSize: '14px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  checkbox: {
    width: '36px',
    height: '36px',
    transition: 'opacity 100ms ease-in-out',
    opacity: 0.2,
    color: '#4285f4',
    '&:hover': {
      opacity: '1'
    }
  },
  forceDisplay: {
    opacity: '1 !important'
  },
  checkedStyle: {
    color: '#4285f4',
    fill: '#4285f4'
  }
})

class ContextSessionItem extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      isChecked: false
    }
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this)
  }

  handleCheckboxClick (event) {
    event.stopPropagation()
    this.props.onSelectSession(this.props.contextID, this.props.sessionID)
    this.setState({ isChecked: event.target.checked })
  }

  render () {
    const { checked, displayCheckbox, session } = this.props
    return (
      <ListItem
        button
        className={classes.root}
        style={{ backgroundColor: checked ? 'rgba(66, 33, 244, 0.18)' : null,  height: '48px'}}>
        <Grid container spacing={2} justify='flex-start' alignContent='center' alignItems='center'>
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={9}>
            <ListItemText primary={session.host} classes={{ primary: `${classes.text} ${checked ? classes.checkedStyle : null}` }} />
          </Grid>
          <Grid item xs={2}>
            <Checkbox style={{ color: '#4285f4' }} className={displayCheckbox || this.state.isChecked ? `${classes.forceDisplay} ${classes.checkbox} test` : `${classes.checkbox}`} onClick={this.handleCheckboxClick} checked={checked || this.state.isChecked} />
          </Grid>  
        </Grid>
      </ListItem>
    )
  }
}

export default withStyles(styles)(ContextSessionItem)
