USE company_db;

INSERT INTO department (name)
VAlUES ("Engineering");
INSERT INTO department (name)
VAlUES ("Finance");
INSERT INTO department (name)
VAlUES ("Legal");
INSERT INTO department (name)
VAlUES ("Sales");


INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 160000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 190000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 7, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 8, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Rodriguez", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Tupik", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kunal", "Singh", 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Malia", "Brown", 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Lourd", 5, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Allen", 6, 3);