import React, { useEffect, useState } from "react";
import { Hub } from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Session } from "../../models";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import EditItem from '../../components/Session/editItem'
import DeleteItem from '../../components/Session/deleteItem'
import AddItem from '../../components/Session/addItem'


import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

async function listSessions(setSessions) {
  const sessions = await DataStore.query(Session, Predicates.ALL);
  setSessions(sessions);
}
const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));
// A style sheet

function preventDefault(event) {
  event.preventDefault();
}


function GetAllSessions() {
  const [sessions, setSessions] = useState([]);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [displaySearch, setDisplaySearch] = useState(false);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


    async function handleSearch(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      setDisplaySearch(true);
      const search = await DataStore.query(Session, c => c.name("contains", value));
      setSessions(search);
      setValue("");
    }

    async function handleDelete(id) {
      const toDelete = await DataStore.query(Session, id);
      await DataStore.delete(toDelete);
    }

    async function handleSelect(session) {
      setValue(session.name);
      setId(session.id);
    }

  useEffect(() => {
    listSessions(setSessions);

    const listener = (data) => {
      if (data.payload.event === "signOut"){
        DataStore.clear();
      }
    }
    Hub.listen('auth', listener);

    const subscription = DataStore.observe(Session).subscribe(msg => {
      listSessions(setSessions);
    });

    const handleConnectionChange = () => {
      const condition = navigator.onLine ? "online" : "offline";
      console.log(condition);
      if (condition === "online") {
        listSessions(setSessions);
      }
    };

    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    return () => subscription.unsubscribe();
  }, []);

  return (
    <getallsessions>
      <React.Fragment>
        <Title>Recent Sessions</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell align="center">
                  <EditItem currentItem={item}/>
                  <DeleteItem currentItem={item}/>
                </TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          <Link color="primary" href="#" onClick={preventDefault}>
            See more sessions
          </Link>
        </div>
      </React.Fragment>
    </getallsessions>
  );

}

export default GetAllSessions;
