import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core'

class MainPage extends React.Component {
    constructor (props) {
        super(props)
        this.auth = true
        this.open = false
        this.anchorRef = React.createRef()
    }

    handleToggle () {
        this.open = !this.open
    }

    handleClose (event) {
        if (this.anchorRef.current && this.anchorRef.current.contains(event.target)) {
            return
        }
        this.open = false
    }

    handleListKeyDown (event) {
        if (event.key === 'Tab') {
            event.preventDefault()
            this.open = false
        }
    }

    render () {
        return (
            <AppBar>
                <Toolbar>
                    <img />
                    <Typography variant="h6">
                        Pomodoro Locker
                    </Typography>
                    {this.auth && (
                        <IconButton
                            ref={this.anchorRef}
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={this.handleToggle}
                            color="inherit">
                            <AccountCircleIcon/>
                            <Popper
                                open={this.open}
                                anchorEl={this.anchorRef}
                                role={undefined}
                                transition
                                disablePortal>
                                {({ TransitionProps }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: 'center top' }}>
                                        <Paper>
                                            <ClickAwayListener onClickAway={this.handleClose}>
                                                <MenuList autoFocusItem={this.open}
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
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

export default MainPage