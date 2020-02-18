import React, { useEffect, useState } from "react";
import Amplify,{ Hub } from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { TextTranscript } from "../../models";
import * as qry from '../../graphql/queries';
import API, { graphqlOperation } from '@aws-amplify/api';
import './Transcript.css';

import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';


const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

async function listTextTranscripts(setTextTranscripts, setTrancriptItems, setTranscriptString) {
  const textTranscripts = await DataStore.query(TextTranscript, Predicates.ALL);
  setTextTranscripts(textTranscripts);
  textTranscripts.map((item, i) => {
      console.log(typeof JSON.parse(item.results));
      const results = JSON.parse(item.results);
      console.log(results);
      for (const key in results) {
        let value = results[key];

        //optional check for properties from prototype chain
        if (results.hasOwnProperty(key)) {
          //no a property from prototype chain
          console.log(value);
          if(key === "items"){
            getTranscriptLists(value, setTrancriptItems);
          } else {
            setTranscriptString(value[0]["transcript"]);
            //console.log(value[0]["transcript"]);
          }
        }else{
          //property from protytpe chain
        }
      }
      // results.map(([key, value]) => {
      //   console.log(value);
      // });
  });

}


function getTranscriptLists(transcrip_obj, setTrancriptItems){
  for (const key in transcrip_obj) {
    let value = transcrip_obj[key];

    //optional check for properties from prototype chain
    if (transcrip_obj.hasOwnProperty(key)) {
      //no a property from prototype chain
      setTrancriptItems(transcrip_obj);
      //console.log(value["alternatives"]);
    }else{
      //property from protytpe chain
    }
  }
}



function GetAllTextTranscripts() {
  const [textTranscripts, setTextTranscripts] = useState([]);
  const [value, setValue] = useState("");
  const [txtData, setTxtData] = useState("");
  const [trancriptItems, setTrancriptItems] = useState("");
  const [transcriptString, setTranscriptString] = useState("");
  const [id, setId] = useState("");
  const [displaySearch, setDisplaySearch] = useState(false);
  const [classes, setClass] = useState("");

    async function handleSearch(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      setDisplaySearch(true);
      const search = await DataStore.query(TextTranscript, c => c.name("contains", value));
      setTextTranscripts(search);
      setValue("");
    }

    async function handleDelete(id) {
      const toDelete = await DataStore.query(TextTranscript, id);
      await DataStore.delete(toDelete);
    }


    async function handleSelect(textTranscript) {
      setValue(textTranscript.name);
      setId(textTranscript.id);
    }

  useEffect(() => {
    listTextTranscripts(setTextTranscripts, setTrancriptItems, setTranscriptString);

    const listener = (data) => {
      if (data.payload.event === "signOut"){
        DataStore.clear();
      }
    }
    Hub.listen('auth', listener);

    const subscription = DataStore.observe(TextTranscript).subscribe(msg => {
      listTextTranscripts(setTextTranscripts, setTrancriptItems, setTranscriptString);
    });

    const handleConnectionChange = () => {
      const condition = navigator.onLine ? "online" : "offline";
      console.log(condition);
      if (condition === "online") {
        listTextTranscripts(setTextTranscripts, setTrancriptItems, setTranscriptString);
      }
    };

    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    return () => subscription.unsubscribe();
  }, []);
  return (
    <getalltexttranscripts>
    <h1>TextTranscripts</h1>
      <div className="container">
          <form>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="New TextTranscript"
                aria-label="TextTranscript"
                aria-describedby="basic-addon2"
                value={value}
                onChange={e => setValue(e.target.value)}
              />
              <div className="input-group-append">
              <button
                className="btn btn-warning border border-light text-white font-weight-bold"
                type="button"
                onClick={e => {
                  handleSearch(e);
                }}
              >
                Search
              </button>
            </div>
          </div>
          </form>
      </div>
      <div className="container">
        {textTranscripts.map((item, i) => {
          return (
            <div key={i}>
                <div
                  className="alert alert-warning alert-dismissible text-dark show"
                  role="alert"
                >
                  <span onClick={() => handleSelect(item)}>
                    <p>{item.transcriptionText}</p>
                    <p>{item.status}</p>

                  </span>

                </div>
                {
                  Object.entries(trancriptItems).map((value, key) => {
                    return(
                    <span key={key}>
                    <HtmlTooltip
                        title={
                          <React.Fragment>
                            <Typography color="inherit">{trancriptItems[key]["alternatives"][0].content}</Typography>
                            <span>
                              <b>Start Time:</b> {trancriptItems[key]["start_time"]}<br />
                              <b>End Time:</b> {trancriptItems[key]["end_time"]} <br />
                              <b>Confidence:</b> {trancriptItems[key]["alternatives"][0].confidence} <br />
                              <b>Type:</b> {trancriptItems[key]["type"]}<br />
                            </span>
                          </React.Fragment>
                        }
                      >
                        <span>{trancriptItems[key]["alternatives"][0].content} </span>
                      </HtmlTooltip>
                      </span>
                    );
                  })
                }
            </div>
          );
        })
      }
        {displaySearch ? (
          <button
            className="button btn-warning float-right text-white font-weight-bold"
            onClick={() => {
              setDisplaySearch(false);
              listTextTranscripts(setTextTranscripts);
            }}
          >
            <span aria-hidden="true">Clear Search</span>
          </button>
        ) : null}
      </div>
    </getalltexttranscripts>
  );
}

export default GetAllTextTranscripts;
