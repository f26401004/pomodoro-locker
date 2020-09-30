import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from "react-router-dom"
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%'
    },
    logo: {
        backgroundColor: 'gray',
        width: '60px',
        height: '60px',
        borderRadius: '100%'
    },
    cardContainer: {
        width: '65%',
        height: '65%'
    },
    fillContainer: {
        width: '100%',
        height: '100%'
    }
})

const LoginCard = (classes) => {
    return (
        <Card className={classes.fillContainer}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Pomodoro Locker
                </Typography>
                <Typography color="textSecondary">
                    Focus your work
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary">
                    Login
                </Button>
                <Link to="/account/register">register</Link>
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
                direction="column"
                justify="center"
                alignItems="center">
                <Grid
                    container
                    item
                    spacing={3}
                    justify="center"
                    alignItems="center">
                    <img className={classes.logo}/>
                </Grid>
                <Grid
                    container
                    item
                    spacing={3}
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
