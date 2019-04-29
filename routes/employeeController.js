
function listAllEmployees(req, res) {
  // the below line gives access to the mysql connection inside the employee Controller
  const connection = req.app.locals.connection; 
  connection.query('SELECT e.id, e.name, e.address, e.email, e.hired, e.dob, e.salary, e.bonus, e.photo, d.name as "Department", d.location FROM employees e JOIN departments d ON e.department = d.id',
  (error, result) => {
    if (error) {
      return res.status(500).json(error)
    }
    return res.status(200).json(result)
  })

}

module.exports = {
  listAllEmployees
} ;