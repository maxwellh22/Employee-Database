import pool from './connection.js';

export const getAllDepartments = async () => (await pool.query('SELECT * FROM department')).rows;

export const getAllRoles = async () => (await pool.query(`
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    JOIN department ON role.department_id = department.id
`)).rows;

export const getAllEmployees = async () => (await pool.query(`
    SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary, m.first_name AS manager
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id
    LEFT JOIN employee m ON e.manager_id = m.id
`)).rows;

export const addDepartment = async (name) => await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);

export const addRole = async (title, salary, department_id) => await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);

export const addEmployee = async (first_name, last_name, role_id, manager_id) => await pool.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    [first_name, last_name, role_id, manager_id]
);

export const updateEmployeeRole = async (employee_id, role_id) => await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
