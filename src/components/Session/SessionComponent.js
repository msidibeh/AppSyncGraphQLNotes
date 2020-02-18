import React, { useEffect, useState } from "react";
import Amplify,{ Hub } from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Session, TextTranscript, MedicalTranscript } from "../../models";
import QuestionComponent from '../Question/QuestionComponent';
import * as qry from '../../graphql/queries';
import API, { graphqlOperation } from '@aws-amplify/api';

async function listSessions(setSessions) {
  const sessions = await DataStore.query(Session, Predicates.ALL);
    const transcripts = await DataStore.query(TextTranscript, Predicates.ALL);
      const medical = await DataStore.query(MedicalTranscript, Predicates.ALL);
  setSessions(sessions);
  console.log(sessions);
  console.log(transcripts);
  console.log(medical);
}

function SessionComponent() {
  const [sessions, setSessions] = useState([]);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [displayAdd, setDisplayAdd] = useState(true);
  const [displayUpdate, setDisplayUpdate] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [displayList, setDisplayList] = useState(true);

  const handleSubmit = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    DataStore.save(
      new Session({
        name: value
      })
    );
    DataStore.save(
      new MedicalTranscript({
        entities: value
      })
    );
    DataStore.save(
      new TextTranscript({
        jobName: value
      })
    );
    listSessions(setSessions);
    setValue("");
    setDisplaySearch(false);
    setDisplayAdd(false);
    setDisplayList(false);
    setDisplayUpdate(true);
  };

  async function handleSearch(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    setDisplaySearch(true);
    const search = await DataStore.query(Session, c => c.session("contains", value));
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
    setDisplayUpdate(true);
    setDisplayAdd(false);
  }

  async function handleUpdate(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const original = await DataStore.query(Session, id);
    await DataStore.save(
      Session.copyOf(original, updated => {
        updated.session = value;
      })
    );
    listSessions(setSessions);
    setDisplayAdd(true);
    setDisplayUpdate(false);
    setValue("");
  }

  useEffect(() => {
    listSessions(setSessions);
    async function loginAndCreateTodos() {
     try {
      // await Auth.signIn('scan@tutorial.com', 'password');
       const Data = await API.graphql(graphqlOperation(qry.listSessions));
        const medData = await API.graphql(graphqlOperation(qry.listMedicalTranscripts));
        const txtData = await API.graphql(graphqlOperation(qry.listTextTranscripts));
       //const count = todosData.data.scanTodos.items.length;
       //setTodosCount(count);
       console.log(medData);
       console.log(Data);
       console.log(txtData);
      /** if (count < 1000) {
         console.log('Creating Todos ...');
         const dummyTodos = range(count, 1000).map(i => ({
           name: `Dummy${i}`,
         }));
         await asyncForEach(dummyTodos, async input => {
           await API.graphql(graphqlOperation(createTodo, { input }));
         });
         console.log('Done creating. Reload your app.');
       }
       **/
     } catch (error) {
       console.log(error);
     }
   }
   loginAndCreateTodos();

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
    <sessionComponent>
      <div className="container">
        {displayAdd ? (
          <form>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="New Session"
                aria-label="Session"
                aria-describedby="basic-addon2"
                value={value}
                onChange={e => setValue(e.target.value)}
              />
                {/*
                <
              <div className="input-group-append">
                <button
                  className="btn btn-warning border border-light text-white font-weight-bold"
                  type="button"
                  onClick={handleSubmit}
                >
                  Add Session
                </button>
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
              */}
            </div>
            <div className="input-group mb-3">
              <button
                className="btn btn-warning border border-light text-white font-weight-bold"
                type="button"
                onClick={handleSubmit}
              >
                Add Session
              </button>
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
          </form>
        ) : null}
        {displayUpdate ? (
          <form
            onSubmit={e => {
              handleUpdate(e);
            }}
          >
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Update Session"
                aria-label="Session"
                aria-describedby="basic-addon2"
                value={value}
                onChange={e => setValue(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-warning text-white font-weight-bold"
                  type="submit"
                >
                  Update Session
                </button>
              </div>
            </div>
            <QuestionComponent />
          </form>
        ) : null}
      </div>
      <div className="container">
        {displayList ? (sessions.map((item, i) => {
          return (
            <div key={item.i}
              className="alert alert-warning alert-dismissible text-dark show"
              role="alert"
            >
              <span onClick={() => handleSelect(item)}>
                {item.name}
              </span>
              <button
                key={item.i}
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => {
                  handleDelete(item.id);
                  listSessions(setSessions);
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          );
        })): null}
        {displaySearch ? (
          <button
            className="button btn-warning float-right text-white font-weight-bold"
            onClick={() => {
              setDisplaySearch(false);
              listSessions(setSessions);
            }}
          >
            <span aria-hidden="true">Clear Search</span>
          </button>
        ) : null}
      </div>
    </sessionComponent>
  );
}

export default SessionComponent;
