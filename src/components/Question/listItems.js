import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import EditItem from './editItem'
import DeleteItem from './deleteItem'
import Amplify,{ Hub } from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Question } from "../../models";


const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'inherit',
    padding: '10px'
  },
};



class ListItems extends Component {

  state = {
    items: []
  }

  componentDidMount = () => {
    this.getItems()
  }

  getItems = () => {
    DataStore.query(Question, Predicates.ALL)
    .then(data => {
      console.log(data);
      if(this.props.currentItem.id){
        const newData = data.filter(c => c.session.id === this.props.currentItem.id);
        this.setState({items: newData})
      } else {
        this.setState({items: data})
      }

      console.log(this.state.items);
            console.log(this.props.currentItem.id);
  });
  };

  render(){
    const { classes } = this.props;
    const { items } = this.state;
    //console.log(items)
    return (
      <div className={classes.root}>
      <Grid container className={classes.root} spacing={16}>
          {items.map(item => (
             <Grid key={item.id} item>
                 <Card className={classes.card}>
                   <CardContent>
                     <Typography className={classes.title} color="textSecondary" gutterBottom>
                       {item.name}
                     </Typography>
                  </CardContent>
                    <CardActions>
                      <EditItem currentItem={item}/>
                      <DeleteItem currentItem={item}/>
                   </CardActions>
                 </Card>
               </Grid>
             ))}
         </Grid>
      </div>
    );
  }
}

ListItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItems);
