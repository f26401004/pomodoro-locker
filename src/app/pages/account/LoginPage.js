import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import LogoIcon from "../../../icons/logo.svg";

const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF",
  },
})(Typography);
const WhiteTextSecondaryTypography = withStyles({
  root: {
    color: "#FFFFFF",
    opacity: "0.7",
  },
})(Typography);

const styles = (theme) => ({
  root: {
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(180deg, rgba(33,150,243,1) 0%, rgba(30,136,229,1) 72%, rgba(255,255,255,1) 72%, rgba(255,255,255,1) 100%)",
    padding: "36px",
    boxSizing: "border-box",
  },
  titleContainer: {
    height: "55vh",
    paddingTop: "7vh !important",
    boxSizing: "border-box",
  },
  logo: {
    width: "156px",
    height: "156px",
    borderRadius: "100%",
    border: "none",
    outline: "none",
  },
  cardContainer: {
    width: "90%",
    height: "30vh",
    padding: "24px",
    boxSizing: "border-box",
    marginBottom: "48px",
  },
});

class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleOnClickGoogleLogin = this.handleOnClickGoogleLogin.bind(this);
    this.handleOnClickFacebookLogin =
      this.handleOnClickFacebookLogin.bind(this);
    this.handleOnClickTiwtterLogin = this.handleOnClickTiwtterLogin.bind(this);
  }

  handleOnClickGoogleLogin() {
    chrome.runtime.sendMessage({ type: "signin-google" });
  }
  handleOnClickFacebookLogin() {
    chrome.runtime.sendMessage({ type: "signin-facebook" });
  }
  handleOnClickTiwtterLogin() {}

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        className={classes.root}
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="space-between"
      >
        <Grid
          item
          container
          spacing={2}
          xs={12}
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.titleContainer}
        >
          <Grid item>
            <img src={LogoIcon} className={classes.logo} />
          </Grid>
          <Grid item>
            <Box textAlign="center">
              <WhiteTextTypography variant="h5" component="h2">
                Pomodoro Locker
              </WhiteTextTypography>
            </Box>
            <Box textAlign="center">
              <WhiteTextSecondaryTypography>
                Focus on your work
              </WhiteTextSecondaryTypography>
            </Box>
          </Grid>
        </Grid>
        <Grid item container xs={12} justify="center" alignItems="center">
          <Card className={classes.cardContainer}>
            <CardActions>
              <Grid container spacing={1} direction="row">
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ width: "100%" }}
                    onClick={this.handleOnClickGoogleLogin}
                  >
                    Login with Google
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ width: "100%" }}
                    onClick={this.handleOnClickFacebookLogin}
                  >
                    Login with Facebook
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ width: "100%" }}
                    onClick={this.handleOnClickTiwtterLogin}
                  >
                    Login with Tiwtter
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(LoginPage);
