import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Scrollbars } from "react-custom-scrollbars";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";

import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import CheckboxIcon from "@material-ui/icons/CheckBox";
import DeleteIcon from "@material-ui/icons/Delete";
import CopyIcon from "@material-ui/icons/FileCopy";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

import Fade from "@material-ui/core/Fade";

import RuntimeWrapper from "../../../libs/runtimeWrapper.js";

// connect and pass the redux action into component
import { connect } from "react-redux";
import {
  setContext,
  createContext,
  updateContext,
  deleteContext,
} from "../../redux/actions/Context.js";
import { Collapse, Grid, List, Paper, TextField } from "@material-ui/core";

import ContextListItem from "./ContextListItem.js";

const mapStateToProps = (state) => ({
  context: state.context,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setContext: (target) => dispatch(setContext(target)),
    createContext: (target) => dispatch(createContext(target)),
    updateContext: (target) => dispatch(updateContext(target)),
    deleteContext: (target) => dispatch(deleteContext(target)),
  };
};

const styles = (theme) => ({
  header: {
    padding: "0",
  },
  root: {
    padding: "24px",
    boxSizing: "border-box",
    height: "100%",
  },
  operationButton: {
    width: "40px",
    height: "40px",
    padding: "0",
  },
  operationLabel: {
    color: "#4285f4",
    margin: "0",
  },
});

// HOC for operation container
function OperationContainer(props) {
  const total = props.selectedContextsInID.length;
  return (
    <Paper elevation={0}>
      <Grid container alignContent="center" alignItems="center">
        <Grid container item xs={5} justify="space-between">
          <Grid item>
            <Tooltip title="Edit" arrow style={{ fontSize: "10px" }}>
              <IconButton
                className={props.classes.operationButton}
                aria-label="edit"
                onClick={props.onEdit}
              >
                <EditIcon style={{ fill: "#4285f4" }} />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Copy" arrow style={{ fontSize: "10px" }}>
              <IconButton
                className={props.classes.operationButton}
                aria-label="copy"
                onClick={props.onCopy}
              >
                <CopyIcon style={{ fill: "#4285f4" }} />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item>
            <Tooltip title="Delete" arrow style={{ fontSize: "10px" }}>
              <IconButton
                className={props.classes.operationButton}
                aria-label="delete"
                onClick={props.onDelete}
              >
                <DeleteIcon style={{ fill: "#4285f4" }} />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item>
            <Tooltip title="Select all" arrow style={{ fontSize: "10px" }}>
              <IconButton
                className={props.classes.operationButton}
                aria-label="select-all"
                onClick={props.onSelectAll}
              >
                <CheckboxIcon style={{ fill: "#4285f4" }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        <Grid item xs={7} style={{ textAlign: "right" }}>
          <label className={props.classes.operationLabel}>
            {" "}
            {`Selected ${total} item(s)`}{" "}
          </label>
        </Grid>
      </Grid>
    </Paper>
  );
}

// HOC for virtualized list row
function ListRow({ index, style, data }) {
  const {
    contexts,
    filteredContextsID,
    selectedContextsInID,
    onSelectContext,
  } = data;
  const targetContextID = filteredContextsID[index];
  const targetContext = contexts[targetContextID];
  console.log(targetContext);
  return (
    <div style={style} key={`context-${index}-${targetContextID}`}>
      <ContextListItem
        context={targetContext}
        contextID={targetContextID}
        isDisplayCheckbox={selectedContextsInID.length > 0}
        checked={selectedContextsInID.includes(targetContextID)}
        onSelectContext={onSelectContext}
      />
    </div>
  );
}

const circularProgressStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  top: {
    color: "#1a90ff",
    animationDuration: "550ms",
    position: "absolute",
    left: 0,
  },
  circle: {
    strokeLinecap: "round",
  },
}));

// HOC for circular loading progress
function CustomCircularProgress(props) {
  const classes = circularProgressStyles();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </div>
  );
}

