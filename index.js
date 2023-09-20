const inquirer = require('inquirer');
const db = require('./config/connection');
require('console.table');

questions();

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
        name: "choices"
    }).then(answer => {
      console.log(answer.choices);

      switch (answer.choices) {
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
  const sql = `SELECT employee.id, employee.first_name AS "first name", employee.last_name AS "last name", role.title, department.name AS department, role.salary, concat(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`
  db.query(sql, function(err, data){
    console.table(data);
    questions();
  })
};

function viewRoles() {
  db.query("SELECT role.title, role.salary, department.name AS 'department name' FROM role LEFT JOIN department ON department.id = role.department_id", function(err, data){
    console.table(data);
    questions();
  })
};

function viewDepartments() {
  db.query("SELECT * FROM department", function(err, data){
    if(err) console.log(err);
    console.table(data);
    questions();
  })
};

function addEmployee() {
  db.query("SELECT id AS value, title AS name FROM role", function(err, data){
    const roles = data;
    db.query("SELECT id AS value, concat(first_name, ' ', last_name) AS name FROM employee", function(err, data){
      const employees = data;
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
          type: "list",
          name: "managerID",
          message: "Who is the new employees manager?",
          choices: employees
        },
        {
          type: "list",
          name: "roleID",
          message: "What is the new employees role?",
          choices: roles
        }
      ]).then(answers => {
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answers.firstName, answers.lastName, answers.roleID, answers.managerID], function(err, data){
          console.log("Employee succesfully inserted!");
          questions();
        })
      })
    })
  })
};

function addRole() {
  db.query("SELECT id AS value, name AS name FROM department", function(err, data){
    const departments = data;
    inquirer.prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "What is the title of this new role?"
      },
      {
        type: "input",
        name: "salary",
        message: "What salary does this role make?"
      },
      {
        type: "list",
        name: "departmentID",
        message: "Select the department where is role belongs:",
        choices: departments
      }
    ]).then(answers => {
      const {roleTitle, salary, departmentID} = answers;
      db.query("INSERT INTO role(title, salary, department_id) VALUES(?, ?, ?)", [roleTitle, salary, departmentID], function(err, data){
        console.log("Role was added successfully!");
        questions();
      })
    })
  })
};

function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      name: "departmentName",
      message: "What is the name of this new department?"
    }
  ]).then(({departmentName}) => {
    db.query("INSERT INTO department(name) VALUES(?)", [departmentName], function(err, data){
      console.log("Department was added successfully!");
      questions();
    })
  })
};

function updateEmployeeRole() {
  db.query("SELECT id AS value, title AS name FROM role", function(err, data){
    const roles = data;
    db.query("SELECT id AS value, concat(first_name, ' ', last_name) AS name FROM employee", function(err, data){
      const employees = data;
      inquirer.prompt([
        {
          type: "list",
          name: "employeeID",
          message: "Which employee would you like to update?",
          choices: employees
        },
        {
          type: "list",
          name: "roleID",
          message: "Select the new role for the employee:",
          choices: roles
        }
      ]).then(function(answers) {
        const {employeeID, roleID} = answers;
        db.query("UPDATE employee SET role_id = ?, WHERE id = ?", [employeeID, roleID], function(err, data){
          console.log("Employee role successfully updated!");
          questions();
        })
      })
    })
  })

};
