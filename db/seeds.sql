INSERT INTO department (name) VALUES 
    ('Software Development'), 
    ('Risk Management'), 
    ('Accounting');

INSERT INTO role (title, salary, department_id) VALUES 
    ('Software Engineer', 80000, 1),
    ('Accountant', 70000, 2),
    ('Risk Manager', 90000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
    ('Jayson', 'Tatum', 1, NULL),
    ('Al', 'Jefferson', 2, 1),
    ('Gerald', 'Wallace', 3, NULL);