class ManageTab extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpenCreateContext: false,
      tempContext: {
        title: "",
        sessions: {},
        listRef: React.createRef(),
      },
      filteredContextsID: Object.keys(props.context),
      selectedContextsInID: [],
      searchKey: "",
      isLoading: true,
    };

    // Bind the handle functions.
    this.handleOnCreate = this.handleOnCreate.bind(this);
    this.handleOnSelectContext = this.handleOnSelectContext.bind(this);
    this.handleOnCopy = this.handleOnCopy.bind(this);
    this.handleOnDelete = this.handleOnDelete.bind(this);
    this.handleOnEdit = this.handleOnEdit.bind(this);
    this.handleOnSelectAll = this.handleOnSelectAll.bind(this);
    this.handleOnSearchKeyChange = this.handleOnSearchKeyChange.bind(this);
  }

  handleOnSelectContext(contextID) {
    const targetIndex = this.state.selectedContextsInID.findIndex(
      (id) => id === contextID
    );
    if (targetIndex === -1) {
      this.setState({
        selectedContextsInID: [...this.state.selectedContextsInID, contextID],
      });
      return;
    }
    const filtered = this.state.selectedContextsInID.filter(
      (target) => target !== contextID
    );
    this.setState({ selectedContextsInID: filtered });
  }

  componentWillMount() {
    // Set up the context information callback to update current
    RuntimeWrapper.addListener("context_information", (request) => {
      console.log(request.options.contexts);
      this.props.setContext(request.options.contexts);
      this.setState({
        isLoading: false,
        filteredContextsID: Object.keys(request.options.contexts),
      });
    });
    // Fetch the context information from background
    chrome.runtime.sendMessage({ type: "get_context" });
  }

  handleOnCreate() {}

  handleOnCopy() {}

  handleOnDelete() {}

  handleOnEdit() {}

  handleOnSelectAll() {}

  handleOnSearchKeyChange(event) {
    // Set the search key value first
    this.setState({ searchKey: event.target.value });
    // Recover the filteredContextsID directly if the search key value is empty
    if (event.target.value.length === 0) {
      this.setState({ filteredContextsID: Object.keys(this.props.context) });
      return;
    }
    // Filter the filteredContextsID by context title and sessions' host in the context
    this.setState({
      filteredContextsID: Object.entries(this.props.context)
        .filter(
          (target) =>
            target[1].title
              .toLowerCase()
              .indexOf(event.target.value.toLowerCase()) !== -1 ||
            target[1].sessions.find(
              (iter) =>
                iter.host
                  .toLowerCase()
                  .indexOf(event.target.value.toLowerCase()) !== -1
            )
        )
        .map((target) => target[0]),
    });
  }

  render() {
    // Extract the context object from props
    const { context, classes } = this.props;
    console.log(context);
    // Extract the handler from props
    const { deleteContext } = this.props;
    return (
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignContent="flex-start"
          style={{ height: "100%" }}
        >
          <Grid container item>
            <TextField
              label="Search contexts"
              variant="outlined"
              size="small"
              fullWidth
              value={this.state.searchKey}
              onChange={this.handleOnSearchKeyChange}
            ></TextField>
          </Grid>
          <Grid container item>
            <Collapse
              in={Object.keys(this.state.selectedContextsInID).length > 0}
              mountOnEnter
              unmountOnExit
              style={{ transformOrigin: "0 0 0", width: "100%" }}
              timeout={100}
            >
              <OperationContainer
                classes={classes}
                selectedContextsInID={this.state.selectedContextsInID}
                onDelete={this.handleOnDelete}
                onCopy={this.handleOnCopy}
                onEdit={this.handleOnEdit}
                onSelectAll={this.handleOnSelectAll}
              />
            </Collapse>
          </Grid>
          <Grid
            container
            item
            style={{ height: "calc(100% - 48px)" }}
            justify="center"
            alignContent="center"
          >
            <Fade
              in={this.state.isLoading}
              mountOnEnter
              unmountOnExit
              style={{ position: "absolute" }}
              timeout={200}
            >
              <CustomCircularProgress />
            </Fade>
            <Fade
              in={!this.state.isLoading}
              mountOnEnter
              unmountOnExit
              timeout={200}
            >
              <List style={{ width: "100%", height: "calc(100% - 16px)" }}>
                <Scrollbars
                  onScroll={this.handleScroll}
                  autoHide
                  autoHideTimeout={1000}
                  autoHideDuration={500}
                >
                  <AutoSizer>
                    {({ height, width }) => {
                      console.log(context);
                      return (
                        <React.Fragment>
                          <FixedSizeList
                            height={height - 16}
                            width={width - 16}
                            ref={this.state.listRef}
                            itemCount={this.state.filteredContextsID.length}
                            itemData={{
                              contexts: context,
                              filteredContextsID: this.state.filteredContextsID,
                              selectedContextsInID:
                                this.state.selectedContextsInID,
                              onSelectContext: this.handleOnSelectContext,
                            }}
                            style={{ overflow: false }}
                            itemSize={20}
                          >
                            {ListRow}
                          </FixedSizeList>
                        </React.Fragment>
                      );
                    }}
                  </AutoSizer>
                </Scrollbars>
              </List>
            </Fade>
          </Grid>
          <Fab
            color="primary"
            aria-label="create"
            size="medium"
            style={{
              left: "calc(100% - 80px)",
              top: "calc(100% - 80px)",
              position: "fixed",
            }}
            onClick={this.handleOnCreate}
          >
            <AddIcon></AddIcon>
          </Fab>
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ManageTab));
