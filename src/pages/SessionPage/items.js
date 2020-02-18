import React, { useEffect, useState } from "react";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import EditItem from './editItem'
import DeleteItem from './deleteItem'
import { Hub } from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Session } from "../../models";

async function listItems(setItems) {
  const sessions = await DataStore.query(Session, Predicates.ALL);
  setItems(sessions);
}


function Items() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    listItems(setItems);

    const listener = (data) => {
      if (data.payload.event === "signOut"){
        DataStore.clear();
      }
    }
    Hub.listen('auth', listener);

    const subscription = DataStore.observe(Session).subscribe(msg => {
      listItems(setItems);
    });

    const handleConnectionChange = () => {
      const condition = navigator.onLine ? "online" : "offline";
      console.log(condition);
      if (condition === "online") {
        listItems(setItems);
      }
    };

    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Items>
      {items.map(item => (
         <Grid key={item.id} item>
             <Card>
               <CardContent>
                 <Typography color="textSecondary" gutterBottom>
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
    </Items>
  );
}

export default Items;
