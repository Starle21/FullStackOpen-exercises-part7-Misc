import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    input: { type, value, onChange },
    reset,
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const getAll = useCallback(async () => {
    const response = await axios.get(baseUrl);
    return setResources(response.data);
  }, []);

  useEffect(() => {
    getAll();
  }, [baseUrl, getAll]);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    return setResources([...resources, response.data]);
  };

  const service = {
    getAll,
    create,
  };

  return [resources, service];
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.input.value });
    content.reset();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({
      name: name.input.value,
      number: number.input.value,
    });
    name.reset();
    number.reset();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.input} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}
      <hr />

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name.input} /> <br />
        number <input {...number.input} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
