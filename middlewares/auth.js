var jwt = require('jsonwebtoken');
//import db from '../db';

exports.verifyToken = (req, res, next)=> {
    const token = req.headers['x-access-token'];
    if(!token) {
      return res.status(400).send({ 'message': 'Token is not provided' });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      // const text = 'SELECT * FROM users WHERE id = $1';
      // const { rows } = await db.query(text, [decoded.userId]);
      // if(!rows[0]) {
      //   return res.status(400).send({ 'message': 'The token you provided is invalid' });
      // }
      // req.user = { id: decoded.userId };
      next();
     } 
     catch(error) {
       return res.status(400).send(error);
    }
  }
//}


