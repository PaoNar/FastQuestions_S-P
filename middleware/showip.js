; 
'use strict'

const jwt = require('jsonwebtoken')

let ShowIP = (req, res, next) =>{

let token = req.headers.authorization || null;

  jwt.verify(token, process.env.KEY_JWT, (err, decode) => {
    if (err) {
      return res.status(400).json({
        data: err,
        msg: "Invalid token",
      });
    } else {
        cod = '192'  //colocar una ip o un codigo
        let ip = req.query.cod
        if(ip === cod) {
            console.log('Bienvenido Profesor') ,
            next();
        }else{
            return res.status(500).json({
                msg: 'Denegado'
            })
        }
    }
  });
};
    

module.exports = {
    ShowIP
}