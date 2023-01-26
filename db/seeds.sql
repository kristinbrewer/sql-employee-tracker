INSERT INTO department (dept_name)
VALUES  ("Executive"),
        ("Sales"),
        ("Accounting"),
        ("Research and Development"),
        ("IT"),
        ("Human Resources"),
        ("Environmental Services");
    

INSERT INTO role (title, salary, department_id)
VALUES  ("COO", 250000, 1),
        ("Vice President", 150000, 2),
        ("Accountant", 100000, 3),
        ("Primary Researcher", 150000, 4),
        ("Tech Specialist", 100000, 5),
        ("Human Resource Officer", 75000, 6),
        ("Maintenance Technician", 65000, 7);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUE   ("Samuel","Jackson", 1, 11),
        ("Jessica","Smith", 2, 22),
        ("Robin","Charles", 3, 33),
        ("Steven","Yoder", 4, 44),
        ("Katie","Blue", 5, 55),
        ("Fred","Flinstone", 6, 66),
        ("Barney","Black", 7, 77);