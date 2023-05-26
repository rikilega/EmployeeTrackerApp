const inquirer = require('inquirer');
const db = require('./src/queries');
require('dotenv').config();

// Main menu function
function mainMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add a Department',
          'Add a Role',
          'Add an Employee',
          'Update an Employee Role',
          'Exit',
        ],
      },
    ])
    .then((answers) => {
      // Handle answers
      switch (answers.choice) {
        case 'View All Departments':
          viewDepartments();
          break;
        case 'View All Roles':
          viewRoles();
          break;
        case 'View All Employees':
          viewEmployees();
          break;
        case 'Add a Department':
          addDepartment();
          break;
        case 'Add a Role':
          addRole();
          break;
        case 'Add an Employee':
          addEmployee();
          break;
        case 'Update an Employee Role':
          updateEmployeeRole();
          break;
        case 'Exit':
          process.exit();
      }
    });
}

async function viewDepartments() {
  try {
    const departments = await db.viewDepartments();
    console.table(departments);
    mainMenu();
  } catch (err) {
    console.log(err);
    mainMenu();
  }
}

async function viewRoles() {
  try {
    const roles = await db.viewRoles();
    console.table(roles);
    mainMenu();
  } catch (err) {
    console.log(err);
    mainMenu();
  }
}

async function viewEmployees() {
  try {
    const employees = await db.viewEmployeesWithDetails();
    console.table(employees);
    mainMenu();
  } catch (err) {
    console.log(err);
    mainMenu();
  }
}

async function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the department name:',
      },
    ])
    .then(async (answers) => {
      try {
        await db.addDepartment(answers.name);
        console.log('Department added successfully!');
      } catch (err) {
        console.log(err);
      } finally {
        mainMenu();
      }
    });
}

async function addRole() {
  try {
    const departments = await db.viewDepartments();
    const departmentChoices = departments.map((department) => department.name);

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the role title:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the role salary:',
        },
        {
          type: 'list',
          name: 'department',
          message: 'Select the department for the role:',
          choices: departmentChoices,
        },
      ])
      .then(async (answers) => {
        try {
          await db.addRole(answers.title, answers.salary, answers.department);
          console.log('Role added successfully!');
        } catch (err) {
          console.log(err);
        } finally {
          mainMenu();
        }
      });
  } catch (err) {
    console.log(err);
    mainMenu();
  }
}



async function addEmployee() {
  const roles = await db.viewRoles();
  const managers = await db.viewEmployees();

  const rolePrompt = {
    type: 'list',
    name: 'role',
    message: "Select the employee's role:",
    choices: roles.map((role) => role.title),
  };

  const managerPrompt = {
    type: 'list',
    name: 'manager',
    message: "Select the employee's manager:",
    choices: managers.map((manager) => manager.first_name + ' ' + manager.last_name).concat('None'),
  };

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "Enter the employee's first name:",
      },
      {
        type: 'input',
        name: 'last_name',
        message: "Enter the employee's last name:",
      },
      rolePrompt,
      managerPrompt,
    ])
    .then(async (answers) => {
      try {
        const role = roles.find((role) => role.title === answers.role);
        const manager = answers.manager === 'None' ? null : managers.find((manager) => manager.first_name + ' ' + manager.last_name === answers.manager);

        await db.addEmployee(answers.first_name, answers.last_name, role.id, manager && manager.id);
        console.log('Employee added successfully!');
      } catch (err) {
        console.log(err);
      } finally {
        mainMenu();
      }
    });
}

async function updateEmployeeRole() {
  try {
    const employees = await db.viewEmployees();
    const roles = await db.viewRoles();

    const employeePrompt = {
      type: 'list',
      name: 'employee_id',
      message: 'Select the employee you want to update:',
      choices: employees.map((employee) => employee.first_name + ' ' + employee.last_name),
    };

    const rolePrompt = {
      type: 'list',
      name: 'role_id',
      message: 'Select the new role for the employee:',
      choices: roles.map((role) => role.title),
    };

    inquirer
      .prompt([employeePrompt, rolePrompt])
      .then(async (answers) => {
        try {
          const employee = employees.find((employee) => employee.first_name + ' ' + employee.last_name === answers.employee_id);
          const role = roles.find((role) => role.title === answers.role_id);

          await db.updateEmployeeRole(role.id, employee.id);
          console.log('Employee role updated successfully!');
        } catch (err) {
          console.log(err);
        } finally {
          mainMenu();
        }
      });
  } catch (err) {
    console.log(err);
    mainMenu();
  }
}


// Start the application by calling the main menu function
mainMenu();