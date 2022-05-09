import React, { useEffect, useState } from "react";
import "../App.css";
import CreateNote from "./CreateNote";
import Note from "./Note";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Card } from "react-bootstrap";

function App() {
  useEffect(() => {
    getList();
  }, []);

  const [note, setNote] = useState("");
  const [noteArray, setNoteArray] = useState([]);

  function handleChange(event) {
    setNote(event.target.value);
  }

  function addNote(e) {
    e.preventDefault();
    fetch("http://localhost:8080/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: note }),
    })
      // .then((response) => response.json())
      // .then((data) => {
      //   console.log(data)
      // });

      .then(() => {
        console.log("Data has sent to the server!!!");
        getList();
        setNote("");
      })

      .catch((err) => {
        console.log(err);
      });
  }
  // Get List Collections from mongoose server
  function getList() {
    fetch("http://localhost:8080/api", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNoteArray(data);
      });
  }

  //   function handleDelete(id) {
  //     setNoteArray((preValue) => {
  //       return preValue.filter((note, index) => {
  //         return index !== id;
  //       });
  //     });
  //   }
  console.log(noteArray);
  const image = [
    "IMG_1911.HEIC",
    "IMG_4846.JPG",
    "IMG_4917.JPG",
    "yhzacoco.HEIC",
  ];
  function randomImg() {
    const ranI = Math.floor(Math.random() * image.length);
    return ranI;
  }

  function handleDelete(id) {
    fetch(`http://localhost:8080/api/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        getList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="App">
      <h1>Hello Jimmy Vo</h1>
      <p>Be productive today!</p>  
      <div>
        <CreateNote onChange={handleChange} value={note} onAdd={addNote} />
        {noteArray.map((item, index) => (
          <Card style={{ width: "400px" }}>
            <Card.Body>
              <Note
                key={index}
                onDelete={handleDelete}
                id={item._id}
                note={item.title}
              />
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
