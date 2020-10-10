import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { ClickAwayListener, Grid, Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core'

class MainPage extends React.PureComponent {
    constructor (props) {
        super(props)
        // initialize state in component
        this.state = {
            auth: true,
            open: false,
            anchorRef: React.createRef()
        }
        // pre-bind the function
        this.handleToggle = this.handleToggle.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleListKeyDown = this.handleListKeyDown.bind(this)
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

    render () {
        return (
            <AppBar>
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
        )
    }
}

export default MainPage