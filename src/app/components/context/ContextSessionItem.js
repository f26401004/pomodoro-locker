import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  text: {
    display: "inline-block",
    width: "180px",
    height: "21px",
    fontSize: "14px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

class ContextSessionItem extends React.PureComponent {
  render() {
    const { classes, session } = this.props;
    return (
      <ListItem dense className={classes.root} style={{ height: "48px" }}>
        <Grid
          container
          spacing={2}
          justify="flex-start"
          alignContent="center"
          alignItems="center"
        >
          <Grid item xs={1}></Grid>
          <Grid item xs={11}>
            <ListItemText primary={session.host} className={classes.text} />
          </Grid>
        </Grid>
      </ListItem>
    );
  }
}

export default withStyles(styles)(ContextSessionItem);
