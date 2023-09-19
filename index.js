const inquirer = require('inquirer');
const db = require('./config/connection');
const table = require('console.table');

db.connect(function (err) {
  if (err) throw err;
  console.log('Connection Successful!');
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
          viewEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          viewDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Quit":
          console.log("Thank you. Goodbye!");
          db.end();
      }
    })
};

function viewEmployees() {
  db.query("SELECT * FROM employee", function(err, data){
    console.table(data);
    questions();
  })
};

function viewRoles() {
  db.query("SELECT * FROM role", function(err, data){
    console.table(data);
    questions();
  })
};

function viewDepartments() {
  db.query("SELECT * FROM department", function(err, data){
    console.table(data);
    questions();
  })
};

function addEmployee() {
  inquirer.prompt([
  {
    type: "input",
    name: "firstName",
    message: "What is the employees first name?"
  },
  {
    type: "input",
    name: "lastName",
    message: "What is the employees last name?"
  },
  {

  }
])
};

function addRole() {
  inquirer.prompt([
    {
      type: "input",
      name: ""
    }
  ])
};

function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      name
    }
  ])
}
