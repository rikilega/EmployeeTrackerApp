// const mysql = require('mysql2/promise');
// const dotenv = require('dotenv');

// dotenv.config();

// const connection = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   queueLimit: 0
// });


// module.exports = {
//   viewDepartments: async function () {
//     const [rows] = await connection.query('SELECT id, name FROM department');
//     return rows;
//   },
//   viewRoles: async function () {
//     const query = `
//       SELECT r.title, r.salary, d.name AS department
//       FROM role r
//       INNER JOIN department d ON r.department_id = d.id
//     `;
//     const [rows] = await connection.query(query);
//     return rows;
//   },
//   viewEmployees: async function () {
//     const query = `
//       SELECT
//         e.id,
//         e.first_name,
//         e.last_name,
//         r.title AS role,
//         d.name AS department,
//         r.salary,
//         CONCAT(m.first_name, ' ', m.last_name) AS manager
//       FROM employee e
//       LEFT JOIN role r ON e.role_id = r.id
//       LEFT JOIN department d ON r.department_id = d.id
//       LEFT JOIN employee m ON e.manager_id = m.id
//     `;
//     const [rows] = await connection.query(query);
//     return rows;
//   },
//   addDepartment: async function (name) {
//     const [result] = await connection.query('INSERT INTO department SET ?', { name });
//     return result;
//   },
//   addRole: async function (title, salary, department) {
//     const departmentIdQuery = 'SELECT id FROM department WHERE name = ?';
//     const [departmentIdRows] = await connection.query(departmentIdQuery, [department]);
//     const departmentId = departmentIdRows[0].id;

//     const [result] = await connection.query('INSERT INTO role SET ?', { title, salary, department_id: departmentId });
//     return result;
//   },
//   addEmployee: async function (first_name, last_name, role_id, manager_id) {
//     const [result] = await connection.query('INSERT INTO employee SET ?', { first_name, last_name, role_id, manager_id });
//     return result;
//   },
//   updateEmployeeRole: async function (role_id, id) {
//     const [result] = await connection.query('UPDATE employee SET ? WHERE ?', [{ role_id }, { id }]);
//     return result;
//   },
// };

const mysql = require('mysql2/promise');
require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = {
  viewDepartments: async function () {
    const [rows] = await connection.query('SELECT * FROM department');
    return rows;
  },
  viewRoles: async function () {
    const [rows] = await connection.query('SELECT r.*, d.name AS department_name FROM role r JOIN department d ON r.department_id = d.id');
    return rows;
  },
  viewEmployees: async function () {
    const [rows] = await connection.query('SELECT e.*, r.title AS role_title, d.name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager_name FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id');
    return rows;
  },
  addDepartment: async function (name) {
    const [result] = await connection.query('INSERT INTO department SET ?', { name });
    return result;
  },
  addRole: async function (title, salary, department) {
    const [departmentRow] = await connection.query('SELECT id FROM department WHERE name = ?', [department]);
    const departmentId = departmentRow[0].id;
  
    const [result] = await connection.query('INSERT INTO role SET ?', { title, salary, department_id: departmentId });
    return result;
  },
  
  addEmployee: async function (first_name, last_name, role_id, manager_id) {
    const [result] = await connection.query('INSERT INTO employee SET ?', { first_name, last_name, role_id, manager_id });
    return result;
  },
  updateEmployeeRole: async function (role_id, id) {
    const [result] = await connection.query('UPDATE employee SET ? WHERE ?', [{ role_id }, { id }]);
    return result;
  },
  getDepartmentById: async function (departmentId) {
    const [rows] = await connection.query('SELECT * FROM department WHERE id = ?', [departmentId]);
    return rows[0];
  },
  viewEmployeesWithDetails: async function() {
    const query = `
      SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee e
      LEFT JOIN role r ON e.role_id = r.id
      LEFT JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id
    `;
    const [rows] = await connection.query(query);
    return rows;
  }
};
