// below function is how to do a get query joining to tables with departments and employees info using the mysql native driver
// function listAllEmployees(req, res) {
//   // the below line gives access to the mysql connection inside the employee Controller
//   const connection = req.app.locals.connection; 
//   connection.query('SELECT e.id, e.name, e.address, e.email, e.hired, e.dob, e.salary, e.bonus, e.photo, d.name as "Department", d.location FROM employees e JOIN departments d ON e.department = d.id',
//   (error, result) => {
//     if (error) {
//       return res.status(500).json(error)
//     }
//     return res.status(200).json(result)
//   })
// }

function listAllEmployees(req, res) {
  const { knex } =  req.app.locals;
  const { orderBy } = req.query;
  if (orderBy) {
    const regex = /(.*)(:)(ASC|DESC)/ig;
    if (regex.test(orderBy)) {
      const [column, order] = orderBy.split(':')
      knex.select('name', 'address', 'email', 'hired', 'dob', 'salary', 'bonus', 'photo', 'department')
        .from('employees')
        .orderBy(column, order)
        .then(dataFromDB => res.status(200).json(dataFromDB))
        .catch(err => res.status(500).json(err))      
    } else {
      return res.status(400).json('If using a filter please use [field]: ASC|DESC')
    }
  } else {
      knex.select('name', 'address', 'email', 'hired', 'dob', 'salary', 'bonus', 'photo', 'department')
        .from('employees')
        .then(dataFromDB => res.status(200).json(dataFromDB))
        .catch(err => res.status(500).json(err))   
  }
}

function listOneEmployee(req, res) {
  const { knex } = req.app.locals;
  const { id } = req.params;
  knex.select('name', 'address', 'email', 'hired', 'dob', 'salary', 'bonus', 'photo', 'department')
    .from('employees')
    .where({ id: `${id}`})
    .then(infoFromDB => {
      if (infoFromDB.length > 0) {
        return res.status(200).json(infoFromDB[0])
      } else {
        return res.status(404).json(`employee with ${id} ID not found`)
      }
    })
    .catch(err => res.status(500).json(err))
}

function createEmployee(req, res) {
  const {knex} = req.app.locals;
  const payload = req.body;
  const mandatoryColumns = ['name', 'email', 'salary'];
  const payloadKeys = Object.keys(payload);
  const mandatoryColumnsExists = mandatoryColumns.every(mandatoryCols => payloadKeys.includes(mandatoryCols))
  if (mandatoryColumnsExists) {
    knex('employees')
      .insert(payload)
      .then(newEmployeeID => res.status(200).json(`Employee created with the id: ${newEmployeeID}`))
      .catch(err => res.status(500).json(err)); 
  } else {
    return res.status(400).json(`Mandatory columns required: ${mandatoryColumns}`)
  }
}

function updateEmployee(req, res) {
  const {knex} = req.app.locals;
  const {id}   = req.params;
  const payload = req.body;
  knex('employees')
    .where('id', id)
    .update(payload)
    .then(response => {
      if (response) {
        return res.status(204).json()
      } else {
        return res.status(404).json(`Employe with the ID ${id} not found`)
      }
    })
    .catch(err => res.status(500).json(err))
}

function deleteEmployee(req, res) {
  const {knex} = req.app.locals;
  const {id}   = req.params;
  knex('employees')
    .where('id', id)
    .del()
    .then(response => {
      if(response){
        res.status(200).json(`employe with the id ${id} deleted.`)
      } else {
        return res.status(404).json(`Employe with the ID ${id} not found`);
      }
    })
    .catch(err => res.status(500).json(err));
}

module.exports = {
  listAllEmployees,
  listOneEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} ;