import React, { useEffect, useState } from "react";
import Amplify,{ Hub } from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Question } from "../../models";

async function listQuestions(setQuestions) {
  const questions = await DataStore.query(Question, Predicates.ALL);
  setQuestions(questions);
}

function QuestionComponent() {
  const [questions, setQuestions] = useState([]);
  const [value, setValue] = useState("");
  const [id, setId] = useState("");
  const [displayAdd, setDisplayAdd] = useState(true);
  const [displayUpdate, setDisplayUpdate] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);

  const handleSubmit = evt => {
    evt.preventDefault();
    evt.stopPropagation();
    DataStore.save(
      new Question({
        question: value
      })
    );
    listQuestions(setQuestions);
    setValue("");
  };

  async function handleSearch(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    setDisplaySearch(true);
    const search = await DataStore.query(Question, c => c.question("contains", value));
    setQuestions(search);
    setValue("");
  }

  async function handleDelete(id) {
    const toDelete = await DataStore.query(Question, id);
    await DataStore.delete(toDelete);
  }

  async function handleSelect(question) {
    setValue(question.question);
    setId(question.id);
    setDisplayUpdate(true);
    setDisplayAdd(false);
  }

  async function handleUpdate(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const original = await DataStore.query(Question, id);
    await DataStore.save(
      Question.copyOf(original, updated => {
        updated.question = value;
      })
    );
    listQuestions(setQuestions);
    setDisplayAdd(true);
    setDisplayUpdate(false);
    setValue("");
  }

  useEffect(() => {
    listQuestions(setQuestions);

    const listener = (data) => {
      if (data.payload.event === "signOut"){
        DataStore.clear();
      }
    }
    Hub.listen('auth', listener);

    const subscription = DataStore.observe(Question).subscribe(msg => {
      listQuestions(setQuestions);
    });

    const handleConnectionChange = () => {
      const condition = navigator.onLine ? "online" : "offline";
      console.log(condition);
      if (condition === "online") {
        listQuestions(setQuestions);
      }
    };

    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);

    return () => subscription.unsubscribe();
  }, []);

  return (
    <question>
    <h1>Add Questions</h1>
      <div className="container">
        {displayAdd ? (
          <form>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="New Question"
                aria-label="Question"
                aria-describedby="basic-addon2"
                value={value}
                onChange={e => setValue(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-warning border border-light text-white font-weight-bold"
                  type="button"
                  onClick={handleSubmit}
                >
                  Add Question
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
                placeholder="Update Question"
                aria-label="Question"
                aria-describedby="basic-addon2"
                value={value}
                onChange={e => setValue(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-warning text-white font-weight-bold"
                  type="submit"
                >
                  Update Question
                </button>
              </div>
            </div>
          </form>
        ) : null}
      </div>
      <div className="container">
        {questions.map((item, i) => {
          return (
            <div
              className="alert alert-warning alert-dismissible text-dark show"
              role="alert"
            >
              <span key={item.i} onClick={() => handleSelect(item)}>
                {item.question}
              </span>
              <button
                key={item.i}
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => {
                  handleDelete(item.id);
                  listQuestions(setQuestions);
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          );
        })}
        {displaySearch ? (
          <button
            className="button btn-warning float-right text-white font-weight-bold"
            onClick={() => {
              setDisplaySearch(false);
              listQuestions(setQuestions);
            }}
          >
            <span aria-hidden="true">Clear Search</span>
          </button>
        ) : null}
      </div>
    </question>
  );
}

export default QuestionComponent;
