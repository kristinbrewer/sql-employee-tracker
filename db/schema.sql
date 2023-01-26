DROP DATABASE IF EXISTS employeeinfo_db;
CREATE DATABASE employeeinfo_db;

USE employeeinfo_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    
    FOREIGN KEY (role_id) 
    REFERENCES role(id)
   
);

    
 /* 
 CONSTRAINT fk_manager 
    FOREIGN KEY (manager_id) 
    REFERENCES employee(id) ON DELETE SET NULL*/