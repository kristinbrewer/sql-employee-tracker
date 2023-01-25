//packages for application 
const inquirer = require('inquirer');
var mysql = require('mysql2');
const express = require('express');

//establishes port connections 
const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connects to database 
var db = mysql.createConnection(
    {
    host: "localhost",
    user: "root",
    password: "",
   database: "employeeInfo_db"
},
console.log ('Connected to the employeeInfo_db.')
);
db.connect(function(err){
    if (err) throw err;
    console.log("Connected");
});
//prompts questions
function askQuestions () {
    return inquirer.prompt (
        [
            {
                name: 'menuList',
                message: 'What would you like to do?',
                type: 'list',
                choices: [ "View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"],
            
            }
        ]
    )
.then((answers) => {
    const { menuList } = answers;
    if (menuList === "View All Employees"){
        viewAllEmployees();
    } else if (menuList === "View all Departments") {
        viewAllDepartments();
    } else if (menuList === "View All Roles") {
        viewAllRoles();
    } else if (menuList === "Add Employee") {
        addEmployee();
    } else if (menuList === "Add Role") {
        addRole();
    } else if (menuList === "Add Department") {
        addDepartment();
    }  
})
}//end askQuestions

//view all employee function 
viewAllEmployees = () => {
// Read employees
app.get('/api/employee', (req, res) => {
    const sql = `SELECT id, first_name, last_name, role_id, manager_id FROM employee`;
    
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });
}
//function for viewing all departments
viewAllDepartments = () => {
    // Read department
    app.get('/api/department', (req, res) => {
        const sql = `SELECT id, dept_name FROM department`;
        
        db.query(sql, (err, rows) => {
          if (err) {
            res.status(500).json({ error: err.message });
             return;
          }
          res.json({
            message: 'success',
            data: rows
          });
        });
      });
}
//function to view all roles 
viewAllRoles = () => {
    // Read roles
    app.get('/api/role', (req, res) => {
        const sql = `SELECT id, title, salary, department_id FROM role`;
        
        db.query(sql, (err, rows) => {
          if (err) {
            res.status(500).json({ error: err.message });
             return;
          }
          res.json({
            message: 'success',
            data: rows
          });
        });
      });
}

//function to add employee
addEmployee = () => {
    //create a new employee
    app.post('api/new-employee', ({ body }, res) => {
        const sql = 'INSERT INTO employee (first_name, last_name) VALUES (?)';
        const params = [body.first_name, body.last_name];
    
        db.query(sql, params, (err, result) => {
            if (err) {
              res.status(400).json({ error: err.message });
              return;
            }
            res.json({
              message: 'success',
              data: body
            });
          });
    });
}
addRole = () => {
    //create a new roles
    app.post('api/new-role', ({ body }, res) => {
        const sql = 'INSERT INTO role (title) VALUES (?)';
        const params = [body.title];
    
        db.query(sql, params, (err, result) => {
            if (err) {
              res.status(400).json({ error: err.message });
              return;
            }
            res.json({
              message: 'success',
              data: body
            });
          });
    });
}
//function to create new department 
addDepartment = () => {
    //create a new department
    app.post('api/new-department', ({ body }, res) => {
        const sql = 'INSERT INTO department (dept_name) VALUES (?)';
        const params = [body.dept_name];
    
        db.query(sql, params, (err, result) => {
            if (err) {
              res.status(400).json({ error: err.message });
              return;
            }
            res.json({
              message: 'success',
              data: body
            });
          });
    });
}

function init(){
    askQuestions()
}

init();