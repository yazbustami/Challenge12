-- MAKE A DATABASE
DROP DATABASE IF EXISTS Employee_ManagementDB;
CREATE DATABASE Employee_ManagementDB;
USE Employee_ManagementDB;

-- CREATE TABLES
-- per assignment, must have 3 tables to view : departments, roles, & employees
-- each "table" needs a SEED

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT ,
    FOREIGN KEY (department_id),
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id),
    REFERENCES role(id)
    manager_id INT,
    FOREIGN KEY (manager_id),
    REFERENCES employee(id)
);

-- Department,role, and employee Seeds

INSERT INTO department
    (name)
VALUES
    ('Hospital'),
    ('Clinic'),
    ('Office'),
    ('HQ');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Doctor', 100000, 1),
    ('Nurse', 80000, 1),
    ('MA', 150000, 2),
    ('CNA', 120000, 2),
    ('Pharmacist', 160000, 3),
    ('Tech', 125000, 3),
    ('Clerk', 250000, 4),
    ('Assistant', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Yasmin', 'Bustami', 1, NULL),
    ('Jamal', 'Rabie', 2, 1),
    ('Kawthar', 'Rabie', 3, NULL),
    ('Tommy', 'Bahamas', 4, 3),
    ('Burger', 'Taco', 5, NULL),
    ('Blue', 'Bird', 6, 5),
    ('Nemo', 'Fish', 7, NULL),
    ('Green', 'Apple', 8, 7);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;