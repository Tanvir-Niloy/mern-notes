require("dotenv").config();
const cors = require("cors");
const colors = require("colors");
const express = require("express");
const connectDB = require("./connectDB");
const Notes = require("./models/Notes");



const app = express();
const port = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//get all notes

app.get("/api/notes", async (req, res) => {
  try {
    const data = await Notes.find({});
    if (!data) {
      throw new Error("an error occurred when fetching notes");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "an error occurred when fetching notes" });
  }
});

//get note by id
app.get("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const data = await Notes.findById(noteId);
    if (!data) {
      throw new Error("an error occurred when fetching notes");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "an error occurred when fetching notes" });
  }
});

//create new post
app.post("/api/notes", async (req, res) => {
  try {
    const { title, description } = req.body;
    const data = await Notes.create({ title, description });
    if (!data) {
      throw new Error("an error occurred while create note");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "an error occurred while create a note" });
  }
});



//Update Post
app.put("/api/notes/:id", async (req, res) => {
  try {

    const noteId = req.params.id
    const { title, description } = req.body;
    const data = await Notes.findByIdAndUpdate(noteId,{ title, description });
    if (!data) {
      throw new Error("an error occurred while updaing note");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "an error occurred while update a note" });
  }
});

//Delete Post
app.delete("/api/notes/:id", async (req, res) => {
  try {

    const noteId = req.params.id
    const data = await Notes.findByIdAndDelete(noteId);
    if (!data) {
      throw new Error("an error occurred while deleting note");
    }
    res.status(200).json("Post Deleted Successfully");
  } catch (error) {
    res.status(500).json({ error: "an error occurred while deleting a note" });
  }
});

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`.bgYellow.bold);
});
