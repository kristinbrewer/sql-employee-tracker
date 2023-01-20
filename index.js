//packages for application 
const fs = require('fs');
const inquirer = require('inquirer');

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