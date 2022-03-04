var express = require('express');
var router = express.Router();
const Note = require('../models/note.js');
const withAuth = require('../middlewares/auth');

router.post('/',withAuth, async function(req, res) {
   const { title, body } = req.body;
  try {
    let note = new Note({title: title, body: body, author: req.user._id});
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({error: "Ocorreu algum problema com a nota"});
  }
 });

module.exports = router;