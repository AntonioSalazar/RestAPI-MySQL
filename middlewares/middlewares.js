const jwt = require('jsonwebtoken');

function getIDAsInteger(req, res, next ) {
  const id = +req.params.id;
  if (Number.isInteger(id)) {
    next();
  } else {
    return res.status(400).json('ID must be a number')
  }
}

function authenticate(req, res, next) {
  const { authorization } = req.headers;
  // console.log(authorization);
  if (authorization) {
    //authorization comes like: bearer tokenHere, thats why we split the value and get the [1] element, because that is the token
    const token = authorization.split(' ')[1];
    jwt.verify(token, 's3cr3t', (error, decodedToken) => {
      if (error) {
        return res.status(401).json('Authentication error')
      } else {
        req.decoded = decodedToken;
        // console.log(req.decoded);
        next();
      }
    });
  } else {
    return res.status(403).json('No token provided')
  }
}

module.exports = {
  getIDAsInteger,
  authenticate
};