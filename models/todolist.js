import mongoose from "mongoose";

const {Schema} = mongoose;

const todolistDB = new Schema({
    title: {
        type: String,
        require: true
    },
})

const todoList = mongoose.model("todoList", todolistDB);

export default todoList