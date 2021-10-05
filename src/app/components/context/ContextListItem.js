import React from "react";
import { withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import ContextSessionItem from "./ContextSessionItem.js";

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
    width: "36px",
    height: "36px",
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

class ContextListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayCheckbox: props.isDisplayCheckbox,
      isOpen: false,
    };

    this.handleOnCheckboxClick = this.handleOnCheckboxClick.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    console.log(props, state);
    if (props.isDisplayCheckbox !== state.isDisplayCheckbox) {
      state.isDisplayCheckbox = props.isDisplayCheckbox;
      return state;
    }
    return null;
  }

  handleOnClick(event) {
    console.log("context list item:", this.state);
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleOnCheckboxClick(event) {
    event.stopPropagation();
    this.props.onSelectContext(this.props.contextID);
    // Open the session list direclty only if checkbox checked
    if (event.target.checked) {
      this.setState({ isOpen: true });
      console.log("session:", this.props.context.sessions);
    }
  }

  render() {
    const { classes } = this.props;
    const { checked, context } = this.props;
    return (
      <React.Fragment>
        <ListItem
          button
          className={classes.root}
          onClick={this.handleOnClick}
          style={{
            backgroundColor: checked ? "rgba(66, 33, 244, 0.18)" : null,
            height: "48px",
          }}
        >
          <Grid
            container
            spacing={2}
            justify="flex-start"
            alignContent="center"
            alignItems="center"
          >
            <Grid item xs={1}>
              <ListItemIcon>
                <AccessAlarmIcon
                  className={checked ? classes.checkedStyle : null}
                />
              </ListItemIcon>
            </Grid>
            <Grid item xs={9}>
              <ListItemText
                primary={context.title}
                classes={{
                  primary: `${classes.text} ${
                    checked ? classes.checkedStyle : null
                  }`,
                }}
              />
            </Grid>
            <Grid item xs={2}>
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
