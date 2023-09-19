const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./config/connection');

connection.connect(function (err) {
  if (err) throw err;
  console.log('Connection Successful!' + '/n');
  questions();
})

function questions() {
    inquirer.prompt({
        message: "What would you like to do?",
        type: "list",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit"
        ],
        name: "choice"
    }).then(answers => {
      console.log(answers.choices);

      switch (answers.choices) {
        case "View All Employees":
          viewEmployees()
          break;
        case "Add Employee":
          addEmployee()
          break;
        case "Update Employee Role":
          updateEmployeeRole()
          break;
        case "View All Roles":
          viewRoles()
          break;
        case "Add Role":
          addRole()
          break;
        case "View All Departments":
          viewDepartments()
          break;
        case "Add Department":
          addDepartment()
          break;
        case "Quit":
      }
    })
};

function viewEmployees() {
  connection.query("SELECT * FROM employee", function(err, data){
    console.table(data);
    questions();
  })
};

function viewRoles() {
  connection.query("SELECT * FROM role", function(err, data){
    console.table(data);
    questions();
  })
};

function viewDepartments() {
  connection.query("SELECT * FROM department", function(err, data){
    console.table(data);
    questions();
  })
};
