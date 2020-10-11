import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from "react-router-dom"
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import LockIcon from '@material-ui/icons/Lock'

const WhiteTextTypography = withStyles({
    root: {
      color: '#FFFFFF'
    }
  })(Typography)
const WhiteTextSecondaryTypography = withStyles({
    root: {
      color: '#FFFFFF',
      opacity: '0.7'
    }
})(Typography)

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, rgba(33,150,243,1) 0%, rgba(30,136,229,1) 60%, rgba(255,255,255,1) 60%, rgba(255,255,255,1) 100%)',
        padding: '36px',
        boxSizing: 'border-box'
    },
    titleContainer: {
        height: '40vh',
        paddingTop: '7vh !important',
        boxSizing: 'border-box'
    },
    logo: {
        backgroundColor: 'white',
        width: '96px',
        height: '96px',
        borderRadius: '100%',
        border: 'none',
        outline: 'none'
    },
    cardContainer: {
        width: '90%',
        height: '43vh',
        padding: '24px',
        boxSizing: 'border-box'
    }
})

const LoginCard = ({ classes }) => {
    console.log(classes)
    return (
        <Card className={classes.cardContainer}>
            <CardContent>
                <Grid
                    container
                    item
                    spacing={2}
                    justify="center">
                    <Grid item>
                        <TextField
                            size="small"
                            label="Username"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleIcon />
                                    </InputAdornment>
                                )
                            }}>
                        </TextField>
                    </Grid>
                    <Grid item>
                        <TextField
                            size="small"
                            label="Password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                )
                            }}>
                        </TextField>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Grid
                    container
                    spacing={1}
                    direction="row">
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" style={{ width: '100%' }}>
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Link to="/account/register">
                            <Box textAlign="right">
                                register
                            </Box>
                        </Link>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

class LoginPage extends React.Component {
    render () {
        const { classes } = this.props
        return (
            <Grid
                container
                className={classes.root}
                spacing={2}
                direction="row"
                justify="center"
                alignItems="center"
                alignContent="space-between">
                <Grid
                    item
                    container
                    spacing={2}
                    xs={12}
                    direction="column"
                    justify="center"
                    alignItems="center"
                    className={classes.titleContainer}>    
                    <Grid item>
                        <img className={classes.logo}/>
                    </Grid>
                    <Grid item>
                        <WhiteTextTypography variant="h5" component="h2">
                            <Box textAlign="center">
                                Pomodoro Locker
                            </Box>
                        </WhiteTextTypography>
                        <WhiteTextSecondaryTypography>
                            <Box textAlign="center">
                                Focus on your work
                            </Box>
                        </WhiteTextSecondaryTypography>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    xs={12}
                    className={classes.cardContainer}
                    justify="center"
                    alignItems="center">
                    <LoginCard classes={classes}/>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(LoginPage)
