import React,  { useEffect, useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { Hub } from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Session, Question } from "../../models";
import MaterialTable from 'material-table';
import MaterialTableDemo from './addSessions';
async function listSessions(setSessions) {
  const sessions = await DataStore.query(Session, Predicates.ALL);
  setSessions(JSON.stringify(sessions));
}
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Pick Session Name', 'Add Questions', 'Create Virtual Therapy Session '];
}





export default function NewSession() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [sessions, setSessions] = useState([]);
  const [sessionId, setSessionId] = useState([]);
  const [details, setDetails] = useState([]);
  const steps = getSteps();

  const getStepContent = (step, sessions ) => {
    switch (step) {
      case 0:
        return (
          <div>
          <Typography>Add a New Session</Typography>
          <TextField
            style={{marginRight: 10}}
            id="itemName"
            label="Session Name"
            placeholder={details.name}
            defaultValue={details.name}
            type="string"
            onChange={handleChange('name')}
          />
          <TextField
            style={{marginTop: 10}}
            multiline
            defaultValue={details.description}
            id="itemDescription"
            placeholder={details.description}
            label="Session Description"
            type="string"
            rows="2"
            fullWidth
            onChange={handleChange('description')}
          />
          </div>
        );
      case 1:
        return (
          <div>
            <MaterialTableDemo currentItem={sessionId}/>
          </div>
        );
      case 2:
        return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
      default:
        return 'Unknown step';
    }
  }


  const handleNext = () => {
    if(activeStep === 0){
      //console.log(details)
      if(typeof details.name === 'undefined' || typeof details.description === 'undefined'){
        alert("Please add a session name and description");
        return false;
      }
      if(sessionId === null || sessionId.length === 0 ){
        //console.log(sessionId.length);
        //console.log("No session Id");
          DataStore.save(
            new Session(details)
          ).then(data => {
            //console.log(data[0].id);
            setSessionId(data[0].id);
            setActiveStep(prevActiveStep => prevActiveStep + 1);
          });
      } else {
        //console.log("Has session Id");
        //console.log(sessionId.length);
        DataStore.query(Session, sessionId).then(data => {
          DataStore.save(
           Session.copyOf(data, updated => {
             updated.name = details.name;
             updated.description = details.description;
           })
         ).then(resp => {
           setActiveStep(prevActiveStep => prevActiveStep + 1);
         });
        });
      }

      //setActiveStep(prevActiveStep => prevActiveStep + 1);
    } else if (activeStep === 1) {
      DataStore.query(Question).then(data => {
        const myVal= data.filter(function(data) {
          if (typeof data.session !== 'undefined') {
            return data.session.id === sessionId;
          } else{
            return false; // skip
          }
        });
        if(typeof myVal.length === 'undefined' || myVal.length === 0){
          alert("Please add a question");
          return false;
        } else {
          setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
      });

    }
    else {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  const handleChange = name => event => {
    setDetails({ ...details,
      [name]: event.target.value,
    });
  };
  const handleBack = () => {
    if(activeStep === 0){
      //console.log(details)
      DataStore.query(Session, sessionId).then(data => {
        setDetails(data);
        //console.log(data[0].id);
        setSessionId(data[0].id);
        setActiveStep(prevActiveStep => prevActiveStep - 1);
      });
      //setActiveStep(prevActiveStep => prevActiveStep + 1);
    } else {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

  };

  const handleReset = () => {
    setActiveStep(0);
  };
  useEffect(() => {
    listSessions(setSessions);

    const listener = (data) => {
      if (data.payload.event === "signOut"){
        DataStore.clear();
      }
    }
    Hub.listen('auth', listener);


    const subscription = DataStore.observe(Question).subscribe(msg => {
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
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <div>{getStepContent(index, sessions)}</div>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished
          {sessionId.length > 0 ? (<Link href={"https://us-east-1.sumerian.aws/25f7e8bbb9584cf1afef6330b7720428.scene?sessionid=" + sessionId} target="_blank">
            {" - Click Here To Access Your VR Session"}
          </Link> ) : null}
          </Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
