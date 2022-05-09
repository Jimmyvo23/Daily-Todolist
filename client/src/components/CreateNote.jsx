import React from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import "../CreateNote.css"


function CreateNote(props) {
  return (
    <div className="box">
      <InputGroup className="mb-3" method="post">
        <Form.Control
          onChange={props.onChange}
          name={props.name}
          placeholder="Enter your tasks !!!"
          value={props.value}
          aira-label="Enter your tasks !!!"
          
        />
        <button className="button" onClick={props.onAdd} type="submit">
          Add
        </button>
      </InputGroup>
      </div>
  );
}

export default CreateNote;

