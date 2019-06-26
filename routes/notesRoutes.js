const express = require('express');
const router = express.Router();
const notes = require('../controller/notesController.js');

router.get("/", notes.showIndex);
router.get("/notes", notes.showNotes);
router.put("/note/:id", notes.editNote);
router.put("/note", notes.createNote);
router.post("/note", notes.createNote);
router.patch("/note/:id/", notes.editNote);
router.get("/note/:id/", notes.showNote);
router.delete("/note/:id/", notes.deleteNote);

module.exports = router;