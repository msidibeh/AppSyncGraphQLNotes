import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

import { Hub } from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Question, Session } from "../../models";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


async function listQuestions(setSessions, sessionId) {
  //const questions = await DataStore.query(Question, c => c.session.id === sessionId);
  const questions = (await DataStore.query(Question)).filter(function(data) {
    if (typeof data.session !== 'undefined') {
      return data.session.id === sessionId;
    } else{
      return false; // skip
    }
  });
  setSessions(questions);
}

export default function MaterialTableDemo(props) {
  const [state, setState] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Description', field: 'description',   cellStyle: {
       width: 20,
       maxWidth: 20
     }}
    ]
  });
  const [questions, setQuestions] = useState([]);
  const [id, setId] = useState("");
  const [sessionId, setSessionId] = props.currentItem;

useEffect(() => {
  listQuestions(setQuestions, props.currentItem);
  console.log(questions);
  const listener = (data) => {
    if (data.payload.event === "signOut"){
      DataStore.clear();
    }
  }
  Hub.listen('auth', listener);

  const subscription = DataStore.observe(Question).subscribe(msg => {
    listQuestions(setQuestions, props.currentItem);
  });

  const handleConnectionChange = () => {
    const condition = navigator.onLine ? "online" : "offline";
    console.log(condition);
    if (condition === "online") {
      listQuestions(setQuestions, props.currentItem);
    }
  };

  window.addEventListener("online", handleConnectionChange);
  window.addEventListener("offline", handleConnectionChange);

  return () => subscription.unsubscribe();
}, []);

  const editable = questions ? questions.map(o => ({ ...o })) : [];
  return (
    <div>
    <MaterialTable
      icons={tableIcons}
      title="Editable Questions"
      columns={state.columns}
      data={editable}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              DataStore.query(Session, props.currentItem).then(session => {
                var itemDetails = {...newData, session};
                DataStore.save(new Question(itemDetails));
            });

              // setState(prevState => {
              //   const data = [...prevState.data];
              //   data.push(newData);
              //   return { ...prevState, data };
              // });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {

                DataStore.query(Question, oldData.id).then(data => {
                  console.log(data);
                    DataStore.save(
                     Question.copyOf(data, updated => {
                       updated.name = newData.name;
                       updated.description = newData.description;
                     })
                   );
                  });

                // setState(prevState => {
                //   const data = [...prevState.data];
                //   data[data.indexOf(oldData)] = newData;
                //   return { ...prevState, data };
                // });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              DataStore.query(Question, oldData.id).then(data => {
                console.log(data);
                  DataStore.delete(data);
                });
            }, 600);
          }),
      }}
    />
    </div>
  );
}
