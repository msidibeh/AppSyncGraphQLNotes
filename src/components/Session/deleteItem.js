import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

import { DataStore } from "@aws-amplify/datastore";
import { Session } from "../../models";


class DeleteItem extends Component {

  state = {
    open: false
  };

  handleClickOpen = () => {
    console.log("Current Item: " + this.props.currentItem.name)
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    this.setState({ open: false });
    var itemDetails = {
      id: this.props.currentItem.id,
    }
    DataStore.query(Session, itemDetails.id).then(data => {
      console.log(data);
        DataStore.delete(data);
      });;


    //API.graphql(graphqlOperation(mutations.deleteItem, { input: itemDetails }))
    // window.location.reload()
  };

  render() {
      return (
      <span style={{display: 'left'}}>
      <Button size='small' color="inherit" aria-label="Add" onClick={this.handleClickOpen}>
        <DeleteIcon />
      </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Are you sure you want to delete Session: {this.props.currentItem.name}?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    );
  }
}

export default DeleteItem;
