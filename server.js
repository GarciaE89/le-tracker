const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// error handler
app.use((req, res) => {
  res.status(404).end();
});


db.connect(err => {
    if (err) throw err;
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
  
      function viewOptions() {
      // Inquirer asks what user would like to view
          inquirer
          .prompt([
              {
                  type: 'list',
                  message: 'Welcome to the Employee Tracker, please choose from the following options:',
                  name: 'mainMenu',
                  choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
              }
          ])
          .then(function(data) {
  
  
              // department 
              if (data.mainMenu === 'View all departments') {
                  const sql = `SELECT * FROM department`;
                  
                  db.query(sql, (err, rows) => {
                      if (err) {
                      console.log(err)
                      return;
                      }
                      console.table(rows)
                      viewOptions()
                      });
                  
              }
              // roles
              else if (data.mainMenu === 'View all roles') {
                  const sql = `SELECT roles.*, department.name 
                  AS department_name 
                  FROM roles 
                  LEFT JOIN department 
                  ON roles.department_id = department.id`;
                  
                  db.query(sql, (err, rows) => {
                      if (err) {
                      console.log(err)
                      return;
                      }
                      console.table(rows)
                      viewOptions()
                      });
  
              }
              // employees
              else if (data.mainMenu === 'View all employees') {
                  const sql = `SELECT 
                  employee.id AS employee_id, 
                  employee.first_name AS first_name, 
                  employee.last_name AS last_name, 
                  roles.title AS job_title,
                  department.name AS department,
                  roles.salary AS salarie,
                  employee.manager_id AS manager
                  FROM employee
                  LEFT JOIN roles ON employee.roles_id = roles.id
                  LEFT JOIN department ON roles.department_id = department.id;`;
                  
                  db.query(sql, (err, rows) => {
                      if (err) {
                      console.log(err)
                      return;
                      }
                      console.table(rows)
                      viewOptions()
                      });
              }
              // add a department
              else if (data.mainMenu === 'Add a department') {
  
                  inquirer
                  .prompt([
                      {
                          type: 'input',
                          name: 'dept',
                          message: 'Enter department name.'
                      }
                  ])
                  .then(function(data) {
  
                      const sql = `INSERT INTO department (name) VALUES (?)`;
                      const params = [data.dept];
                    
                      db.query(sql, params, (err, result) => {
                        if (err) {
                          console.log(err)
                          return;
                        }
                        console.log(data.dept + ' was added.');
                        viewOptions()
                      });
  
                      
                    });
  
              }
              // add a role.
              else if (data.mainMenu === 'Add a role') {
  
                  inquirer
                  .prompt([
                      {
                          type: 'input',
                          name: 'roleName',
                          message: 'Provide role name.'
                      },
                      {
                          type: 'number',
                          name: 'roleSalary',
                          message: 'Provide Salary'
                      },
                      {
                          type: 'number',
                          name: 'roleDepartment',
                          message: 'Provide department number for this role.'
                      }
                  ])
                  .then(function(data) {
  
                      const sql = `INSERT INTO roles (title, salary, department_id)
                      VALUES (?,?,?)`;
                      const params = [data.roleName, data.roleSalary, data.roleDepartment];
                    
                      db.query(sql, params, (err, result) => {
                        if (err) {
                          console.log(err)
                          return;
                        }
                        console.log('Added role name: ' + data.roleName);
                        console.log('Added salary amount: ' + data.roleSalary);
                        console.log('Added department number: ' + data.roleDepartment);
                        viewOptions()
                      });
  
                      
                    });
  
              }
              //  add an employee
              else if (data.mainMenu === 'Add an employee') {
  
                  inquirer
                  .prompt([
                      {
                          type: 'input',
                          name: 'firstName',
                          message: `Provide employee's first name.`
                      },
                      {
                          type: 'input',
                          name: 'lastName',
                          message: `Provide employee's last name.`
                      },
                      {
                          type: 'number',
                          name: 'roleId',
                          message: `Provide employee's role id`
                      },
                      {
                          type: 'number',
                          name: 'managerId',
                          message: `Provide employee's manager id`
                      }
                  ])
                  .then(function(data) {
  
                      const sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id)
                      VALUES (?,?,?,?)`;
                      const params = [data.firstName, data.lastName, data.roleId, data.managerId];
                    
                      db.query(sql, params, (err, result) => {
                        if (err) {
                          console.log(err)
                          return;
                        }
                        console.log(data.firstName + ' was added as the employee first name.');
                        console.log(data.lastName + ' was added as the employee last name.');
                        console.log(data.roleId + ' was added as the role number.');
                        console.log(data.managerId + ' was added as the manager id.');
                        viewOptions()
                      });
  
                      
                    });
  
              }
              //  update an employee role.
              else if (data.mainMenu === 'Update employee role') {
  
  
                  inquirer
                  .prompt([
                      {
                          type: 'number',
                          name: 'Eid',
                          message: 'Provide id number for employee that is being updated.'
                      },
                      {
                          type: 'number',
                          name: 'Erole_id',
                          message: 'Provide new role id'
                      }
                  ])
                  .then(function(data) {
  
                      const sql = `UPDATE employee SET roles_id = ? 
                      WHERE id = ?`;
                      const params = [data.Erole_id, data.Eid];
                    
                      db.query(sql, params, (err, result) => {
                        if (err) {
                          console.log(err)
                          return;
                        }
                        console.log('Updated.');
                        viewOptions()
                      });
  
                      
                    });
              }
  
             
              else {
                  console.log('You selected: ' + data.mainMenu)
                  viewOptions()
              }
  
          });
      }
  
      viewOptions()
  
    });
  });
  