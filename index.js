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
                name: 'selectOption',
                message: 'What would you like to do?',
                type: 'list',
                choices: [ "View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"],
            
            }

        ]
    )
}



function init(){
    askQuestions()
}

init();