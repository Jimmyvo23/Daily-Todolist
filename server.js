import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import todoList from "./models/todolist.js";

const app = express();

app.use(cors())

const PORT = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
});
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!");
});
// Back end express



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));


// Routing using express

  app.get(("/api"),(req, res) => {
    todoList.find({}).then((data) => {
      res.json(data);
    });
  })
  app.post(("/api/save"),(req, res) => {
    const data = req.body;
    const newToDoList = new todoList(data);

    newToDoList.save((err) => {
      if (!err) {
        res.send("Successfully adding notes")
        }
       else {
        res.status(500).json({ msg: "Sorry, internal server error" });
        console.log(err);
      }
    });
  });

app.delete("/api/:id", (req, res)=> {
    const id = req.params.id;
    todoList.deleteOne({id : id}, (err)=> {
        if (!err) {
            res.send("Succcessfully deleted the specified note")
        } else {
            res.send(err)
        }
    })
})

app.listen(PORT, () => {
  console.log("Server has start on port " + PORT);
});
