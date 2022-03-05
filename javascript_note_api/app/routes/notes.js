var express = require('express');
var router = express.Router();
const Note = require('../models/note.js');
const withAuth = require('../middlewares/auth');

router.post('/', withAuth, async function (req, res) {
  const { title, body } = req.body;
  try {
    let note = new Note({ title: title, body: body, author: req.user._id });
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Ocorreu algum problema com a nota" });
  }
});
//buscando notas
router.get('/search', withAuth, async(req,res)=>{
  const { query } = req.query;
  try {
    let notes = await Note
    .find({author: req.user_id})
    .find({$text: {$search: query}});
    res.json(notes)
  } catch (error) {
    res.status(500).json({ error: "Ocorreu algum problema ao realizar listagem das notas" })
  }
})
// realizando uma consulta de notas por ID
router.get('/:id', withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    let note = await Note.findById(id);
    if(isOwner(req.user,note))
      res.json(note);
      else{
        res.status(403).json({ error: "Você não tem permissão para baixar esta nota" });
      }
  } catch (error) {
    res.status(500).json({ error: "Ocorreu algum problema ao recuperar a nota" });
  }
})
// coletar todas Notas
router.get('/', withAuth, async (req, res) => {
  try {
    let notes = await Note.find({author: req.user._id});
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Ocorreu algum problema ao recuperar todas notas" });
  }
})
// atualização das notas
router.put('/:id',withAuth, async(req,res)=>{
  const {title, body} = req.body;
  const {id} = req.params;
  try {
    let note = await Note.findById(id);
    if(isOwner (req.user,note)){
      let note = await Note.findOneAndUpdate(id, 
        {$set: {title: title, body: body} },
        {upsert: true, 'new':true});
        res.json(note);
    }else{
      res.status(403).json({ error: "Você não tem permissão para atualizar esta nota" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ocorreu algum problema ao tentar atualizar a nota" });
  }
})
// Delete Nota
router.delete('/:id', withAuth,async(req,res)=>{
  const {id}= req.params;
  try {
    let note = await Note.findById(id);
    if(isOwner(req.user,note)){
      await note.delete();
      res.json({message:"OK nota deletado"}).status(204);
    }else{
      res.status(403).json({ error: "Você não tem permissão para deletar esta nota" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ocorreu algum problema ao tentar deletar esta nota" });
  }
});
//Função para verificar se o usuario tem permissão de acessar a nota.
const isOwner = (user, note) => {
  if (JSON.stringify(user._id) == JSON.stringify(note.author._id)) {
    return true;
  } else {
    return false;
    } 

 }
module.exports = router;