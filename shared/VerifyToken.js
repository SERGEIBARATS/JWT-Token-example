const jwt = require('jsonwebtoken');
const config = require('../config'); 

function verifyToken(req, res, next) {

  const token = req.headers['x-access-token'];
  if (!token) 
    return res.status(403).send({ auth: false, message: 'No token provided. Please add `x-access-token` header value' });

  jwt.verify(token, config.secret, function(err, decoded) {      
    if (err) 
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    

    req.userId = decoded.id;
    next();
  });

}

module.exports = verifyToken;