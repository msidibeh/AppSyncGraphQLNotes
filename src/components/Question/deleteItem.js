import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

import { DataStore } from "@aws-amplify/datastore";
import { Question } from "../../models";


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
    DataStore.query(Question, itemDetails.id).then(data => {
      console.log(data);
        DataStore.delete(data);
      });;


    //API.graphql(graphqlOperation(mutations.deleteItem, { input: itemDetails }))
    // window.location.reload()
  };

  render() {
      return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <Button style={{marginLeft: "125px"}}size='small' color="inherit" aria-label="Add" onClick={this.handleClickOpen}>
        <DeleteIcon />
      </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Are you sure you want to delete question: {this.props.currentItem.name}?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteItem;
