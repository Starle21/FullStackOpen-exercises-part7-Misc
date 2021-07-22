import React from "react";
import { useHistory } from "react-router-dom";
import { useField } from "../hooks";
import { useState } from "react";

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.props.value,
      author: author.props.value,
      info: info.props.value,
      votes: 0,
    });
    history.push("/");
  };

  const handleReset = (e) => {
    //
    e.preventDefault();
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.props} />
        </div>
        <div>
          author
          <input {...author.props} />
        </div>
        <div>
          url for more info
          <input {...info.props} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
