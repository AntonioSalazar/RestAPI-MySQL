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

}

module.exports = {
  getIDAsInteger,
  authenticate
};