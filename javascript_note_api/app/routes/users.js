var express = require('express');
var router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const secret = process.env.JWT_TOKEN;


router.post('/register', async (req, res) => {
  //em baixo esta passando como parametro oque vai precisar para cadastrar o usuario, no caso nome e-mail e senha.
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar um novo usuario.' });
  }
})

router.post('/login', async (req, res) => {
  //em baixo esta passando como parametro oque vai precisar para fazer login, no caso e-mail e senha.
  const { email, password } = req.body;
  try {
    //tenta encontrar um usuario com o e-mail passado.
    let user = await User.findOne({ email });
    if (!user)
      res.status(401).json({error: 'Password ou e-mail incorreto'});
    else {
      user.isCorrectPassword(password, function (err, same){
        if (!same) 
          res.status(401).json({ error: 'Password ou e-mail incorreto'});
        else {
          const token = jwt.sign({email}, secret, { expiresIn: '30d' });
          res.json({user: user,token:token});
        }
      })
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Error, Try Again" });
  }

})
module.exports = router;
