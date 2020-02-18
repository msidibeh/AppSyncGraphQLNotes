import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import { DataStore } from "@aws-amplify/datastore";
import { Question, Session } from "../../models";


class AddItem extends Component {

  state = {
    open: false,
    itemName: '',
    question:'',
    // itemPrice: '',
    // itemDescription: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
    // console.log("Name: " + this.state.itemName + " Price: £" + this.state.itemPrice + " Description:" + this.state.itemDescription)
  };



   handleSubmit = (e) => {
    this.setState({ open: false });
    // var itemDetails = {
    //   name: this.state.itemName,
    //   // price: this.state.itemPrice,
    //    description: this.state.itemDescription,
    //    questionSessionId: this.props.currentItem.id
    // }

    //console.log("Item Details : " + JSON.stringify(itemDetails))
    // API.graphql(graphqlOperation(mutations.createItem, {input: itemDetails}));
    // DataStore.query(Session, this.props.currentItem.id).then(session => {
    //   console.log(session);
    //
    //   });

        DataStore.query(Session, this.props.currentItem.id).then(session => {
          var itemDetails = {
            name: this.state.itemName,
            // price: this.state.itemPrice,
             description: this.state.itemDescription,
             session
          }
          DataStore.save(new Question(itemDetails));

          // console.log(question);

      });

    // window.location.reload()
  }

  render() {
      return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <Button variant="fab" mini color="inherit" aria-label="Add" onClick={this.handleClickOpen}>
        <AddIcon />
      </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add a New Question</DialogTitle>
          <DialogContent>

              <TextField
                style={{marginRight: 10}}
                id="itemName"
                label="Name"
                type="string"
                onChange={this.handleChange('itemName')}
              />
              <TextField
                style={{marginRight: 10}}
                id="itemPrice"
                label="Price"
                type="number"
                onChange={this.handleChange('itemPrice')}
              />
              <TextField
                style={{marginTop: 10}}
                multiline
                id="itemDescription"
                label="Description"
                type="string"
                rows="4"
                fullWidth
                onChange={this.handleChange('itemDescription')}
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Add Question
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddItem;
