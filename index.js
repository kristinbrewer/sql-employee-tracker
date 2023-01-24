//packages for application 
const inquirer = require('inquirer');
var mysql = require('mysql');
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
});
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
}

if (menuList === "View All Employees"){
    //
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
} else if (menuList === "View all Departments") {
    //
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
} else if (menuList === "View All Roles") {
    //
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
} else if (menuList === "Add Employee") {
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
} else if (menuList === "Add Role") {
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
} else if (menuList === "Add Department") {
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