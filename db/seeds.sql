-- Use the mySqlProject_db database
USE mySqlProject_db;

-- Insert records into department table
INSERT INTO department (name) 
VALUES 
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Operations');

-- Insert records into role table
INSERT INTO role (title, salary, department_id) 
VALUES 
  ('outbound', 50000, 4),
  ('inbound', 50000, 4),
  ('ops manager', 70000, 4),
  ('senior manager', 120000, 4),
  ('accountant', 65000, 3),
  ('sales rep', 50000, 1);

-- Select the id of the manager (assume that John Doe is the manager)
SET @manager_id = (SELECT id FROM employee WHERE last_name = 'Doe' LIMIT 1);

-- Insert records into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
  ('ron', 'jacobs', 2, NULL),
  ('rona', 'jan', 1, NULL),
  ('rik', 'joe', 4, 3),
  ('Jane', 'Doe', 6, 3),
  ('doe', 'moe', 3, 4),
  ('randy', 'ron', 3, 2);
