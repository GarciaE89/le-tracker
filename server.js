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
      // Inquirer asks what user what they would like to view
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
                      console.log('error line 48')
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
                      console.log('error line 64')
                      return;
                      }
                      console.table(rows)
                      viewOptions()
                      });
  
              }
             
  });
  