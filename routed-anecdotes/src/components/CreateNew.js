import React from "react";
import { useHistory } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = (props) => {
  const content = useField("text", "content");
  const author = useField("text", "author");
  const info = useField("text", "info");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content,
      author,
      info,
      votes: 0,
    });
    history.push("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateNew;
