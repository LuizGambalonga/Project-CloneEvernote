require('dotenv').config();
const secret = process.env.JWT_TOKEN;

const jwt = require('jsonwebtoken');
// const { response } = require('../../app');

const User = require('../models/user');

const WithAut = (req,res, next)=>{
    let token = req.headers['x-acess-token'];
    if(!token)
      res.status(401).json({error: 'Chamada não autorizada sem token'});
      else{
          jwt.verify(token, secret, (err, decode)=>{
              if(err)
              res.status(401).json({error: 'Chamada não autorizada token invalido'});
              else{
                req.email = decode.email;
                User.findOne({email: decode.email})
                .then(user =>{
                    req.user = user;
                    next();
                })
                .catch(err =>{
                    res.status(401).json({error: err})
                })
              }
          })
      }
}

module.exports = WithAut;