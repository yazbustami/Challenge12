const inquirer = require("inquirer");
const cTable = require('console.table')
const mysql = require("mysql2");

const db = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'Employee_ManagementDB'
}
);



// server.js & schema database connection
db.connect(function (err) {
    if (err) throw err;
    activityList();
    });

function activityList() {
    inquirer.prompt({
        type: "list",
        name: "order",
        message: "What would you like to search?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update employee role",
            "Done"]
    })


    .then(function ({order}) {
        switch (order) {
            case "View all departments":
                showDepartments();
                // console.log("testing function");
                break;
            case "View all roles":
                showRoles();
                break;
            case "View all employees":
                showEmployees();
                break;
            case "Add a department":
                newDepartment();
                break;
            case "Add a role":
                newRole();
                break;
            case "Add an employee":
                newEmployee();
                break;
            case "Update employee role":
                newEmployeeRole();
                break;
            case "Done":
                link.end();
                break;
        }
    });
}

// Shows list of Department id's & names
function showDepartments (){
    //db.query("SELECT id AS Department ID, name AS Department Name, FROM department;", TESTED NOT WORKING
    db.query("SELECT * FROM department;", 
    function(err, res) {
        if (err) throw err
        console.table(res);
        activityList()
    }  
    )
};

// Shows list of roles
function showRoles (){
    db.query("SELECT * FROM role;", 
    function(err, res) {
        if (err) throw err
        console.table(res);
        activityList()
    }  
    )
};

// Shows list of employees. Incorp. (first_name, last_name, role_id, manager_id, title, salary, department_id) from SQL. USE JOIN. CONCAT ALLOWS combo of more than 1 string. Use AS to "hide actual code and show as a name etc" 
function showEmployees (){
    db.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON manager.id = employee.manager_id", 
    function(err, res) {
        if (err) throw err
        console.table(res);
        activityList()
    }  
    )
};

// New Department
function newDepartment() {
    inquirer.prompt({
        type: "input",
        name: "name",
        message: "What would you like to name the new Department?",
})
// insert into departments. line 38 in schema.sql.
    .then(function(res) {
        // console.log("TESTING !@#");
       db.query(
        "INSERT INTO department SET ?",
       {
        // insert with department name, line 39 schema.sql
        name: res.name
       },
       function(err) {
        if (err) throw err
        console.table(res);
        activityList();
       }
       )
    })
};

// New Role
function newRole() {
    db.query("SELECT role.title AS title, role.salary AS salary FROM role", function(err, res)
    {inquirer.prompt([{
        type: "input",
        name: "title",
        message: "What would you like to name the new role?",
},
{
        type: "input",
        name: "salary",
        message: "What would you like the new salary to be?",
}])
// insert into roles. line 46 in schema.sql.
    .then(function(res) {
       db.query(
        "INSERT INTO role SET ?",
       {
        // insert for title & salary, line 47 schema.sql
        title: res.title,
        salary: res.salary,
       },
       function(err) {
        if (err) throw err
        console.table(res);
        activityList();
       }
       )});
    })};



    