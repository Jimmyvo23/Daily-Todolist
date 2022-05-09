import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "../Note.css"

function Note(props) {

  const [markTodo, setMarkToDo] = useState(false)

 function handleCross(){
   setMarkToDo((preValue)=> {
     return !preValue;
   })
 }


  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="todo" >
      <span style={{textDecoration: markTodo? "line-through" : null}}>{props.note}</span>
      <div>
      <Button variant="outline-success" onClick={handleCross}>✓</Button>{' '}
      <Button variant="outline-danger" onClick={handleClick}>X</Button>
      </div>
    </div>
  );
}

export default Note;
