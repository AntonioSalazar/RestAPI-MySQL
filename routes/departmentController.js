
function listAllDepartments(req, res) {
  const {knex} = req.app.locals;
  knex.select('name', 'location')
    .from('departments')
    .then(departmentsFromDB => res.status(200).json(departmentsFromDB))
    .catch(err => res.status(404).json(err))
}

function listOneDepartment(req, res) {
  const { knex } = req.app.locals;
  const { id }   = req.params;
  knex.select('name', 'location')
  .from('departments')
  .where({id : `${id}`})
  .then(singleDepartment => {
    if (singleDepartment.length > 0) {
      res.status(200).json(singleDepartment[0])
    } else {
      res.status(404).json(`Department with the ID ${id} not found`)
    }
  })
  .catch(err => res.status(404).json(err))
}

function createDepartment (req, res) {
  const {knex} = req.app.locals;
  const payload = req.body;
  knex('departments')
    .insert(payload)
    .then(newDepartmentID => res.status(200).json(`new department with the id ${newDepartmentID} created`))
    .catch(err => res.status(500).json(err));
}

function updateDepartment(req, res) {
  const {knex} = req.app.locals;
  const {id}   = req.params;
  const payload = req.body;
  knex('departments')
    .where({id: `${id}`})
    .update(payload)
    .then(updatedDept => {
      if(updatedDept){
        res.status(200).json(updatedDept)
      } else {
        return res.status(404).json(`Department with the id ${id} not found`)
      }
    })
}

function deleteDepartment (req, res) {
  const {knex} = req.app.locals;
  const {id} = req.params;
  knex('departments')
    .where({id: `${id}`})
    .del()
    .then(response => {
      if(response) {
        return res.status(200).json(`employee with the id ${id} has been deleted`)
      } else {
        return res.status(404).json(`Employee with the ID ${id} not found`);
      }
    })
}

function getDepartmentEmployees(req, res) {
  const {knex} = req.app.locals;
  let {id}   = req.params;
  id = +id;
  knex
    .select('e.name', 'e.address', 'e.email', 'e.hired', 'e.dob', 'e.salary', 'e.bonus', 'e.photo')
    .from('employees AS e')
    .innerJoin('departments AS d', function() {
      this.on('e.department', '=', 'd.id').andOn('d.id', '=', id)
    })
    .then(data => {
      if (data.length > 0) {
        return res.status(200).json(data)
      } else {
        return res.status(404).json(`Department with the ID ${id} not found`)
      }
    })
    .catch(err => res.status(500).json(err))
}

module.exports ={
  listAllDepartments,
  listOneDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentEmployees
}