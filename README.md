Employee Database CLI Application

Description
- This is a command line interface application built to manage a company's employee database. Using Node.js, PostgreSQL and Inquirer, this application utilizes a variety of technologies that allows small business owners to view and manage departments, roles, and employees.

Table of Contents:
- Installation
- Usage
- Features
- Technologies Used
- Contribution
- License
- Contact

Installation
- Using the git clone command, find the appropriate link from the Github page and clone the repository onto your local machine
- Navigate into the appropriate project folder on your local machine
- Run "npm install" to install the required dependencies
- Set up a .env file on your local machine (in the root directory) to properly configure with your newly created PostgreSQL database:

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=employee_database_v2

- Set up your PostgreSQL database:
1. Run the schema.sql script to create the database tables: psql -U postgres -d employee_database_v2 -f db/schema.sql
2. Run the seeds.sql scripts to create the database items with sample data: psql -U postgres -d employee_database_v2 -f db/seeds.sql
- Verify that the database connection is setup and that the scripts properly populated sample data

Usage
- Start the application by running "node index.js" in the correct project folder on your local machine
- Use the options on the interactive menu to use the CLI application
- Use the "Exit" option at anytime to exit out of the database

Features
- View all departments with their ID's and names
- View all job roles
- View all titles, salaries, and departments with respective job roles
- Add a new department, role, or employee
- Update an employee's role

Technologies Used
- Node.js
- PostgreSQL
- Inquirer.js
- dotenv
- pg admin (to interact with PostgreSQL)

Contribution
- This project is not open to contributions at this time.

License
- This project is lcensed under the MIT License

Contact
- Maxwell Hurst
- Email: maxwell.hurst22@gmail.com
- GitHub: maxwellh22