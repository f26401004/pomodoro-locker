import React from "react";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";

import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";

import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import Fade from "@material-ui/core/Fade";
import ContextSessionItem from "./ContextSessionItem.js";

import blue from "@material-ui/core/colors/blue";

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
  checkbox: {
    width: "24px",
    height: "24px",
    transition: "opacity 100ms ease-in-out",
    opacity: 0.2,
    color: "#4285f4",
    "&:hover": {
      opacity: "1",
    },
  },
  forceDisplay: {
    opacity: "1 !important",
  },
  checkedStyle: {
    color: "#4285f4",
    fill: "#4285f4",
  },
});

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 48,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    backgroundColor: blue[200],
  },
}))(LinearProgress);

// HOC for progress bar
function LinearProgressWithLabel(props) {
  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      style={{ position: "absolute" }}
    >
      <Box width="100%">
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

class ContextListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    const totalTime =
      new Date(props.context.endTime) - new Date(props.context.startTime);
    const currentTime = new Date(props.context.endTime) - new Date();
    const progress = Math.min((1 - currentTime / totalTime) * 100, 100);

    this.state = {
      isDisplayCheckbox: props.isDisplayCheckbox,
      isOpen: false,
      timer: setInterval(() => {
        const totalTime =
          new Date(props.context.endTime) - new Date(props.context.startTime);
        const currentTime = new Date(props.context.endTime) - new Date();
        const progress = Math.min((1 - currentTime / totalTime) * 100, 100);

        this.setState({ progress });
        if (progress >= 100) {
          clearInterval(this.state.timer);
          this.setState({ timer: null });
          // TODO: remove the records
          return;
        }
      }, 1000),
      progress: progress,
    };

    this.handleOnCheckboxClick = this.handleOnCheckboxClick.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isDisplayCheckbox !== state.isDisplayCheckbox) {
      state.isDisplayCheckbox = props.isDisplayCheckbox;
      return state;
    }
    return null;
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  handleOnClick(event) {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleOnCheckboxClick(event) {
    event.stopPropagation();
    this.props.onSelectContext(this.props.contextID);
  }

  render() {
    const { classes } = this.props;
    const { checked, context } = this.props;

    return (
      <React.Fragment>
        <LinearProgressWithLabel value={this.state.progress} />
        <ListItem
          button
          className={classes.root}
          onClick={this.handleOnClick}
          style={{
            backgroundColor: checked ? "rgba(66, 33, 244, 0.18)" : null,
            height: "48px",
            padding: "0 8px",
          }}
          dense
        >
          <Grid
            container
            spacing={2}
            justify="flex-start"
            alignContent="center"
            alignItems="center"
          >
            <Grid container item xs={10} justify="space-between">
              <ListItemIcon style={{ minWidth: "36px" }}>
                <Fade
                  in={this.state.isOpen}
                  mountOnEnter
                  unmountOnExit
                  style={{
                    left: "8px",
                    transformOrigin: "0 0 0",
                    position: "absolute",
                  }}
                  timeout={100}
                >
                  <FolderOpenIcon
                    className={checked ? classes.checkedStyle : ""}
                  />
                </Fade>
                <Fade
                  in={!this.state.isOpen}
                  mountOnEnter
                  unmountOnExit
                  style={{
                    left: "8px",
                    transformOrigin: "0 0 0",
                    position: "absolute",
                  }}
                  timeout={100}
                >
                  <FolderIcon className={checked ? classes.checkedStyle : ""} />
                </Fade>
              </ListItemIcon>
              <ListItemText
                primary={context.title}
                classes={{
                  primary: `${classes.text} ${
                    checked ? classes.checkedStyle : ""
                  }`,
                }}
                style={{ margin: "0", alignContent: "center" }}
              />
            </Grid>
            <Grid container item xs={2} justify="flex-end">
              <Checkbox
                style={{ color: "#4285f4" }}
                className={
                  this.state.isDisplayCheckbox
                    ? `${classes.forceDisplay} ${classes.checkbox}`
                    : `${classes.checkbox}`
                }
                onClick={this.handleOnCheckboxClick}
                checked={checked}
              />
            </Grid>
          </Grid>
        </ListItem>
        <Collapse
          in={this.state.isOpen}
          timeout={100}
          mountOnEnter
          unmountOnExit
        >
          <List width="100%" style={{ padding: "0" }}>
            {context.sessions.map((session) => (
              <ContextSessionItem
                key={session.id}
                session={session}
                contextID={this.props.contextID}
                sessionID={session.id}
              />
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ContextListItem);
