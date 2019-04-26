const data = require('../data');

function listAllEmployees(req, res) {
  return res.status(200).json(data);
}

module.exports = {
  listAllEmployees
} ;