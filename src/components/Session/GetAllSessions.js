import React, { useEffect, useState } from "react";
import { Hub } from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Session, Question } from "../../models";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import EditItem from './editItem'
import DeleteItem from './deleteItem'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import AddItem from '../Question/addItem'
import ListItems from '../Question/listItems'

async function listSessions(setSessions) {
  const sessions = await DataStore.query(Session, Predicates.ALL);
  setSessions(sessions);
}
async function listQuestions(setQuestions) {
  const questions = await DataStore.query(Question, Predicates.ALL);
  setQuestions(questions);
}
// A style sheet
const useStyles = makeStyles(theme =>({
  card: {
    minWidth: 1000,
    width: "100%",
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
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },

  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(3, 1,1),
  },
}));

function GetAllSessions() {
  const [sessions, setSessions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [displaySearch, setDisplaySearch] = useState(false);
  const classes = useStyles();const [expanded, setExpanded] = React.useState(false);

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
    listQuestions(setQuestions);

    const listener = (data) => {
      if (data.payload.event === "signOut"){
        DataStore.clear();
      }
    }
    Hub.listen('auth', listener);

    const subscription = DataStore.observe(Session).subscribe(msg => {
      listSessions(setSessions);
    });


    DataStore.observe(Question).subscribe(msg => {
      listQuestions(setQuestions);
    });

    const handleConnectionChange = () => {
      const condition = navigator.onLine ? "online" : "offline";
      console.log(condition);
      if (condition === "online") {
        listSessions(setSessions);
        listQuestions(setQuestions);
      }
    };

    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    return () => subscription.unsubscribe();
  }, []);

  return (
    <getallsessions>{
      /*

      <Grid container className={classes.root} spacing={3}>
          {sessions.map(item => (
             <Grid key={item.id} item xs={12}>
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
         */}

      <div className={classes.root}>
    {sessions.map(item => (
<ExpansionPanel key={item.id} item expanded={expanded === item.id} onChange={handleChange(item.id)}>
  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header">
    <Typography className={classes.heading}>
      <Avatar aria-label="recipe" className={classes.avatar}>
        {item.name.charAt(0).toUpperCase()}
      </Avatar>
    </Typography>
    <Typography className={classes.secondaryHeading}><h1>{item.name}</h1></Typography>
  </ExpansionPanelSummary>
  <ExpansionPanelDetails>
    <div className={classes.section1}>
      <div className={classes.section2}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h4" color="textSecondary" gutterBottom>
              Session: <b>{item.name}</b>
            </Typography>
         </CardContent>

         <Divider variant="middle" />
           <CardActions>
             <EditItem currentItem={item}/>
             <DeleteItem currentItem={item}/>
             <AddItem currentItem={item}/>
          </CardActions>
        </Card>
      </div>
    </div>

    <Divider variant="middle" />
    <ListItems currentItem={item}/>

  </ExpansionPanelDetails>
</ExpansionPanel>
  ))}
</div>
    </getallsessions>
  );

}

export default GetAllSessions;
