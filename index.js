//packages for application 
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

//connects to database 
const db = mysql.createConnection(
    {
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "employeeinfo_db",
},
console.log ('Connected to the employeeinfo_db.')
);
 db.connect(function(err){
   if (err) throw err;
     console.log('Connected to employeeinfo_db');
     askQuestions();
 });

//prompts questions
const askQuestions = () => {
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
    } else if (menuList === "View All Departments") {
        viewAllDepartments();
    } else if (menuList === "View All Roles") {
        viewAllRoles();
    } else if (menuList === "Add Employee") {
        addEmployee();
    } else if (menuList === "Add Role") {
        addRole();
    } else if (menuList === "Add Department") {
        addDepartment();
    }  else if (menuList === "Update Employee Role"){
        updateEmployee();
    }
})
};//end askQuestions

//view all employee function 
viewAllEmployees = () => {
// Read employees
    console.log('View Employees:')
    const sql = "SELECT employee.id, employee.first_name, employee.last_name, role.title, employee.manager_id AS manager, department.dept_name AS department, role.salary FROM employee, LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id"
;
    const sql2 = `SELECT * FROM employee`;
    db.query(sql2, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        askQuestions();
    })
};
//function for viewing all departments
viewAllDepartments = () => {
    // Read department
    console.log('View Departments:')
    const sql = `SELECT department.id AS id, department.dept_name AS department FROM department`;
   
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        askQuestions();
    })
};
//function to view all roles 
viewAllRoles = () => {
    console.log('View Roles:')
    // Read roles
        const sql = `SELECT role.id, role.title, role.salary, department.dept_name FROM role INNER JOIN department ON role.department_id = department.id`;
        
        db.query(sql, (err, rows) => {
            if (err) throw err;
            console.table(rows);
            askQuestions();
        })
};

//Additions 

//function to add employee
addEmployee = () => {
    //create a new employee
   console.log('Creating new employee:')
   inquirer.prompt([
    {
        name: 'firstName',
        message: 'What is the first name of the employee?',
        type: 'input'
    },
    {
        name: 'lastName',
        message: 'What is the last name of the employee?',
        type: 'input'
    },
    {
        name: 'managerID',
        message: 'What is the manager ID of the employee?',
        type: 'input'
    },

])
.then(answer => {
    const params = [answer.firstName, answer.lastName, answer.managerID]
    const roleSql ='SELECT role.id, role.title FROM role';
    db.query(roleSql, (err,data) => {
        if (err) throw err;
        const roles = data.map(({ id, title}) => ({ name: title, value: id}));
        inquirer.prompt ([
            {
                name: 'role',
                message: 'What is the role of the employee?',
                type: 'list',
                choices: roles
             }
        ])
        .then(roleAnswer => {
            const role = roleAnswer.role;
            params.push(role);

            const sql = `INSERT INTO employee (first_name, last_name, manager_id, role_id)
                      VALUES (?, ?, ?, ?)`;
  
                      db.query(sql, params, (err, result) => {
                      if (err) throw err;
                      console.log("Employee added!")
                      viewAllEmployees();
        })
    })
})

})
}
addRole = () => {
    //create a new roles
    inquirer.prompt([
        {
            name: 'addRole',
            message: 'What is the name of the role you want to add?',
            type: 'input'
        },
        {
            name: 'addSalary',
            message: 'What is the salary of the role you want to add?',
            type: 'input'
        }
    ])
    .then(answer => {
        const params = [answer.addRole, answer.addSalary];
        //pulls department from department table
        const deptSql = 'SELECT dept_name, id FROM department';

        db.query(deptSql, (err,data) => {
            if (err) throw err;
            const dept = data.map(({ dept_name, id }) => ({ name: dept_name, value: id }));

        inquirer.prompt ([
        {   name: 'addDept',
            message: 'What is the department of the role you want to add?',
            choices: dept
        }
        ])
        .then (deptAnswer => {
            const dept = deptAnswer.dept;
            params.push(dept);
            const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
            db.query(sql, params, (err, data) => {
                if (err) throw err;
                console.log('added roles');

                viewAllRoles();

            });
        });
    });      
}); 
};
//function to create new department 
addDepartment = () => {
    //create a new department
    inquirer.prompt ([
        {
            name: 'addDepartment',
            message: 'What is the name of the department you want to add?',
            type: 'input'
        }
    ])
    .then (answer => {
        const sql = 'INSERT INTO department (dept_name) VALUES (?)';
        db.query(sql, answer.addDepartment, (err, data) => {
            if (err) throw err;
            viewAllDepartments();
        })
    })
};

// update an employee function
updateEmployee = () => {
    // calls employees from employee table 
    const employeeSql = `SELECT * FROM employee`;
  
    db.query(employeeSql, (err, data) => {
      if (err) throw err; 
    const employeeList = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
  
      inquirer.prompt([
        {
          name: 'name',
          message: "Which employee would you like to update?",
          type: 'list',
          choices: employeeList
        }
      ])
        .then(empAnswer => {
          const employee = empAnswer.name;
          const params = []; 
          params.push(employee);
  
          const roleSql = `SELECT * FROM role`;
  
          db.query(roleSql, (err, data) => {
            if (err) throw err; 
            const roleList = data.map(({ id, title }) => ({ name: title, value: id }));
            
              inquirer.prompt([
                {
                  name: 'role',
                  message: "What is the employee's new role?",
                  type: 'list',
                  choices: roleList
                }
              ])
                  .then(roleAnswer => {
                  const role = roleAnswer.role;
                  params.push(role); 
                  
                  let employee = params[0]
                  params[0] = role
                  params[1] = employee 
                  const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
  
                  db.query(sql, params, (err, result) => {
                    if (err) throw err;
                  console.log("Employee has been updated!");
                
                  viewAllEmployees();
            });
          });
        });
      });
    });
  };
  
