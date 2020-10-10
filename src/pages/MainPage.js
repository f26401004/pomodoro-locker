import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'

import ManageTab from '../components/context/ManageTab.js'
import HistoryTab from '../components/context/HistoryTab.js'
import RankingTab from '../components/context/RankingTab.js'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import HistoryIcon from '@material-ui/icons/History'
import AssessmentIcon from '@material-ui/icons/Assessment'
import { ClickAwayListener, Grid, Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core'

import SwipeableViews from 'react-swipeable-views'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
  },
  tabRoot: {
    width: '100%'
  }
})


function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (children)}
    </div>
  )
}

function GenerateTabLabel (index) {
  const tabs = [
    {name: 'Manage', icon: <BookmarkIcon/>},
    {name: 'History', icon: <HistoryIcon/>},
    {name: 'Ranking', icon: <AssessmentIcon/>},
  ]
  return (
    <Grid container spacing={1} justify="center" alignItems="center">
      <Grid container item xs={3}>
        {tabs[index].icon}
      </Grid>
      <Grid container item xs={7}>
        {tabs[index].name}
      </Grid>
    </Grid>
  )
}


class MainPage extends React.PureComponent {
  constructor (props) {
    super(props)
    // initialize state in component
    this.state = {
      auth: true,
      open: false,
      anchorRef: React.createRef(),
      currentTabIndex: 0
    }
    // pre-bind the function
    this.handleToggle = this.handleToggle.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleListKeyDown = this.handleListKeyDown.bind(this)
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleToggle () {
    this.setState({ open: !this.open })
  }

  handleClose (event) {
    if (this.state.anchorRef.current && this.state.anchorRef.current.contains(event.target)) {
        return
    }
    this.setState({ open: false })
  }

  handleListKeyDown (event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      this.setState({ open: false })
    }
  }

  handleTabChange (event, newValue) {
    this.setState({ currentTabIndex: newValue })
  }

  render () {
    const { classes } = this.props
    return (
      <Grid
        container
        className={classes.root}
        direction="row"
        justify="center"
        alignContent="flex-start"> 
        <Grid container item>
          <AppBar position="relative">
            <Toolbar>
              <Grid
                container
                justify="space-between"
                alignItems="center">
                <Grid
                  container
                  item
                  xs={5}>
                  <img />
                  <Typography variant="h6">
                    Pomodoro Locker
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={1}>
                  {this.state.auth && (
                    <div>
                      <IconButton
                        ref={this.state.anchorRef}
                        aria-controls={this.state.open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleToggle}
                        color="inherit">
                        <AccountCircleIcon/>
                      </IconButton>
                      <Popper
                        open={this.state.open}
                        anchorEl={this.state.anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal>
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                            <Paper>
                              <ClickAwayListener onClickAway={this.handleClose}>
                                <MenuList autoFocusItem={this.state.open}
                                  id="menu-list-grow"
                                  onKeyDown={this.handleListKeyDown}>
                                  <MenuItem> Profile </MenuItem>
                                  <MenuItem> Logout </MenuItem>
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </div>
                                    
                  )}
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid direction="row" container item>
          <Grid container item>
            <Tabs
              className={classes.root}
              value={this.state.currentTabIndex}
              onChange={this.handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth">
              <Tab label={GenerateTabLabel(0)}  id="full-width-tab-0" aria-controls="full-width-tabpanel-0"/>
              <Tab label={GenerateTabLabel(1)} id="full-width-tab-1" aria-controls="full-width-tabpanel-1"/>
              <Tab label={GenerateTabLabel(2)} id="full-width-tab-2" aria-controls="full-width-tabpanel-2"/>
            </Tabs>
          </Grid>
          <Grid container item>
            <SwipeableViews
              // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.currentTabIndex}>
              <TabPanel value={this.state.currentTabIndex} index={0}>
                <ManageTab/>
              </TabPanel>
              <TabPanel value={this.state.currentTabIndex} index={1}>
                <HistoryTab/>
              </TabPanel>
              <TabPanel value={this.state.currentTabIndex} index={2}>
                <RankingTab/>
              </TabPanel>
            </SwipeableViews>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(MainPage)