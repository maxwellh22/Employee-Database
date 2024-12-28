import inquirer from 'inquirer';
import {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
} from './db/queries.js';

const mainMenu = async () => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Exit',
            ],
        },
    ]);

    switch (action) {
        case 'View All Departments':
            console.table(await getAllDepartments());
            break;
        case 'View All Roles':
            console.table(await getAllRoles());
            break;
        case 'View All Employees':
            console.table(await getAllEmployees());
            break;
        case 'Add Department':
            await promptAddDepartment();
            break;
        case 'Add Role':
            await promptAddRole();
            break;
        case 'Add Employee':
            await promptAddEmployee();
            break;
        case 'Update Employee Role':
            await promptUpdateEmployeeRole();
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }

    await mainMenu();
};

const promptAddDepartment = async () => {
    const { name } = await inquirer.prompt([
        { type: 'input', name: 'name', message: 'Enter the name of the department:' },
    ]);
    await addDepartment(name);
    console.log(`Department "${name}" added successfully!`);
};

const promptAddRole = async () => {
    const departments = await getAllDepartments();
    const departmentChoices = departments.map(dept => ({ name: dept.name, value: dept.id }));

    const { title, salary, department_id } = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter the role title:' },
        { type: 'input', name: 'salary', message: 'Enter the salary for the role:', validate: input => !isNaN(input) || 'Please enter a valid number.' },
        { type: 'list', name: 'department_id', message: 'Select the department for the role:', choices: departmentChoices },
    ]);

    await addRole(title, salary, department_id);
    console.log(`Role "${title}" added successfully!`);
};

const promptAddEmployee = async () => {
    const roles = await getAllRoles();
    const employees = await getAllEmployees();

    const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));
    const managerChoices = [{ name: 'None', value: null }, ...employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))];

    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        { type: 'input', name: 'first_name', message: 'Enter the employee\'s first name:' },
        { type: 'input', name: 'last_name', message: 'Enter the employee\'s last name:' },
        { type: 'list', name: 'role_id', message: 'Select the employee\'s role:', choices: roleChoices },
        { type: 'list', name: 'manager_id', message: 'Select the employee\'s manager:', choices: managerChoices },
    ]);

    await addEmployee(first_name, last_name, role_id, manager_id);
    console.log(`Employee "${first_name} ${last_name}" added successfully!`);
};

const promptUpdateEmployeeRole = async () => {
    const employees = await getAllEmployees();
    const roles = await getAllRoles();

    const employeeChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
    const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

    const { employee_id, role_id } = await inquirer.prompt([
        { type: 'list', name: 'employee_id', message: 'Select the employee to update:', choices: employeeChoices },
        { type: 'list', name: 'role_id', message: 'Select the new role for the employee:', choices: roleChoices },
    ]);

    await updateEmployeeRole(employee_id, role_id);
    console.log('Employee role updated successfully!');
};

mainMenu();