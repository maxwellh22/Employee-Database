const pool = require('./connection');

const getAllDepartments = async () => {
    const result = await pool.query('SELECT * FROM department');
    return result.rows;
};

const getAllRoles = async () => {
    const result = await pool.query(`
        SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        JOIN department ON role.department_id = department.id
    `);
    return result.rows;
};

const getAllEmployees = async () => {
    const result = await pool.query(`
        SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary, m.first_name AS manager
        FROM employee e
        JOIN role r ON e.role_id = r.id
        JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
    `);
    return result.rows;
};

module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
};