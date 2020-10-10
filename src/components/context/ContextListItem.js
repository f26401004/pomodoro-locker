import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'

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


class ContextListItem extends React.PureComponent {

  constructor (props) {
    super (props)
    this.state = {
      isDisplayCheckbox: props.isDisplayCheckbox
    }

    this.handleCheckboxClick = this.handleCheckboxClick.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    console.log(props, state)
    if (props.isDisplayCheckbox !== state.isDisplayCheckbox) {
      state.isDisplayCheckbox = props.isDisplayCheckbox
      return state
    }
    return null
  }

  handleCheckboxClick (event) {
    event.stopPropagation()
    if (event.target.checked) {
      this.props.onSelect(this.props.contextID)
    } else {
      this.props.onUnselect(this.props.contextID)
    }
  }


  render () {
    const { classes } = this.props
    const { checked, context } = this.props
    return (
      <React.Fragment>
        <ListItem
          button
          className={classes.root}
          style={{ backgroundColor: checked ? 'rgba(66, 33, 244, 0.18)' : null,  height: '48px'}}>
          <Grid container spacing={2} justify='flex-start' alignContent='center' alignItems='center'>
            <Grid item xs={1}>
              <ListItemIcon>
                <AccessAlarmIcon className={checked ? classes.checkedStyle : null} />
              </ListItemIcon>
            </Grid>
            <Grid item xs={9}>
              <ListItemText primary={context.title} classes={{ primary: `${classes.text} ${checked ? classes.checkedStyle : null}` }} />
            </Grid>
            <Grid item xs={2}>
              <Checkbox style={{ color: '#4285f4' }} className={this.state.isDisplayCheckbox ? `${classes.forceDisplay} ${classes.checkbox} test` : `${classes.checkbox}`} onClick={this.handleCheckboxClick} checked={checked} />
            </Grid>  
          </Grid>
        </ListItem>
      </React.Fragment>
    )
    return (<div></div>)
  }
}

export default withStyles(styles)(ContextListItem)
