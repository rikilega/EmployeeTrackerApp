-- Use the mySqlProject_db database
USE mySqlProject_db;

-- Insert records into department table
INSERT INTO department (name) 
VALUES 
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Marketing');

-- Insert records into role table
INSERT INTO role (title, salary, department_id) 
VALUES 
  ('Sales Manager', 70000, 1),
  ('Engineer', 60000, 2),
  ('Accountant', 50000, 3),
  ('Marketing Manager', 65000, 4);

-- Select the id of the manager (assume that John Doe is the manager)
SET @manager_id = (SELECT id FROM employee WHERE last_name = 'Doe' LIMIT 1);

-- Insert records into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
  ('Jane', 'Doe', 2, @manager_id),
  ('Joe', 'Bloggs', 3, @manager_id),
  ('Jill', 'Bloggs', 4, @manager_id);
